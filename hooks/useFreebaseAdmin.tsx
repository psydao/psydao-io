import { freebaseSepolia } from "@/constants/contracts"
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json"
import { useWriteContract, useSimulateContract } from "wagmi"
import { type Address, erc20Abi } from "viem"
import { useApproveToken } from "@/services/web3/useApproveToken";
import useGetTokenAllowance from "@/services/web3/useGetTokenAllowance";
import { useEffect, useState } from "react";
import { useRewardTokens } from "@/hooks/useFreebaseUser";

const FREEBASE_ADDRESS = freebaseSepolia
const FREEBASE_ABI = psydaoMasterBaseAbi

//#region interfaces
interface AddDepositTokenParams {
  allocPoint: bigint
  token: Address
  withUpdate: boolean
}

interface AddRewardTokenParams {
  rewardToken: Address
  transferAmount: bigint
}

interface SetRewardTokenParams {
  rewardToken: Address
}

interface UpdateRewardPerBlockParams {
  rewardPerBlock: bigint
}

interface SetAllocationPointParams {
  pid: bigint
  allocPoint: bigint
  withUpdate: boolean
}
//#endregion


/**
 * Add a deposit token to the freebase
 * @returns {Object} - An object containing the addDepositToken function, the transaction hash, and the status of the transaction
 */
export const useAddDepositToken = () => {
  const { writeContract, data, isPending, isSuccess, error } = useWriteContract();

  const addDepositToken = ({ allocPoint, token, withUpdate }: AddDepositTokenParams) => {
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'addDepositToken',
      args: [allocPoint, token, withUpdate]
    })
  }

  return {
    addDepositToken,
    txHash: data,
    isPending,
    isSuccess,
    error
  }
};

/**
 * Manage reward tokens
 * @returns {Object} - An object containing the addRewardToken and setRewardToken functions, the transaction hash, and the status of the transaction
 */
export function useRewardTokenManagement() {
  const { refetchRewardTokens } = useRewardTokens()
  const { writeContract } = useWriteContract()
  const [pendingReward, setPendingReward] = useState<{
    token: Address
    amount: bigint
  } | null>(null)

  // Only setup allowance check when we have a pending reward
  const { allowance, refetch: refetchAllowance } = useGetTokenAllowance({
    spenderAddress: FREEBASE_ADDRESS,
    tokenAddress: pendingReward?.token ?? "0x0"
  })

  // Setup approval hook
  const {
    approve,
    isSuccess: isApproveSuccess,
    resetApprove
  } = useApproveToken({
    tokenAddress: pendingReward?.token ?? "0x0",
    spenderAddress: FREEBASE_ADDRESS,
    abi: erc20Abi
  })

  // Handle the approval -> allowance check -> contract write flow
  useEffect(() => {
    if (!pendingReward) return

    const handleRewardToken = async () => {
      if (allowance >= pendingReward.amount) {
        // Allowance is sufficient, proceed with contract call
        writeContract({
          address: FREEBASE_ADDRESS,
          abi: FREEBASE_ABI,
          functionName: 'addRewardToken',
          args: [pendingReward.token, pendingReward.amount]
        }, {
          onSuccess() {
            refetchRewardTokens()
            setPendingReward(null)
          }
        })
      } else if (!isApproveSuccess) {
        // Need approval
        await approve(pendingReward.amount)
      } else if (isApproveSuccess) {
        // Approval successful, refetch allowance
        await refetchAllowance()
        // resetApprove()
      }
    }

    handleRewardToken()
  }, [pendingReward, allowance, isApproveSuccess, approve, writeContract, refetchAllowance, resetApprove])


  const addRewardToken = ({ rewardToken, transferAmount }: AddRewardTokenParams) => {
    setPendingReward({ token: rewardToken, amount: transferAmount })
  }

  const setRewardToken = ({ rewardToken }: SetRewardTokenParams) => {
    // if (!setSimulateData?.request) return
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'setRewardToken',
      args: [rewardToken]
    })
  }

  return {
    addRewardToken,
    setRewardToken,
    isApproveSuccess,
    isPending: !!pendingReward
  }
}

/**
 * Update the reward configuration
 * @returns {Object} - An object containing the updateRewardPerBlock and setAllocationPoint functions, the transaction hash, and the status of the transaction
 */
export function useUpdateRewardConfig() {
  const { writeContract } = useWriteContract()

  const updateRewardPerBlock = ({ rewardPerBlock }: UpdateRewardPerBlockParams) => {
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'updateRewardPerBlock',
      args: [rewardPerBlock]
    })
  }

  const setAllocationPoint = ({ pid, allocPoint, withUpdate }: SetAllocationPointParams) => {
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'setRewardAllocationPoint',
      args: [pid, allocPoint, withUpdate]
    })
  }

  return {
    updateRewardPerBlock,
    setAllocationPoint
  }
};