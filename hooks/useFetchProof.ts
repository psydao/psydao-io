import { useEffect, useState } from "react";
import { getMerkleProof } from "@/services/merkleRootProofs";
import { getAddresses } from "@/lib/server-utils";

const useFetchProof = (
  address: string | undefined,
  ipfsHash: string,
  isPrivateSale: boolean
) => {
  const [proof, setProof] = useState<string[]>([]);

  useEffect(() => {
    const fetchWhitelistAndSetProof = async () => {
      if (isPrivateSale && address) {
        try {
          const addresses: string[] = await getAddresses(ipfsHash);

          const whitelist: `0x${string}`[] = addresses.filter((addr) =>
            addr.startsWith("0x")
          ) as `0x${string}`[];

          if (whitelist.length === 1) {
            console.warn(
              "Whitelist contains only one address. Proof will be empty."
            );
          }

          const formattedAddress: `0x${string}` = address.startsWith("0x")
            ? (address as `0x${string}`)
            : `0x${address}`;

          const proof = getMerkleProof(formattedAddress, whitelist);
          setProof(proof);
        } catch (error) {
          console.error("Error fetching whitelist or generating proof:", error);
        }
      }
    };

    fetchWhitelistAndSetProof().catch((error) => {
      console.error("Error in fetchWhitelistAndSetProof:", error);
    });
  }, [address, isPrivateSale, ipfsHash]);

  return proof;
};

export default useFetchProof;
