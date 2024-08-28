import { ERC1155Mainnet, ERC1155Sepolia } from "@/constants/contracts";
import ERC1155Abi from "@/abis/ERC1155Abi.json";
import ERC1155SepoliaAbi from "@/abis/ERC115AbiSepolia.json";
import { sepoliaClient } from "@/constants/publicClient";
import type { Sale } from "@/lib/types";
import { useEffect, useState } from "react";

export type TokenInformationReturn = [bigint, bigint, boolean];

const useGetRandomCopies = (
  activeSale: Sale | undefined,
  isRandom: boolean,
  isOriginal: boolean
) => {
  const [availableRandomCopies, setAvailableRandomCopies] = useState<
    { tokenID: string; tokenActive: boolean }[]
  >([]);

  useEffect(() => {
    const fetchRandomCopies = async () => {
      if (activeSale && isRandom && !isOriginal) {
        const randomCopies = await Promise.all(
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? activeSale.tokensOnSale.map(async (token) => {
                const currentTokenInfo = (await sepoliaClient.readContract({
                  address: ERC1155Mainnet,
                  abi: ERC1155Abi,
                  functionName: "tokenInformation",
                  args: [token.tokenID]
                })) as TokenInformationReturn;
                return {
                  tokenID: token.tokenID,
                  tokenActive: currentTokenInfo[2]
                };
              })
            : activeSale.tokensOnSale.map(async (token) => {
                const currentTokenInfo = (await sepoliaClient.readContract({
                  address: ERC1155Sepolia,
                  abi: ERC1155SepoliaAbi,
                  functionName: "tokenInformation",
                  args: [token.tokenID]
                })) as TokenInformationReturn;

                return {
                  tokenID: token.tokenID,
                  tokenActive: currentTokenInfo[2]
                };
              })
        );
        setAvailableRandomCopies(randomCopies);
      }
    };
    fetchRandomCopies().catch(console.error);
  }, [activeSale, isRandom, isOriginal]);
  return availableRandomCopies;
};

export default useGetRandomCopies;
