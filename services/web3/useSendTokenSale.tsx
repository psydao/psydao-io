import { useCallback } from "react";
import { parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import { env } from "@/config/env.mjs";

export const useSendTokenSale = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const sendTokenSale = useCallback(
    async (amountOfPsyTokens: number, ethToSpent: string) => {
      const psyGwei = parseUnits(amountOfPsyTokens.toString(), 18);
      const ethGwei = parseUnits(ethToSpent, 18);
      return writeContract({
        address: env.NEXT_PUBLIC_IS_MAINNET
          ? tokenSaleContract
          : tokenSaleContractSepolia,
        functionName: "buyTokens",
        abi: env.NEXT_PUBLIC_IS_MAINNET ? tokenSaleAbi : tokenSaleAbiSepolia,
        args: [psyGwei],
        value: ethGwei
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
