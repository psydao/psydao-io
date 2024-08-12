import { useCallback, useEffect } from "react";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import { useCustomToasts } from "@/hooks/useCustomToasts";

export const useWithdrawTokens = (tokenBalance: number, width: number) => {
  const { data, writeContract, isPending, error } = useWriteContract();
  const { showCustomErrorToast, showSuccessToast } = useCustomToasts();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const withdrawTokens = useCallback(async () => {
    if (tokenBalance > 0) {
      return writeContract({
        address:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? tokenSaleContract
            : tokenSaleContractSepolia,
        functionName: "withdrawTokens",
        abi:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? tokenSaleAbi
            : tokenSaleAbiSepolia
      });
    }
  }, [writeContract]);

  useEffect(() => {
    if (error) {
      showCustomErrorToast(error.message, width);
      return;
    }

    if (isConfirmed) {
      showSuccessToast("Tokens successfully withdrawn!", width);
      return;
    }
  }, [error, isConfirmed]);

  return {
    data,
    withdrawTokens,
    isPending,
    isConfirming,
    isConfirmed,
    error
  };
};
