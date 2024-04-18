import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "constants/contracts";
import { parseEther } from "viem";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";

export const useSendTokenSale = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const sendTokenSale = useCallback(
    async (amountOfPsyTokens: number, ethToSpent: string) => {
      return writeContract({
        address:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? tokenSaleContract
            : tokenSaleContractSepolia,
        functionName: "buyTokens",
        abi:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? tokenSaleAbi
            : tokenSaleAbiSepolia,
        args: [amountOfPsyTokens],
        value: parseEther(ethToSpent)
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
    error
  };
};
