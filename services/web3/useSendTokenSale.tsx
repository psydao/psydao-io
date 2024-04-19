import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "constants/contracts";
import { parseEther, parseUnits } from "viem";
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
      const psyGwei = parseUnits(amountOfPsyTokens.toString(), 18);
      const ethGwei = parseUnits(ethToSpent, 18);
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
