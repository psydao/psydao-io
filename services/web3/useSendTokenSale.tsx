import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { tokenSaleContract } from "constants/contracts";
import { parseEther } from "viem";
import tokenSaleAbi from "../../abis/tokenSaleAbi.json";

export const useSendTokenSale = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const sendTokenSale = useCallback(
    async (amountOfPsyTokens: number, ethToSpent: string) => {
      return writeContract({
        address: tokenSaleContract,
        functionName: "buyTokens",
        abi: tokenSaleAbi,
        args: [amountOfPsyTokens],
        value: parseEther(ethToSpent),
      });
    },
    [writeContract]
  );

  return {
    data,
    sendTokenSale,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
};
