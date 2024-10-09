import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleMainnet, psycSaleSepolia } from "@/constants/contracts";
import { parseUnits } from "viem";
import psycSaleAbi from "@/abis/psycSaleAbi.json";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { env } from "@/config/env.mjs";
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
        address: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleMainnet : psycSaleSepolia,
        functionName: "buyRandomNftCopyFromBatch",
        abi: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleAbi : psycSaleAbiSepolia,
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
