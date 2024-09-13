import type { NextApiRequest, NextApiResponse } from "next";
import type { Address } from "viem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { address } = req.query as { address: Address };
      // TODO: add eventId to the envs and get type for POAP response body
      const poapRes = await fetch(
        `https://api.poap.tech/actions/scan/${address}/177622`,
        {
          headers: { accept: "application/json" },
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
