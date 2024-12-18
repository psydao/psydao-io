import { useEffect } from "react"
import { freebaseSepolia } from "@/constants/contracts"
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json"
import { useWriteContract, useSimulateContract, useReadContract, useAccount } from "wagmi"
import { type Address, erc20Abi, maxUint256, parseEther } from "viem"
import { useLiquidityPools, useLiquidityPool } from "@/lib/services/freebase";
import { useApproveToken } from "@/services/web3/useApproveToken";

const FREEBASE_ADDRESS = freebaseSepolia
const FREEBASE_ABI = psydaoMasterBaseAbi

//#region interfaces
interface PoolInteractionParams {
  pid: bigint
  amount: bigint
}

interface PoolInfo {
  token: Address
  allocPoint: bigint
  lastRewardBlock: bigint
  accRewardPerShare: bigint
}

interface GraphQLPool {
  id: string
  token: string
  allocPoint: string
  lastRewardBlock: string
  accRewardPerShare: string
  userCount: string
  depositCount: string
  withdrawCount: string
}
//#endregion

export function usePoolInteraction(poolId: bigint) {
  const { address } = useAccount()
  const { data: poolData } = useLiquidityPool(poolId.toString())
  const pool = poolData?.pool

  // Get allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: pool?.token.id as Address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address as Address, FREEBASE_ADDRESS],
    query: {
      enabled: Boolean(address && pool?.token.id)
    }
  })

  const {
    approve,
    isSuccess: isApproveSuccess,
    isPending: isApprovePending,
    approvedSuccess
  } = useApproveToken({
    tokenAddress: pool?.token.id as Address,
    spenderAddress: FREEBASE_ADDRESS,
    abi: erc20Abi
  })

  useEffect(() => {
    if (approvedSuccess) {
      refetchAllowance()
    }
  }, [approvedSuccess, refetchAllowance])

  const { writeContract } = useWriteContract()

  const deposit = async ({ amount }: Omit<PoolInteractionParams, 'pid'>) => {
    console.log('deposit', {
      allowance,
      amount
    })
    if (!allowance || amount > allowance) {
      console.log('we need approval')
      await approve(parseEther(amount.toString()))
      // Wait for approval success before proceeding
      return
    }

    console.log('proceeding to writeContract')
    writeContract({
      abi: FREEBASE_ABI,
      address: FREEBASE_ADDRESS,
      functionName: 'deposit',
      args: [poolId, amount],
    })
  }

  const withdraw = ({ amount }: Omit<PoolInteractionParams, 'pid'>) => {
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'withdraw',
      args: [poolId, amount]
    })
  }

  const emergencyWithdraw = () => {
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'emergencyWithdraw',
      args: [poolId]
    })
  }

  return {
    deposit,
    withdraw,
    emergencyWithdraw,
    isPending: isApprovePending,
    approvedSuccess,
    allowance
  }
}

export function usePoolData() {
  const { data: graphqlData } = useLiquidityPools()

  return {
    pools: graphqlData?.pools?.map(pool => ({
      id: Number(pool.id),
      token: pool.token.id as Address,
      allocPoint: BigInt(pool.allocPoint),
      lastRewardBlock: BigInt(pool.lastRewardBlock),
      accRewardPerShare: BigInt(pool.accRewardPerShare),
      tokenInfo: pool.token,
      userCount: pool.userCount,
      depositCount: pool.depositCount,
      withdrawCount: pool.withdrawCount
    })),
    // If you still need totalAllocPoint, we can calculate it from the pools
    totalAllocPoint: graphqlData?.pools?.reduce(
      (total, pool) => total + BigInt(pool.allocPoint),
      0n
    ) ?? 0n
  }
}

export function useRewards(address: Address) {
  const { data: unclaimedRewards } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'totalUnclaimedRewards',
    args: [address]
  })

  const { data: simulateClaimData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'claimUnclaimedRewards'
  })

  const { writeContract } = useWriteContract()

  const claimRewards = (token: Address) => {
    if (!simulateClaimData?.request) return
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'claimUnclaimedRewards',
      args: [token]
    })
  }

  return {
    unclaimedRewards: unclaimedRewards as bigint | undefined,
    claimRewards
  }
}

// Additional hook for pending rewards
export function usePendingRewards(poolId: bigint, userAddress: Address) {
  const { data: pendingRewards } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'pendingRewards',
    args: [poolId, userAddress]
  })

  return {
    pendingRewards: pendingRewards as bigint | undefined
  }
}