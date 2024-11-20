import { psycSaleMainnet, psycSaleSepolia } from "@/constants/contracts";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psycSaleAbi from "@/abis/psycSaleAbi.json";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { parseUnits } from "viem";
import { env } from "@/config/env.mjs";

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
        address: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleMainnet : psycSaleSepolia,
        functionName: "buyFromBatch",
        abi: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleAbi : psycSaleAbiSepolia,
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
