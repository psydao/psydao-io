import type { NextApiRequest, NextApiResponse } from "next";
import type { Address } from "viem";

type reqBodyType = {
  address: Address;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const requestBody = req.body as reqBodyType;
      // TODO: add eventId to the envs and get type for POAP response body
      const poapRes = await fetch(
        `https://api.poap.tech/actions/scan/${requestBody.address}/177622`,
        {
          headers: { accept: "application/json" },
          method: "GET"
        }
      );
      console.log(poapRes.json());
      res.status(200).send("Successfully obtained POAP status");
    } catch (error: unknown) {
      console.error("Error getting POAP status:", error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Unknown error occurred");
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
