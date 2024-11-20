import { sortOutData } from '@/lib/services/merkle';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { claims, address } = req.body;

  if (!claims || !address) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const data = await sortOutData(claims, address);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error calling backend API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
