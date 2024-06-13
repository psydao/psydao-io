import { tokenSaleContractSepolia } from "@/constants/contracts";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import { parseUnits } from "viem";

export const useBuyRandomPsycPrivate = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const buyRandomPsycPrivate = useCallback(
    async (buyRandomFromBatch: string, batchId: number, proof: string) => {
      const randomNftAmount = parseUnits(buyRandomFromBatch, 18);
      return writeContract({
        address: tokenSaleContractSepolia,
        functionName: "buyRandomFromBatch",
        abi: tokenSaleAbiSepolia,
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
