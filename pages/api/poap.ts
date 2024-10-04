import { env } from "@/config/env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPublicClient,
  getAddress,
  http,
  isAddress,
  type Address
} from "viem";
import { mainnet, sepolia } from "viem/chains";

const POAP_EVENT_ID = env.POAP_EVENT_ID;
// const POAP_EVENT_ID = 177985;

const publicClient = createPublicClient({
  chain: env.NEXT_PUBLIC_IS_MAINNET ? mainnet : sepolia,
  transport: http()
});

async function getAddressFromQuery(address: string): Promise<Address> {
  if (isAddress(address)) {
    return getAddress(address);
  }

  // check if its an ENS name
  const resolvedAddress: Address | null = await publicClient.getEnsAddress({
    name: address
  });
  if (resolvedAddress) {
    return resolvedAddress;
  }

  throw new Error("Invalid ethereum address");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { address } = req.query as { address: string };
      const normalizedAddress = await getAddressFromQuery(address);

      // TODO: Get type for POAP response body
      const poapRes = await fetch(
        `https://api.poap.tech/actions/scan/${normalizedAddress}/${POAP_EVENT_ID}`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": env.POAP_API_KEY
          },
          method: "GET"
        }
      );
      if (poapRes.status === 404) {
        console.info(
          "User does not have POAP. They are either ineligible or have not claimed it yet."
        );
        res.status(201).send({
          message: "User does not currently hold a valid POAP token"
        });
      }

      if (poapRes.status !== 404 && !poapRes.ok) {
        res.status(poapRes.status).send(poapRes.statusText);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const jsonPoapResponse = await poapRes.json();

      res.status(200).send(jsonPoapResponse);
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
