import { ERC1155Mainnet, ERC1155Sepolia } from "@/constants/contracts";
import ERC1155Abi from "@/abis/ERC1155Abi.json";
import ERC1155SepoliaAbi from "@/abis/ERC115AbiSepolia.json";
import { mainnetClient, sepoliaClient } from "@/constants/publicClient";
import type { TokenOnSale } from "@/lib/types";
import { useEffect, useState } from "react";
import { env } from "@/config/env.mjs";

export type TokenInformationReturn = [bigint, bigint, boolean];

const useGetRandomIds = (
  tokensOnSale: TokenOnSale[] | undefined,
  isRandom: boolean,
  isOriginal: boolean
) => {
  const [availableRandomIds, setAvailableRandomIds] = useState<TokenOnSale[]>(
    []
  );
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
      if (tokensOnSale && isRandom) {
        setIsRandomIdsLoading(true);
      }
      if (tokensOnSale && isRandom && !isOriginal) {
        const randomCopies = await Promise.all(
          tokensOnSale.map(async (token) => {
            const currentTokenInfo = (await client.readContract({
              address: contractAddress,
              abi: contractAbi,
              functionName: "tokenInformation",
              args: [token.tokenID]
            })) as TokenInformationReturn;

            return {
              tokenID: token.tokenID,
              buyer: token.buyer,
              id: token.id,
              tokenActive: currentTokenInfo[2],
              sale: token.sale
            };
          })
        );

        setAvailableRandomIds(
          randomCopies
            .filter((token) => token.tokenActive === true)
            .map((token) => ({
              id: token.id,
              buyer: token.buyer,
              tokenID: token.tokenID,
              sale: token.sale
            }))
        );
      } else if (tokensOnSale && isRandom && isOriginal) {
        setAvailableRandomIds(
          tokensOnSale
            .filter((token) => token.buyer === null)
            .map((token) => ({
              id: token.id,
              buyer: null,
              tokenID: token.tokenID,
              sale: token.sale
            }))
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
  }, [tokensOnSale, isOriginal]);
  return { availableRandomIds, isRandomIdsLoading };
};

export default useGetRandomIds;
