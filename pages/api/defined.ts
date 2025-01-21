import { env } from "@/config/env.mjs";
import { Codex } from "@codex-data/sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { addresses } = req.body;

    const codexSDK = new Codex(env.CODEX_API_KEY!);

    const response = await codexSDK.queries.getTokenPrices({
      inputs: addresses.map((address: string) => ({
        address,
        networkId: 1
      }))
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch token prices" });
  }
}
