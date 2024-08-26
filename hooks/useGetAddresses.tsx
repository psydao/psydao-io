import { CID } from "multiformats/cid";
import { useCallback, useState } from "react";
import type { Address } from "viem";

type IpfsHashResponse = {
  addresses: string[];
};

const isValidIpfsHash = (hash: string): boolean => {
  try {
    CID.parse(hash);
    return true;
  } catch (error) {
    return false;
  }
};

export const useGetAddresses = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAddresses = useCallback(
    async (ipfsHash: string): Promise<string[]> => {
      if (!ipfsHash || !isValidIpfsHash(ipfsHash)) {
        return [];
      }

      setIsLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PINATA_BASE_URL}/${ipfsHash}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch addresses: ${res.statusText}`);
        }

        const json: IpfsHashResponse = (await res.json()) as IpfsHashResponse;

        // Validate that all addresses are valid
        const validAddresses = json.addresses.filter(
          (address): address is Address => {
            try {
              return (
                typeof address === "string" &&
                address.startsWith("0x") &&
                address.length === 42
              );
            } catch {
              console.warn(`Invalid address found: ${address}`);
              return false;
            }
          }
        );

        return validAddresses;
      } catch (error) {
        console.error(
          "Error getting addresses:",
          error instanceof Error ? error.message : "Unknown error"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { getAddresses, isLoading };
};
