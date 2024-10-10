import type { NextApiRequest, NextApiResponse } from "next";
import "@shopify/shopify-api/adapters/node";
import { type Address, getAddress } from "viem";
import getPOAPStatus from "@/utils/getPOAPStatus";
import { generateShopifyProductDiscount } from "@/utils/generateProductDiscount";
import { createCart } from "@/utils/createShopifyCart";

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

    // Fallback in case the button is falsely active for some reason
    const holdsPOAP = await getPOAPStatus(ethAddress);
    if (!holdsPOAP) {
      res.status(403).send({
        message: "User does not have a valid NFT"
      });
      return;
    }

    const discountCode = await generateShopifyProductDiscount(ethAddress);

    const cartResponse = await createCart(discountCode);

    if (!discountCode || !cartResponse) {
      res.status(400).json({
        message: "Could not create cart"
      });
    }

    res.status(200).json({
      discountCode: discountCode,
      cartResponse: cartResponse
    });
    return;
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(400).json({
      message: "An error has occurred",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
