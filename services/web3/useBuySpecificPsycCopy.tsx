import { psycSaleMainnet, psycSaleSepolia } from "@/constants/contracts";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psycSaleAbi from "@/abis/psycSaleAbiSepolia.json";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { parseUnits } from "viem";
import { env } from "@/config/env.mjs";

export const useBuySpecificPsycCopy = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const buySpecificPsycCopy = useCallback(
    async (
      buyNftCopyFromBatch: string,
      batchId: number,
      erc721TokenId: number
    ) => {
      const nftCopyAmount = parseUnits(buyNftCopyFromBatch, 18);
      return writeContract({
        address: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleMainnet : psycSaleSepolia,
        functionName: "buyNftCopyFromBatch",
        abi: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleAbi : psycSaleAbiSepolia,
        args: [batchId, erc721TokenId],
        value: nftCopyAmount
      });
    },
    [writeContract]
  );

  return {
    buySpecificPsycCopy,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
