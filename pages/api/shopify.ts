import type { NextApiRequest, NextApiResponse } from "next";
import "@shopify/shopify-api/adapters/node";
import { type Address, getAddress } from "viem";
import { generateShopifyProductDiscount } from "@/utils/generateProductDiscount";
import { createCart } from "@/utils/createShopifyCart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    const ethAddress = req.query.ethAddress as Address;
    if (!ethAddress || !getAddress(ethAddress)) {
      return res.status(400).json({
        message: "ethAddress is required"
      });
    }

    const discountCode = await generateShopifyProductDiscount(ethAddress);

    const cartResponse = await createCart(discountCode);

    const discountCodeMatches =
      cartResponse?.cart?.discountCodes &&
      cartResponse.cart.discountCodes?.find(
        (code) => code.code === discountCode
      );

    if (
      !discountCode ||
      !cartResponse ||
      !cartResponse.cart ||
      !discountCodeMatches
    ) {
      return res.status(400).json({
        message: "Could not create cart"
      });
    }

    return res.status(200).json({
      discountCode: discountCode,
      checkoutUrl: cartResponse.cart.checkoutUrl
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(400).json({
      message: "An error has occurred",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
