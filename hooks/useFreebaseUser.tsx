import { useEffect, useState } from "react";
import { freebaseSepolia } from "@/constants/contracts";
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json";
import {
  useWriteContract,
  useSimulateContract,
  useReadContract,
  useAccount,
  useWaitForTransactionReceipt
} from "wagmi";
import { type Address, erc20Abi, maxUint256, parseEther } from "viem";
import {
  useLiquidityPools,
  useLiquidityPool,
  useFreebaseRewardTokens,
  useFreebaseDepositTokens,
  useFreebaseGlobalStats,
  useFreebaseUserPoolsPositions
} from "@/lib/services/freebase";
import { useApproveToken } from "@/services/web3/useApproveToken";

const FREEBASE_ADDRESS = freebaseSepolia;
const FREEBASE_ABI = psydaoMasterBaseAbi;

//#region interfaces
interface PoolInteractionParams {
  pid: bigint;
  amount: bigint;
}

interface PoolInfo {
  token: Address;
  allocPoint: bigint;
  lastRewardBlock: bigint;
  accRewardPerShare: bigint;
}

interface GraphQLPool {
  id: string;
  token: string;
  allocPoint: string;
  lastRewardBlock: string;
  accRewardPerShare: string;
  userCount: string;
  depositCount: string;
  withdrawCount: string;
}
//#endregion

export function usePoolInteraction(poolId: bigint) {
  const { address } = useAccount();
  const { data: poolData } = useLiquidityPool(poolId.toString());
  const pool = poolData?.pool;

  // Add state for pending deposit
  const [pendingDeposit, setPendingDeposit] = useState<{
    amount: bigint;
  } | null>(null);

  // Get allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: pool?.token.id as Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address as Address, FREEBASE_ADDRESS],
    query: {
      enabled: Boolean(address && pool?.token.id)
    }
  });

  const {
    writeContractAsync,
    isPending: poolInteractionPending,
    data,
    isSuccess: poolInteractionSuccess
  } = useWriteContract();

  const {
    isSuccess: isPoolTransactionSuccess,
    isFetching: poolTransactionPending,
    refetch: refetchTxReceipt,
    error: txError,
    data: txData
  } = useWaitForTransactionReceipt({
    hash: data
  });

  const {
    approve,
    isSuccess: isApproveSuccess,
    isPending: isApprovePending,
    isFetching: isApproveFetching,
    approvedSuccess,
    resetApprove
  } = useApproveToken({
    tokenAddress: pool?.token.id as Address,
    spenderAddress: FREEBASE_ADDRESS,
    abi: erc20Abi
  });

  useEffect(() => {
    if (poolInteractionSuccess && txData) {
      refetchAllowance();
    }
  }, [poolInteractionSuccess, txData]);

  // Handle the approval -> allowance check -> contract write flow
  useEffect(() => {
    if (!pendingDeposit || !pool?.token.id) return;
    const handleDeposit = async () => {
      if (allowance === undefined) {
        return;
      }
      const parsedAllowance = allowance;
      const parsedPendingDeposit = pendingDeposit.amount;

      if (parsedAllowance >= parsedPendingDeposit) {
        // Allowance is sufficient, proceed with contract call
        await writeContractAsync(
          {
            address: FREEBASE_ADDRESS,
            abi: FREEBASE_ABI,
            functionName: "deposit",
            args: [poolId, parsedPendingDeposit]
          },
          {
            onSuccess() {
              setPendingDeposit(null);
              resetApprove();
            },
            onError(error) {
              console.error("Error depositing:", error);
            }
          }
        );
      } else if (!isApproveSuccess) {
        // Need approval
        await approve(parsedPendingDeposit);
      } else if (isApproveSuccess) {
        // Approval successful, refetch allowance
        await refetchAllowance();
      }
    };

    handleDeposit();
  }, [
    pendingDeposit,
    allowance,
    isApproveSuccess,
    approve,
    writeContractAsync,
    resetApprove,
    pool?.token.id,
    poolId
  ]);

  const deposit = ({ amount }: Omit<PoolInteractionParams, "pid">) => {
    const parsedAmount = parseEther(amount.toString());
    setPendingDeposit({ amount: parsedAmount });
  };

  const withdraw = async ({ amount }: Omit<PoolInteractionParams, "pid">) => {
    const parsedAmount = parseEther(amount.toString());
    await writeContractAsync({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: "withdraw",
      args: [poolId, parsedAmount]
    });
  };

  const emergencyWithdraw = async () => {
    await writeContractAsync({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: "emergencyWithdraw",
      args: [poolId]
    });
  };

  return {
    deposit,
    withdraw,
    emergencyWithdraw,
    poolInteractionPending: poolInteractionPending || poolTransactionPending,
    approvalPending: isApprovePending || isApproveFetching,
    approvedSuccess,
    allowance
  };
}

export function usePoolData() {
  const { data: graphqlData } = useLiquidityPools();

  return {
    pools: graphqlData?.pools?.map((pool) => ({
      id: Number(pool.id),
      tokenAddress: pool.token.id as Address,
      allocPoint: BigInt(pool.allocPoint),
      lastRewardBlock: BigInt(pool.lastRewardBlock),
      accRewardPerShare: BigInt(pool.accRewardPerShare),
      tokenInfo: pool.token,
      userCount: pool.userCount,
      depositCount: pool.depositCount,
      withdrawCount: pool.withdrawCount,
      totalDeposited: pool.token.totalDeposited
    })),
    // If you still need totalAllocPoint, we can calculate it from the pools
    totalAllocPoint:
      graphqlData?.pools?.reduce(
        (total, pool) => total + BigInt(pool.allocPoint),
        0n
      ) ?? 0n
  };
}

export function useRewards(address: Address) {
  const { data: unclaimedRewards } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: "totalUnclaimedRewards",
    args: [address]
  });

  const { data: simulateClaimData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: "claimUnclaimedRewards"
  });

  const { writeContract } = useWriteContract();

  const claimRewards = (token: Address) => {
    if (!simulateClaimData?.request) return;
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: "claimUnclaimedRewards",
      args: [token]
    });
  };

  return {
    unclaimedRewards: unclaimedRewards as bigint | undefined,
    claimRewards
  };
}

// Additional hook for pending rewards
export function usePendingRewards(poolId: bigint, userAddress: Address) {
  const { data: pendingRewards } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: "pendingRewards",
    args: [poolId, userAddress]
  });

  return {
    pendingRewards: pendingRewards as bigint | undefined
  };
}

export function useRewardTokens() {
  const { data: rewardTokens, refetch: refetchRewardTokens } =
    useFreebaseRewardTokens();
  return {
    rewardTokens: rewardTokens?.tokens,
    refetchRewardTokens
  };
}

export function useDepositTokens() {
  const { data: depositTokens } = useFreebaseDepositTokens();
  return {
    depositTokens: depositTokens?.tokens
  };
}

export function useGlobalStats() {
  const { data: globalStats } = useFreebaseGlobalStats();
  return {
    globalStats: globalStats?.globalStats
  };
}

/**
 * Get all the pools the user has invested in and their histories
 *
 * @param userAddress - The address of the user
 * @returns All the user's pool positions
 */
export function useUserPoolPositions(userAddress: Address) {
  const { data: userPoolPositions } = useFreebaseUserPoolsPositions(
    userAddress.toLowerCase() as Address
  );
  return {
    userPoolPositions: userPoolPositions?.user?.positions
  };
}
