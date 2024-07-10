import { psycSaleSepolia } from "@/constants/contracts";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";

export const useUpdateMerkleRoot = () => {
  const { data, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const updateMerkleRoot = useCallback(
    async (batchId: number, newMerkle: Buffer, ipfsHash: string) => {
      return writeContract({
        address: psycSaleSepolia,
        functionName: "updateMerkleRoot",
        abi: psycSaleAbiSepolia,
        args: [batchId, newMerkle, ipfsHash]
      });
    },
    [writeContract]
  );

  return {
    updateMerkleRoot,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
