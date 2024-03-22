import { NextApiRequest, NextApiResponse } from "next";

import cors from "cors";

const corsMiddleware = cors({
  methods: ["GET"],
  origin: "*",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, () => {});

  const { address } = req.query;

  if (!address) {
    res.status(400).json({ success: false, error: "Provide address" });
    return;
  }

  const chainalysisURL = "https://public.chainalysis.com/api/v1/address";

  try {
    const response = await fetch(`${chainalysisURL}/${address}`, {
      headers: {
        "X-API-Key": process.env.CHAINALYSIS_API_KEY ?? "",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
    return;
  }
}

export type SanctionIdentification = {
  category: string;
  name: string;
  description: string;
  url: string;
};

export type SanctionIdentificationResponse = {
  identifications: SanctionIdentification[] | [];
};
