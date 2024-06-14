import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleSepolia } from "@/constants/contracts";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";

export const useCreatePsycSale = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const createSale = useCallback(
    async (
      tokenIds: number[],
      saleStartTime: number,
      floorPrice: number,
      ceilingPrice: number,
      merkleRoot: string,
      ipfsHash: string
    ) => {
      return writeContract({
        address: psycSaleSepolia,
        functionName: "createSaleBatch",
        abi: psycSaleAbiSepolia,
        args: [
          tokenIds,
          saleStartTime,
          floorPrice,
          ceilingPrice,
          merkleRoot,
          ipfsHash
        ]
      });
    },
    [writeContract]
  );

  return {
    createSale,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
