import { env } from "@/config/env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Address } from "viem";

const POAP_EVENT_ID = env.NEXT_PUBLIC_POAP_EVENT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { address } = req.query as { address: Address };
      // TODO: Get type for POAP response body
      const poapRes = await fetch(
        `https://api.poap.tech/actions/scan/${address}/${POAP_EVENT_ID}`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": env.POAP_API_KEY
          },
          method: "GET"
        }
      );
      console.log(poapRes.json(), poapRes.body);
      res.status(200).send(poapRes.json());
    } catch (error: unknown) {
      console.error("Error getting POAP status:", error);
      if (error instanceof Error) {
        console.log("Error:", error.message);
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Unknown error occurred");
      }
    }
  } else {
    console.log("Method not allowed");
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
