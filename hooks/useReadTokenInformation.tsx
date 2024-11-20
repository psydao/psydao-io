import { erc1155sContractConfig } from "@/lib/erc1155-contract-config";
import { useMemo } from "react";
import { useReadContract } from "wagmi";

type FloorAndCeilingPriceReturn = [bigint, bigint, boolean];

const useReadTokenInformation = (tokenId: string) => {
  const {
    data,
    isError: tokenInformationError,
    isLoading: tokenInformationLoading
  } = useReadContract({
    ...erc1155sContractConfig,
    functionName: "tokenInformation",
    args: [tokenId]
  });

  const tokenInformationData = useMemo(() => {
    return data as FloorAndCeilingPriceReturn;
  }, [data]);
  return {
    tokenInformationData,
    tokenInformationError,
    tokenInformationLoading
  };
};

export default useReadTokenInformation;
