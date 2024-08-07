import { psycSaleMainnet, psycSaleSepolia } from "@/constants/contracts";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psycSaleAbi from "@/abis/psycSaleAbiSepolia.json";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { parseUnits } from "viem";

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
        address:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? psycSaleMainnet
            : psycSaleSepolia,
        functionName: "buyNftCopyFromBatch",
        abi:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? psycSaleAbi
            : psycSaleAbiSepolia,
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
