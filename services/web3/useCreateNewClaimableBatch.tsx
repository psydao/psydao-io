import { env } from "process";
import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { psyClaimsMainnet, psyClaimsSepolia } from "@/constants/contracts";
import psyClaimsAbi from "@/abis/psyClaimsAbi.json";

export const useCreateNewClaimableBatch = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  console.log("hook", data, isPending, error);
  const createNewClaimableBatch = useCallback(
    async (proof: string, deadline: string, ipfsHash: string) => {
      return writeContract({
        address: env.NEXT_PUBLIC_IS_MAINNET
          ? psyClaimsMainnet
          : psyClaimsSepolia,
        functionName: "createNewClaimableBatch",
        abi: env.NEXT_PUBLIC_IS_MAINNET ? psyClaimsAbi : psyClaimsAbi,
        args: [proof, deadline, ipfsHash]
      });
    },
    [writeContract]
  );

  return {
    createNewClaimableBatch,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
