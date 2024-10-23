import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { startTimeStamp, endTimeStamp, totalAmountOfTokens, batchId } = req.body;

  if (!startTimeStamp || !endTimeStamp || !totalAmountOfTokens || !batchId) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch(`${env.PSYDAO_API_URL}/distribution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startTimeStamp,
        endTimeStamp,
        totalAmountOfTokens,
        batchId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.error || "An error occurred" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error calling backend API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
