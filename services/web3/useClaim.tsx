import { psyClaimsMainnet, psyClaimsSepolia } from "@/constants/contracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psyClaimsAbi from "@/abis/psyClaimsAbi.json";
import { useCallback, useState } from "react";
import { parseUnits } from "viem";
import { env } from "@/config/env.mjs";

interface ClaimProps {
  batchId: string;
  amount: string;
  merkleProof: any;
  width: number;
  deadline: string;
}

export const useClaim = (props: ClaimProps) => {
  const [approvedSuccess, setApprovedSuccess] = useState(false);
  const { batchId, amount, merkleProof, width, deadline } = props;

  const {
    writeContract,
    data,
    isPending,
    status,
    error,
    isSuccess,
    isError,
    reset
  } = useWriteContract();

  const {
    isSuccess: writeContractSuccess,
    isLoading,
    refetch: refetchTxReceipt,
    fetchStatus,
    error: txError
  } = useWaitForTransactionReceipt({
    hash: data
  });

  const claim = useCallback(async () => {
    const spenderContract = env.NEXT_PUBLIC_IS_MAINNET
      ? psyClaimsMainnet
      : psyClaimsSepolia;

    const bnAmount = parseUnits(amount, 18);
    const currentTimestamp = new Date().getTime();

    if (Number(deadline) <= Math.floor(currentTimestamp / 1000)) {
      return writeContract({
        abi: psyClaimsAbi,
        address: spenderContract,
        functionName: "claimUnclaimedTokens",
        args: [batchId]
      });
    }

    return writeContract(
      {
        abi: psyClaimsAbi,
        address: spenderContract,
        functionName: "claim",
        args: [batchId, bnAmount, merkleProof]
      },
      {
        onSuccess() {
          setApprovedSuccess(true);
          //   refetchTxReceipt();
        },
        onSettled() {
          //   refetchTxReceipt();
        },
        onError(error) {
          console.log("useClaimError", error);
        }
      }
    );
  }, [writeContract, amount, isPending, data, status]);

  return {
    claim,
    data,
    isSuccess,
    writeContractSuccess,
    isPending,
    isLoading,
    status,
    approvedSuccess,
    error,
    txError,
    isError,
    reset
  };
};
