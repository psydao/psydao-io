import { freebaseSepolia } from "@/constants/contracts";
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json";
import { useWriteContract } from "wagmi";
import { type Address, erc20Abi, parseEther } from "viem";
import { getTransactionReceipt } from "@wagmi/core";
import { useApproveToken } from "@/services/web3/useApproveToken";
import useGetTokenAllowance from "@/services/web3/useGetTokenAllowance";
import { useEffect, useState } from "react";
import { useRewardTokens } from "@/hooks/useFreebaseUser";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";
import { env } from "@/config/env.mjs";
import { wagmiConfig } from "@/providers/Web3Provider";

export const FREEBASE_ADDRESS =
  env.NEXT_PUBLIC_FREEBASE_CONTRACT_ADDRESS as Address;
export const FREEBASE_ABI = psydaoMasterBaseAbi;

//#region interfaces
interface AddDepositTokenParams {
  allocPoint: bigint;
  token: Address;
  withUpdate: boolean;
}

interface AddRewardTokenParams {
  rewardToken: Address;
  transferAmount: bigint;
}

interface SetRewardTokenParams {
  rewardToken: Address;
}

interface UpdateRewardPerBlockParams {
  rewardPerBlock: bigint;
}

interface SetAllocationPointParams {
  pid: bigint;
  allocPoint: bigint;
  withUpdate: boolean;
}

interface TopUpRewardParams {
  rewardToken: Address;
  transferAmount: string;
}
//#endregion

/**
 * Add a deposit token to the freebase
 * @returns {Object} - An object containing the addDepositToken function, the transaction hash, and the status of the transaction
 */
export const useAddDepositToken = () => {
  const { writeContract, data, isPending, isSuccess, error } =
    useWriteContract();

  const addDepositToken = ({
    allocPoint,
    token,
    withUpdate
  }: AddDepositTokenParams) => {
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: "addDepositToken",
      args: [allocPoint, token, withUpdate]
    });
  };

  return {
    addDepositToken,
    txHash: data,
    isPending,
    isSuccess,
    error
  };
};

/**
 * Manage reward tokens
 * @returns {Object} - An object containing the addRewardToken and setRewardToken functions, the transaction hash, and the status of the transaction
 */
export function useRewardTokenManagement() {
  const { refetchRewardTokens } = useRewardTokens();
  const {
    writeContractAsync,
    isPending: isWritePending,
    error
  } = useWriteContract();

  const [pendingReward, setPendingReward] = useState<{
    token: Address;
    amount: bigint;
  } | null>(null);
  const { showSuccessToast } = useCustomToasts();
  const { width } = useResize();

  // Only setup allowance check when we have a pending reward
  const { allowance, refetch: refetchAllowance } = useGetTokenAllowance({
    spenderAddress: FREEBASE_ADDRESS,
    tokenAddress: pendingReward?.token ?? "0x0"
  });

  // Setup approval hook
  const {
    approve,
    isSuccess: isApproveSuccess,
    resetApprove,
    isPending: isApprovePending
  } = useApproveToken({
    spenderAddress: FREEBASE_ADDRESS,
    abi: erc20Abi
  });

  // Handle the approval -> allowance check -> contract write flow
  useEffect(() => {
    if (!pendingReward) return;

    const handleRewardToken = async () => {
      if (allowance === undefined) {
        return;
      }

      // NOTE currently all tokens in this contract use 18 decimals
      const parsedAllowance = parseEther(allowance?.toString() ?? "0");
      const parsedPendingReward = parseEther(pendingReward.amount.toString());

      if (parsedAllowance >= parsedPendingReward) {
        // Allowance is sufficient, proceed with contract call
        writeContractAsync(
          {
            address: FREEBASE_ADDRESS,
            abi: FREEBASE_ABI,
            functionName: "addRewardToken",
            args: [pendingReward.token, parsedPendingReward]
          },
          {
            onSuccess() {
              refetchRewardTokens();
              setPendingReward(null);
              showSuccessToast("Reward token added", width);
            },
            onError(error) {
              console.error("Error adding reward token:", error);
            }
          }
        );
      } else if (!isApproveSuccess) {
        // Need approval
        await approve(parsedPendingReward, pendingReward.token);
      } else if (isApproveSuccess) {
        // Approval successful, refetch allowance
        await refetchAllowance();
      } else {
        console.error("unknown state");
      }
    };

    handleRewardToken();
  }, [
    pendingReward,
    allowance,
    isApproveSuccess,
    approve,
    writeContractAsync,
    refetchAllowance,
    resetApprove
  ]);

  const addRewardToken = ({
    rewardToken,
    transferAmount
  }: AddRewardTokenParams) => {
    setPendingReward({ token: rewardToken, amount: transferAmount });
  };
  const [receipt, setReceipt] = useState({});
  const topUpRewardToken = async ({
    rewardToken,
    transferAmount
  }: TopUpRewardParams) => {
    console.log("rewardToken", rewardToken, transferAmount, error);
    const parsedTransferAmount = parseEther(transferAmount);

    await writeContractAsync({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: "topUpRewardToken",
      args: [parsedTransferAmount, rewardToken]
    });
  };

  const setRewardToken = ({ rewardToken }: SetRewardTokenParams) => {
    writeContractAsync({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: "setRewardToken",
      args: [rewardToken]
    });
  };

  return {
    addRewardToken,
    topUpRewardToken,
    setRewardToken,
    isApproveSuccess,
    isPendingAddReward: isApprovePending || isWritePending,
    isPendingSetReward: isWritePending,
    isPendingTopUpReward: isApprovePending || isWritePending
  };
}

/**
 * Update the reward configuration
 * @returns {Object} - An object containing the updateRewardPerBlock and setAllocationPoint functions, the transaction hash, and the status of the transaction
 */
export function useUpdateRewardConfig() {
  const { writeContract } = useWriteContract();
  const [isUpdateRewardPending, setIsUpdateRewardPending] = useState(false);
  const [isSetAllocationPending, setIsSetAllocationPending] = useState(false);

  const updateRewardPerBlock = ({
    rewardPerBlock
  }: UpdateRewardPerBlockParams) => {
    setIsUpdateRewardPending(true);
    const parsedRewardPerBlock = parseEther(rewardPerBlock.toString());
    writeContract(
      {
        address: FREEBASE_ADDRESS,
        abi: FREEBASE_ABI,
        functionName: "updateRewardPerBlock",
        args: [parsedRewardPerBlock]
      },
      {
        onSuccess: () => setIsUpdateRewardPending(false),
        onError: () => setIsUpdateRewardPending(false)
      }
    );
  };

  const setAllocationPoint = ({
    pid,
    allocPoint,
    withUpdate
  }: SetAllocationPointParams) => {
    setIsSetAllocationPending(true);
    writeContract(
      {
        address: FREEBASE_ADDRESS,
        abi: FREEBASE_ABI,
        functionName: "setRewardAllocationPoint",
        args: [pid, allocPoint, withUpdate]
      },
      {
        onSuccess: () => setIsSetAllocationPending(false),
        onError: () => setIsSetAllocationPending(false)
      }
    );
  };

  return {
    updateRewardPerBlock,
    setAllocationPoint,
    isUpdateRewardPending,
    isSetAllocationPending
  };
}
