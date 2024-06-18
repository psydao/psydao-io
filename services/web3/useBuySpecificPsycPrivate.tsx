import { psycSaleSepolia } from "@/constants/contracts";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { parseUnits } from "viem";

export const useBuySpecificPsycPrivate = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const buySpecificPsycPrivate = useCallback(
    async (
      buyFromBatch: string,
      batchId: number,
      tokenId: number,
      proof: string
    ) => {
      const buyFromBatchBigInt = parseUnits(buyFromBatch, 18);
      return writeContract({
        address: psycSaleSepolia,
        functionName: "buyFromBatch",
        abi: psycSaleAbiSepolia,
        args: [batchId, tokenId, proof],
        value: buyFromBatchBigInt
      });
    },
    [writeContract]
  );

  return {
    buySpecificPsycPrivate,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
