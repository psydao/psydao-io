import { useCallback, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import psyTokenAbi from "@/abis/psyTokenAbi.json";
import { psyClaimsMainnet, psyClaimsSepolia, psyNFTMainnet, psyNFTSepolia } from "@/constants/contracts";
import { env } from "process";

export const useApprovePsy = () => {
  const [approvedSuccess, setApprovedSuccess] = useState(false);

  const { writeContract, data, isPending, status } = useWriteContract();

  const {
    isSuccess,
    isFetching,
    refetch: refetchTxReceipt,
    fetchStatus
  } = useWaitForTransactionReceipt({
    hash: data
  });

  const approve = useCallback(async () => {
    const spenderContract = env.NEXT_PUBLIC_IS_MAINNET ? psyClaimsMainnet : psyClaimsSepolia;
    console.log({ spenderContract });
    const amount = BigInt(2);
    return writeContract(
      {
        abi: psyTokenAbi,
        address: '0x0973F4c0B86f2EFCA3673864efccBd6090702321',
        functionName: "approve",
        args: [psyClaimsSepolia, amount]
      },
      {
        onSuccess() {
          setApprovedSuccess(true);
          refetchTxReceipt();
        },
        onSettled() {
          refetchTxReceipt();
        }
      }
    );
  }, [
    writeContract,
    isPending,
    data,
    isSuccess,
    isFetching,
    status
  ]);

  return {
    approve,
    data,
    isFetching,
    isSuccess,
    status,
    fetchStatus,
    approvedSuccess
  };
};