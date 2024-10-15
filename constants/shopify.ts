import { env } from "process";

const SHOPIFY_API_ACCESS_TOKEN = env.SHOPIFY_API_ACCESS_TOKEN ?? "";
const SHOPIFY_API_KEY = env.SHOPIFY_API_KEY ?? "";
const SHOPIFY_API_SECRET = env.SHOPIFY_API_SECRET ?? "";
const SHOPIFY_SHOP_NAME = env.SHOPIFY_SHOP_NAME ?? "";
const SHOPIFY_VARIANT_ID = env.SHOPIFY_VARIANT_ID ?? "";
const STOREFRONT_API_PUBLIC_ACCESS_TOKEN =
  env.STOREFRONT_PUBLIC_ACCESS_TOKEN ?? "";
const SHOPIFY_PRODUCT_ID = env.SHOPIFY_PRODUCT_ID;

export {
  SHOPIFY_API_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SHOP_NAME,
  SHOPIFY_VARIANT_ID,
  STOREFRONT_API_PUBLIC_ACCESS_TOKEN,
  SHOPIFY_PRODUCT_ID
};
