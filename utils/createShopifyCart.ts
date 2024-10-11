import { env } from "@/config/env.mjs";
import { LATEST_API_VERSION } from "@shopify/shopify-api";

interface CartResponse {
  data: {
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
        discountCodes: Array<{
          code: string;
          applicable: boolean;
        }>;
      } | null;
    };
  };

  userErrors: Array<{ field: string; message: string }>;
}

const SHOPIFY_SHOP_NAME = env.SHOPIFY_SHOP_NAME;
const SHOPIFY_VARIANT_ID = env.SHOPIFY_VARIANT_ID;
const STOREFRONT_API_PUBLIC_ACCESS_TOKEN = env.STOREFRONT_PUBLIC_ACCESS_TOKEN;

export async function createCart(discountCode: string) {
  const cartCreateMutation = `
    mutation createCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          discountCodes {
            code
            applicable
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [
        {
          quantity: 1,
          merchandiseId: `gid://shopify/ProductVariant/${SHOPIFY_VARIANT_ID}`
        }
      ],
      discountCodes: [discountCode]
    }
  };

  try {
    const response = await fetch(
      `https://${SHOPIFY_SHOP_NAME}/api/${LATEST_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            STOREFRONT_API_PUBLIC_ACCESS_TOKEN
        },
        body: JSON.stringify({ query: cartCreateMutation, variables })
      }
    );

    if (!response.ok) {
      throw new Error("Could not create cart.");
    }

    const resJSON = (await response.json()) as CartResponse;

    if (resJSON.userErrors?.length > 0) {
      throw new Error("Could not create cart.");
    }
    if (!resJSON.data.cartCreate.cart) {
      throw new Error("Could not create cart.");
    } else {
      return resJSON.data.cartCreate;
    }
  } catch (error) {
    // unknown error and return
    console.error("Error creating cart:", error);
    return;
  }
}
