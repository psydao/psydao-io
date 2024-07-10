import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleSepolia } from "@/constants/contracts";
import { parseUnits } from "viem";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
export const useBuyRandomPsycPrivate = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const buyRandomPsycPrivate = useCallback(
    async (randomFromBatchPrice: string, batchId: number, proof: string) => {
      const randomNftAmount = parseUnits(randomFromBatchPrice, 18);
      return writeContract({
        address: psycSaleSepolia,
        functionName: "buyRandomFromBatch",
        abi: psycSaleAbiSepolia,
        args: [batchId, proof],
        value: randomNftAmount
      });
    },
    [writeContract]
  );

  return {
    buyRandomPsycPrivate,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
