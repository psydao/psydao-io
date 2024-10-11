import { env } from "@/config/env.mjs";
import { Address, createPublicClient, getAddress, http, isAddress } from "viem";
import { mainnet, sepolia } from "viem/chains";

const publicClient = createPublicClient({
  chain: env.NEXT_PUBLIC_IS_MAINNET ? mainnet : sepolia,
  transport: http()
});

export async function getAddressFromQuery(address: string): Promise<Address> {
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
