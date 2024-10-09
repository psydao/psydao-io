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

export interface PoapResponseType {
  event: {
    id: number;
    fancy_id: string;
    name: string;
    event_url: string;
    image_url: string;
    country: string;
    city: string;
    description: string;
    year: number;
    start_date: Date;
    end_date: Date;
    expiry_date: Date;
    tokenId: string;
    owner: string;
  };
}

//! USE TEST POAP ID FOR TESTING
const POAP_EVENT_ID = env.POAP_EVENT_ID;

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
        res.status(204).end();
        return;
      }

      if (poapRes.status !== 404 && !poapRes.ok) {
        res.status(poapRes.status).send(poapRes.statusText);
        return;
      }

      const jsonPoapResponse = (await poapRes.json()) as PoapResponseType;

      res.status(200).send(jsonPoapResponse);
      return;
    } catch (error: unknown) {
      console.error("Error getting POAP status:", error);
      if (error instanceof Error) {
        console.error("Error:", error.message);
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Unknown error occurred");
      }
    }
  } else {
    console.error("Method not allowed");
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
}
