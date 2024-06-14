import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleSepolia } from "@/constants/contracts";
import { parseUnits } from "viem";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
export const useBuyRandomPsycPublic = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const buyRandomPsycPublic = useCallback(
    async (buyRandomFromBatch: string, batchId: number) => {
      const randomNftCopyAmount = parseUnits(buyRandomFromBatch, 18);
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
    buyRandomPsycPublic,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
