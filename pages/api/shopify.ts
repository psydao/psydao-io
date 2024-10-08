import type { NextApiRequest, NextApiResponse } from "next";
import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { type Address, getAddress } from "viem";
import { env } from "@/config/env.mjs";
import getPOAPStatus from "@/utils/getPOAPStatus";

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

interface CartResponse {
  data: {
    cartCreate: {
      cart: any;
    };
  };

  userErrors: Array<{ field: string; message: string }>;
}

const SHOPIFY_API_ACCESS_TOKEN = env.SHOPIFY_API_ACCESS_TOKEN;
const SHOPIFY_API_KEY = env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = env.SHOPIFY_API_SECRET;
const SHOPIFY_SHOP_NAME = env.SHOPIFY_SHOP_NAME;
const SHOPIFY_PRODUCT_ID = env.SHOPIFY_PRODUCT_ID;
const STOREFRONT_API_PUBLIC_ACCESS_TOKEN = env.STOREFRONT_PUBLIC_ACCESS_TOKEN;

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

const client = new shopifyClient.clients.Graphql({
  session,
  apiVersion: LATEST_API_VERSION
});

async function createCart(discountCode: string, ethAddress: Address) {
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
          merchandiseId: "gid://shopify/ProductVariant/49402271400260"
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

    const resJSON = (await response.json()) as CartResponse;

    return resJSON;
  } catch (error) {
    console.error("Error creating cart:", error);
  }
}

async function generateShopifyProductDiscount(
  ethAddress: Address
): Promise<string> {
  // generate a discount code for 100% off here

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
      title: `PsyDAO Como Hat Discount for ${ethAddress}`,
      code: discountCode,
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
            productsToAdd: [`gid://shopify/Product/9620572176708`]
          }
        }
      }
    }
  };

  try {
    // Note: OLD WAY (deprecated)
    // const response = await client.query({
    //   data: { query: mutation, variables }
    // });

    // Note: NEW WAY
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} not allowed`);
    return;
  }

  try {
    const ethAddress = req.query.ethAddress as Address;
    if (!ethAddress || !getAddress(ethAddress)) {
      return res.status(400).json({
        message: "ethAddress is required"
      });
    }

    console.log("Generating discount code for address:", ethAddress);

    // Fallback in case the button is falsely active for some reason
    const holdsPOAP = await getPOAPStatus(ethAddress);
    if (!holdsPOAP) {
      res.status(403).send({
        message: "User does not have a valid NFT"
      });
    }

    const discountCode = await generateShopifyProductDiscount(ethAddress);

    const cartResponse = await createCart(discountCode, ethAddress);

    console.log("cart response: ", cartResponse);

    return res.status(200).json({
      discountCode: discountCode,
      cartResponse: cartResponse
    });
  } catch (error) {
    console.error("Error generating discount code:", error);
    return res.status(400).json({
      message: "An error has occurred",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
