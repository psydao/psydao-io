import type { NextApiRequest, NextApiResponse } from "next";
import "@shopify/shopify-api/adapters/node";
import { type Address } from "viem";
import { getAddressFromQuery } from "@/utils/getAddressFromQuery";
import { LATEST_API_VERSION, shopifyApi } from "@shopify/shopify-api";
import {
  SHOPIFY_API_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SHOP_NAME
} from "@/constants/shopifyWidget";

interface DiscountReturnType {
  codeDiscountNodes: {
    edges: Array<{
      node: {
        id: string;
        codeDiscount: {
          title: string;
          status: string;
          usageLimit: number;
          asyncUsageCount: number;
        };
      };
    }>;
  };
}

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
              title
              status
              usageLimit
              asyncUsageCount
            }
          }
        }
      }
    }
    }
`;

export async function hasNeverUsedADiscountCode(address: Address | undefined) {
  try {
    if (!address) {
      throw new Error("No address provided");
    }

    const response = await shopifyAdminClient.request(GET_DISCOUNT_CODES, {
      variables: { query: `(title:*${address}*)` }
    });

    if (!response.data) {
      throw new Error("Could not fetch discount usage data");
    }

    if (response.errors?.message || response.errors?.graphQLErrors?.length) {
      throw new Error("Could not fetch discount usage data");
    }

    const responseData = response.data as DiscountReturnType;
    const createdDiscountCodes = responseData.codeDiscountNodes.edges.map(
      (edge) => {
        return edge.node.codeDiscount;
      }
    );

    const hasNeverUsedDiscountCode = createdDiscountCodes.every(
      (codeDiscount) => codeDiscount.asyncUsageCount === 0
    );

    return {
      userHasNotUsedDiscountCode: hasNeverUsedDiscountCode
    };
  } catch (error) {
    console.error("Error fetching discount codes:", error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    const address = req.query.address as Address;

    const ethAddress = await getAddressFromQuery(address);

    const hasNotUsedADiscountCode = await hasNeverUsedADiscountCode(ethAddress);

    if (!hasNotUsedADiscountCode) {
      return res.status(400).json({
        message: "Could not fetch discount code usage data"
      });
    }

    return res.status(200).json(hasNotUsedADiscountCode);
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(400).json({
      message: "An error has occurred",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
