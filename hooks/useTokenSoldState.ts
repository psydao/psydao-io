import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useReadContract } from "wagmi";

export function useTokenSoldState(tokenId: number) {
  const {
    data: isSold,
    isError,
    isLoading
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "tokenIDSold",
    args: [tokenId]
  });

  return { isSold: isSold as boolean | undefined, isError, isLoading };
}
