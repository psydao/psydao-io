import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleSepolia } from "@/constants/contracts";
import { parseUnits } from "viem";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
export const useBuyRandomPsycCopyPublic = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const buyRandomPsycCopyPublic = useCallback(
    async (buyRandomCopyFromBatch: string, batchId: number) => {
      const randomNftCopyAmount = parseUnits(buyRandomCopyFromBatch, 18);
      return writeContract({
        address: psycSaleSepolia,
        functionName: "buyRandomNftCopyFromBatch",
        abi: psycSaleAbiSepolia,
        args: [batchId],
        value: randomNftCopyAmount
      });
    },
    [writeContract]
  );

  return {
    buyRandomPsycCopyPublic,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
