import { useCallback, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psyTokenAbi from "@/abis/psyTokenAbi.json";
import {
  psyClaimsMainnet,
  psyClaimsSepolia,
  psyNFTMainnet,
  psyNFTSepolia,
  psyTokenSepolia
} from "@/constants/contracts";
import { env } from "process";

export const useApprovePsy = (amount: BigInt) => {
  const [approvedSuccess, setApprovedSuccess] = useState(false);

  const { writeContract, data, isPending, status, error, reset } =
    useWriteContract();

  const {
    isSuccess,
    isFetching,
    refetch: refetchTxReceipt,
    fetchStatus,
    error: txError
  } = useWaitForTransactionReceipt({
    hash: data
  });

  const approve = useCallback(async () => {
    const spenderContract = env.NEXT_PUBLIC_IS_MAINNET
      ? psyClaimsMainnet
      : psyClaimsSepolia;
    return writeContract(
      {
        abi: psyTokenAbi,
        address: psyTokenSepolia,
        functionName: "approve",
        args: [spenderContract, amount]
      },
      {
        onSuccess() {
          setApprovedSuccess(true);
        },
        onSettled() {
          refetchTxReceipt();
        }
      }
    );
  }, [writeContract, amount, isPending, data, isSuccess, isFetching, status]);

  return {
    approve,
    data,
    isFetching,
    isSuccess,
    status,
    fetchStatus,
    approvedSuccess,
    error,
    txError
  };
};
