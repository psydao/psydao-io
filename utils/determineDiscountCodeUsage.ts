import { env } from "@/config/env.mjs";
import { LATEST_API_VERSION, shopifyApi } from "@shopify/shopify-api";

const SHOPIFY_API_ACCESS_TOKEN = env.SHOPIFY_API_ACCESS_TOKEN;
const SHOPIFY_API_KEY = env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = env.SHOPIFY_API_SECRET;
const SHOPIFY_SHOP_NAME = env.SHOPIFY_SHOP_NAME;

const shopify = shopifyApi({
  apiKey: SHOPIFY_API_KEY,
  apiSecretKey: SHOPIFY_API_SECRET,
  adminApiAccessToken: SHOPIFY_API_ACCESS_TOKEN,
  scopes: ["read_products", "read_discounts", "write_discounts"],
  hostName: SHOPIFY_SHOP_NAME,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  isTesting: true
});

const session = shopify.session.customAppSession(SHOPIFY_SHOP_NAME);
session.accessToken = SHOPIFY_API_ACCESS_TOKEN;

const shopifyAdminClient = new shopify.clients.Graphql({
  session,
  apiVersion: LATEST_API_VERSION
});

const GET_DISCOUNT_CODES = `
  query getDiscountCodes($query: String!) {
    codeDiscountNodes(first: 250, query: $query) {
      edges {
        node {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              codes(first: 1) {
                edges {
                  node {
                    code
                  }
                }
              }
              title
              startsAt
              endsAt
              status
              usageLimit
              usageCount
              customerSelection {
                ... on DiscountCustomerAll {
                  allCustomers
                }
              }
              customerGets {
                value {
                  ... on DiscountPercentage {
                    percentage
                  }
                }
                items {
                  ... on AllDiscountItems {
                    allItems
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface DiscountCode {
  id: string;
  code: string;
  title: string;
  startsAt: string;
  endsAt: string | null;
  status: string;
  percentage: number;
  allCustomers: boolean;
  allItems: boolean;
  usageLimit: number | null;
  usageCount: number;
  hasBeenUsed: boolean;
}

export async function getDiscountCodes(nameQuery: string) {
  try {
    const response = await shopifyAdminClient.query({
      data: {
        query: GET_DISCOUNT_CODES,
        variables: { query: `(title:*${nameQuery}* OR code:*${nameQuery}*)` }
      }
    });

    console.log(response);

    // return response.codeDiscountNodes.edges.map((edge: any) => {
    //   const node = edge.node;
    //   const discount = node.codeDiscount;
    //   return {
    //     id: node.id,
    //     code: discount.codes.edges[0].node.code,
    //     title: discount.title,
    //     startsAt: discount.startsAt,
    //     endsAt: discount.endsAt,
    //     status: discount.status,
    //     percentage: discount.customerGets.value.percentage,
    //     allCustomers: discount.customerSelection.allCustomers,
    //     allItems: discount.customerGets.items.allItems,
    //     usageLimit: discount.usageLimit,
    //     usageCount: discount.usageCount,
    //     hasBeenUsed: discount.usageCount > 0
    //   };
    // });
  } catch (error) {
    console.error("Error fetching discount codes:", error);
    throw error;
  }
}
