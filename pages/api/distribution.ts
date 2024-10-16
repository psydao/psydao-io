import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { startTimeStamp, endTimeStamp, totalAmountOfTokens } = req.body;

  if (!startTimeStamp || !endTimeStamp || !totalAmountOfTokens) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch("http://localhost:4000/distribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startTimeStamp,
        endTimeStamp,
        totalAmountOfTokens
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
