import { NextApiRequest, NextApiResponse } from "next";
import "@shopify/shopify-api/adapters/node";
import { LATEST_API_VERSION, shopifyApi } from "@shopify/shopify-api";
import {
  SHOPIFY_API_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SHOP_NAME
} from "@/constants/shopifyWidget";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { query, variables } = req.body;

  try {
    const { data, errors } = await client.request(query, {
      variables: variables
    });
    if (errors) {
      console.error("Shopify API Errors:", errors);
      return res.status(400).json({ message: "Error querying Shopify API" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "";
    console.error("Shopify API Error:", errorMessage);
    res
      .status(500)
      .json({ message: `Error querying Shopify API: ${errorMessage}` });
  }
}
