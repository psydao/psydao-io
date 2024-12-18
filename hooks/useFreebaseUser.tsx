import { freebaseSepolia } from "@/constants/contracts"
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json"
import { useWriteContract, useSimulateContract, useReadContract } from "wagmi"
import { Address } from "viem"

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
//#endregion

export function usePoolInteraction(poolId: bigint) {
  const { data: depositSimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'deposit',
    args: [poolId, 0n] // Default amount, will be overridden in the write call
  })

  const { data: withdrawSimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'withdraw',
    args: [poolId, 0n] // Default amount, will be overridden in the write call
  })

  const { data: emergencySimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'emergencyWithdraw',
    args: [poolId]
  })

  const { writeContract } = useWriteContract()

  const deposit = ({ amount }: Omit<PoolInteractionParams, 'pid'>) => {
    if (!depositSimulateData?.request) return
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'deposit',
      args: [poolId, amount]
    })
  }

  const withdraw = ({ amount }: Omit<PoolInteractionParams, 'pid'>) => {
    if (!withdrawSimulateData?.request) return
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'withdraw',
      args: [poolId, amount]
    })
  }

  const emergencyWithdraw = () => {
    if (!emergencySimulateData?.request) return
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
    emergencyWithdraw
  }
}

export function usePoolData(poolId?: bigint) {
  const { data: poolInfo } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'poolInfo',
    args: poolId ? [poolId] : undefined
  })

  const { data: totalAllocPoint } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'totalAllocPoint'
  })

  return {
    pool: poolInfo as PoolInfo | undefined,
    totalAllocPoint: totalAllocPoint as bigint | undefined
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