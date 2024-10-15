import {
  SHOPIFY_API_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_PRODUCT_ID,
  SHOPIFY_SHOP_NAME
} from "@/constants/shopify";
import { LATEST_API_VERSION, shopifyApi } from "@shopify/shopify-api";
import type { Address } from "viem";

interface ShopifyResponse {
  discountCodeBasicCreate: {
    codeDiscountNode: {
      codeDiscount: {
        codes: {
          edges: Array<{
            node: {
              code: string;
            };
          }>;
        };
      };
    };
    userErrors: Array<{ field: string; message: string }>;
  };
}

const shopifyClient = shopifyApi({
  apiKey: SHOPIFY_API_KEY,
  apiSecretKey: SHOPIFY_API_SECRET,
  adminApiAccessToken: SHOPIFY_API_ACCESS_TOKEN,
  scopes: ["read_products", "read_discounts", "write_discounts"],
  hostName: SHOPIFY_SHOP_NAME,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  isTesting: true
});

const session = shopifyClient.session.customAppSession(SHOPIFY_SHOP_NAME);
session.accessToken = SHOPIFY_API_ACCESS_TOKEN;

export async function generateShopifyProductDiscount(
  ethAddress: Address
): Promise<string> {
  // generate a discount code for 100% off here
  const session = shopifyClient.session.customAppSession(SHOPIFY_SHOP_NAME);
  session.accessToken = SHOPIFY_API_ACCESS_TOKEN;

  const client = new shopifyClient.clients.Graphql({
    session,
    apiVersion: LATEST_API_VERSION
  });

  const discountCode = `PSYDAO-${ethAddress.slice(2, 8)}-${Date.now()}`; // get discount codes

  const discountMutation = `
      mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
        discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBasic {
                codes(first: 1) {
                  edges {
                    node {
                      code
                    }
                  }
                }
              }
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
    basicCodeDiscount: {
      title: `PsyDAO Camo Hat Discount for ${ethAddress}`,
      code: discountCode,
      combinesWith: {
        shippingDiscounts: true
      },
      startsAt: new Date().toISOString(),
      customerSelection: {
        all: true
      },
      usageLimit: 1,
      appliesOncePerCustomer: true,
      customerGets: {
        value: {
          percentage: 1.0
        },
        items: {
          products: {
            productsToAdd: [`gid://shopify/Product/${SHOPIFY_PRODUCT_ID}`]
          }
        }
      }
    }
  };

  try {
    const response = await client.request(discountMutation, {
      variables
    });

    if (response.data) {
      const result = response.data as ShopifyResponse;
      if (result.discountCodeBasicCreate?.userErrors?.length > 0) {
        const errorMessage =
          result.discountCodeBasicCreate.userErrors[0]?.message ??
          "Unknown error";
        throw new Error(errorMessage);
      }

      return discountCode;
    }
    throw new Error("Failed to generate discount code");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        shopName: SHOPIFY_SHOP_NAME,
        hasAccessToken: !!SHOPIFY_API_ACCESS_TOKEN
      });
    } else {
      console.error("Error details:", {
        message: error,
        shopName: SHOPIFY_SHOP_NAME,
        hasAccessToken: !!SHOPIFY_API_ACCESS_TOKEN
      });
    }
    throw new Error("Failed to generate discount code");
  }
}
