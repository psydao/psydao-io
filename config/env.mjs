import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CHAINALYSIS_API_KEY: z.string().min(1),
    PINATA_API_KEY: z.string().min(1),
    PINATA_SECRET_API_KEY: z.string().min(1),
    PINATA_JWT: z.string().min(1),
    SHOPIFY_API_ACCESS_TOKEN: z.string().min(1),
    STOREFRONT_PUBLIC_ACCESS_TOKEN: z.string().min(1),
    SHOPIFY_API_KEY: z.string().min(1),
    SHOPIFY_API_SECRET: z.string().min(1),
    SHOPIFY_SHOP_NAME: z.string().min(1),
    SHOPIFY_PRODUCT_ID: z.string().min(1),
    SHOPIFY_VARIANT_ID: z.string().min(1),
    POAP_API_KEY: z.string().min(1),
    POAP_EVENT_ID: z.string().min(1),
    SNAPSHOT_GRAPHQL_URL: z.string().url()
  },
  client: {
    NEXT_PUBLIC_IS_MAINNET: z.coerce.boolean(),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_CHAIN_ID: z.coerce.number(),
    NEXT_PUBLIC_MIXPANEL_ID: z.string(),
    NEXT_PUBLIC_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SUBGRAPH_URL: z.string().url(),
    NEXT_PUBLIC_MAINNET_SUBGRAPH_URL: z.string().url(),
    NEXT_PUBLIC_PINATA_BASE_URL: z.string().url(),
    NEXT_PUBLIC_ETHERSCAN_BASE_URL: z.string().url(),
    NEXT_PUBLIC_MAINNET_ETHERSCAN_BASE_URL: z.string().url(),
    NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL: z.string().url(),
    NEXT_PUBLIC_MAINNET_CLIENT: z.string(),
    NEXT_PUBLIC_WHITELISTED_ADDRESSES: z
      .array(z.string())
      .or(z.string())
      .transform((val) => (typeof val === "string" ? val.split(",") : val))
  },
  runtimeEnv: {
    CHAINALYSIS_API_KEY: process.env.CHAINALYSIS_API_KEY,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    PINATA_JWT: process.env.PINATA_JWT,
    SHOPIFY_API_ACCESS_TOKEN: process.env.SHOPIFY_API_ACCESS_TOKEN,
    STOREFRONT_PUBLIC_ACCESS_TOKEN: process.env.STOREFRONT_PUBLIC_ACCESS_TOKEN,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_SHOP_NAME: process.env.SHOPIFY_SHOP_NAME,
    SHOPIFY_PRODUCT_ID: process.env.SHOPIFY_PRODUCT_ID,
    SHOPIFY_VARIANT_ID: process.env.SHOPIFY_VARIANT_ID,
    POAP_API_KEY: process.env.POAP_API_KEY,
    POAP_EVENT_ID: process.env.POAP_EVENT_ID,

    SNAPSHOT_GRAPHQL_URL: process.env.SNAPSHOT_GRAPHQL_URL,

    NEXT_PUBLIC_IS_MAINNET: Number(process.env.NEXT_PUBLIC_CHAIN_ID) === 1,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_CHAIN_ID: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    NEXT_PUBLIC_MIXPANEL_ID: process.env.NEXT_PUBLIC_MIXPANEL_ID,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_SUBGRAPH_URL: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
    NEXT_PUBLIC_MAINNET_SUBGRAPH_URL:
      process.env.NEXT_PUBLIC_MAINNET_SUBGRAPH_URL,
    NEXT_PUBLIC_PINATA_BASE_URL: process.env.NEXT_PUBLIC_PINATA_BASE_URL,
    NEXT_PUBLIC_ETHERSCAN_BASE_URL:
      Number(process.env.NEXT_PUBLIC_CHAIN_ID) === 1
        ? process.env.NEXT_PUBLIC_MAINNET_ETHERSCAN_BASE_URL
        : process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL,
    NEXT_PUBLIC_MAINNET_ETHERSCAN_BASE_URL:
      process.env.NEXT_PUBLIC_MAINNET_ETHERSCAN_BASE_URL,
    NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL:
      process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL,
    NEXT_PUBLIC_WHITELISTED_ADDRESSES:
      process.env.NEXT_PUBLIC_WHITELISTED_ADDRESSES,
    NEXT_PUBLIC_MAINNET_CLIENT: process.env.NEXT_PUBLIC_MAINNET_CLIENT
  }
});
