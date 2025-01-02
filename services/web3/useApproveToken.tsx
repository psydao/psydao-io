import { useCallback, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, Abi, parseEther } from "viem";

interface UseApproveTokenParams {
  tokenAddress: Address;
  spenderAddress: Address;
  abi: Abi;
}

export function useApproveToken({
  tokenAddress,
  spenderAddress,
  abi
}: UseApproveTokenParams) {
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

  const approve = useCallback(
    async (approvalAmount: bigint) => {
      console.log('approving in approve ', approvalAmount.toString())
      const parsedAmount = parseEther(approvalAmount.toString())
      return writeContract(
        {
          address: tokenAddress,
          abi,
          functionName: "approve",
          args: [spenderAddress, parsedAmount]
        },
        {
          onSuccess() {
            setApprovedSuccess(true);
          },
          onError(error) {
            console.error("useApproveTokenError", error);
          }
        }
      );
    },
    [writeContract, tokenAddress, spenderAddress, abi]
  );

  return {
    approve,
    data,
    isFetching,
    isPending,
    isSuccess,
    status,
    fetchStatus,
    approvedSuccess,
    error,
    txError,
    resetApprove: reset,
    refetchApprovalTxReceipt: refetchTxReceipt
  };
}
