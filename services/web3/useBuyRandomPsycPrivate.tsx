import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleMainnet, psycSaleSepolia } from "@/constants/contracts";
import { parseUnits } from "viem";
import psycSaleAbi from "@/abis/psycSaleAbi.json";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { env } from "@/config/env.mjs";
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
        address: env.NEXT_PUBLIC_CHAIN_ID ? psycSaleMainnet : psycSaleSepolia,
        functionName: "buyRandomFromBatch",
        abi: env.NEXT_PUBLIC_CHAIN_ID ? psycSaleAbi : psycSaleAbiSepolia,
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
