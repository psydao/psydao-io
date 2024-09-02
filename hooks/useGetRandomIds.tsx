import { ERC1155Mainnet, ERC1155Sepolia } from "@/constants/contracts";
import ERC1155Abi from "@/abis/ERC1155Abi.json";
import ERC1155SepoliaAbi from "@/abis/ERC115AbiSepolia.json";
import { mainnetClient, sepoliaClient } from "@/constants/publicClient";
import type { Sale } from "@/lib/types";
import { useEffect, useState } from "react";

export type TokenInformationReturn = [bigint, bigint, boolean];

const useGetRandomIds = (
  activeSale: Sale | undefined,
  isRandom: boolean,
  isOriginal: boolean
) => {
  const [availableRandomIds, setAvailableRandomIds] = useState<string[]>([]);
  const [isRandomIdsLoading, setIsRandomIdsLoading] = useState(false);

  const client =
    process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? mainnetClient : sepoliaClient;
  const contractAddress =
    process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? ERC1155Mainnet : ERC1155Sepolia;
  const contractAbi =
    process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? ERC1155Abi : ERC1155SepoliaAbi;

  useEffect(() => {
    const fetchRandomCopies = async () => {
      if (activeSale && isRandom) {
        setIsRandomIdsLoading(true);
      }
      if (activeSale && isRandom && !isOriginal) {
        const randomCopies = await Promise.all(
          activeSale.tokensOnSale.map(async (token) => {
            const currentTokenInfo = (await client.readContract({
              address: contractAddress,
              abi: contractAbi,
              functionName: "tokenInformation",
              args: [token.tokenID]
            })) as TokenInformationReturn;

            return {
              tokenID: token.tokenID,
              tokenActive: currentTokenInfo[2]
            };
          })
        );

        setAvailableRandomIds(
          randomCopies
            .filter((token) => token.tokenActive === true)
            .map((token) => token.tokenID)
        );
        if (randomCopies.length === activeSale?.tokensOnSale.length) {
          setIsRandomIdsLoading(false);
        }
      } else if (activeSale && isRandom && isOriginal) {
        setAvailableRandomIds(
          activeSale.tokensOnSale
            .filter((token) => token.buyer === null)
            .map((token) => token.tokenID)
        );
        setIsRandomIdsLoading(false);
      }
    };
    fetchRandomCopies().catch((error) => {
      console.error(error);
    });
  }, [activeSale, isOriginal]);
  return { availableRandomIds, isRandomIdsLoading };
};

export default useGetRandomIds;
