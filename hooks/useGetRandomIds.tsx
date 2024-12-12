import { ERC1155Mainnet, ERC1155Sepolia } from "@/constants/contracts";
import ERC1155Abi from "@/abis/ERC1155Abi.json";
import ERC1155SepoliaAbi from "@/abis/ERC115AbiSepolia.json";
import { mainnetClient, sepoliaClient } from "@/constants/publicClient";
import type { Sale, TokenOnSale } from "@/lib/types";
import { useEffect, useState } from "react";
import { env } from "@/config/env.mjs";

export type TokenInformationReturn = [bigint, bigint, boolean];

const useGetRandomIds = (
  allTokensOnSale: TokenOnSale[] | undefined,
  isRandom: boolean,
  isOriginal: boolean
) => {
  const [availableRandomIds, setAvailableRandomIds] = useState<string[]>([]);
  const [isRandomIdsLoading, setIsRandomIdsLoading] = useState(false);

  const client = env.NEXT_PUBLIC_IS_MAINNET ? mainnetClient : sepoliaClient;
  const contractAddress = env.NEXT_PUBLIC_IS_MAINNET
    ? ERC1155Mainnet
    : ERC1155Sepolia;
  const contractAbi = env.NEXT_PUBLIC_IS_MAINNET
    ? ERC1155Abi
    : ERC1155SepoliaAbi;

  useEffect(() => {
    const fetchRandomCopies = async () => {
      if (allTokensOnSale && isRandom) {
        setIsRandomIdsLoading(true);
      }
      if (allTokensOnSale && isRandom && !isOriginal) {
        const randomCopies = await Promise.all(
          allTokensOnSale.map(async (token) => {
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
      } else if (allTokensOnSale && isRandom && isOriginal) {
        setAvailableRandomIds(
          allTokensOnSale
            .filter((token) => token.buyer === null)
            .map((token) => token.tokenID)
        );
      }
    };
    fetchRandomCopies()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsRandomIdsLoading(false);
      });
  }, [allTokensOnSale, isOriginal]);
  return { availableRandomIds, isRandomIdsLoading };
};

export default useGetRandomIds;
