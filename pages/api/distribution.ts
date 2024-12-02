import { pinAddresses } from "@/lib/server-utils";
import { main } from "@/lib/services/voteCounter";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { startTimeStamp, endTimeStamp, totalAmountOfTokens, batchId } =
      req.body;

    if (!startTimeStamp || !endTimeStamp || !totalAmountOfTokens || !batchId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    try {
      const merkleTree = await main(
        Number(startTimeStamp),
        Number(endTimeStamp),
        totalAmountOfTokens.toString(),
        Number(batchId)
      );

      return res.status(200).json(merkleTree);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
