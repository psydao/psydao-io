import { erc1155sContractConfig } from "@/lib/erc1155-contract-config";
import { useMemo } from "react";
import { useReadContract } from "wagmi";

type FloorAndCeilingPriceReturn = [bigint, bigint, boolean];

const useReadFloorAndCeilingPrice = (tokenId: string) => {
  const {
    data,
    isError: floorAndCeilingPriceError,
    isLoading: floorAndCeilingPriceLoading
  } = useReadContract({
    ...erc1155sContractConfig,
    functionName: "tokenInformation",
    args: [tokenId]
  });

  const floorAndCeilingPriceData = useMemo(() => {
    return data as FloorAndCeilingPriceReturn;
  }, [data]);
  return {
    floorAndCeilingPriceData,
    floorAndCeilingPriceError,
    floorAndCeilingPriceLoading
  };
};

export default useReadFloorAndCeilingPrice;
