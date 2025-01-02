import { freebaseSepolia } from "@/constants/contracts"
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json"
import { useWriteContract, useSimulateContract } from "wagmi"
import { type Address, erc20Abi, parseEther } from "viem"
import { useApproveToken } from "@/services/web3/useApproveToken";
import useGetTokenAllowance from "@/services/web3/useGetTokenAllowance";
import { useEffect, useState } from "react";
import { useRewardTokens } from "@/hooks/useFreebaseUser";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";

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
  const { writeContract, isPending: isWritePending } = useWriteContract();
  const [pendingReward, setPendingReward] = useState<{
    token: Address
    amount: bigint
  } | null>(null)
  const { showSuccessToast } = useCustomToasts()
  const { width } = useResize()

  // Only setup allowance check when we have a pending reward
  const { allowance, refetch: refetchAllowance } = useGetTokenAllowance({
    spenderAddress: FREEBASE_ADDRESS,
    tokenAddress: pendingReward?.token ?? "0x0"
  })

  // Setup approval hook
  const {
    approve,
    isSuccess: isApproveSuccess,
    resetApprove,
    isPending: isApprovePending
  } = useApproveToken({
    tokenAddress: pendingReward?.token ?? "0x0",
    spenderAddress: FREEBASE_ADDRESS,
    abi: erc20Abi
  })

  // Handle the approval -> allowance check -> contract write flow
  useEffect(() => {
    if (!pendingReward) return

    const handleRewardToken = async () => {
      console.group('handleRewardToken')
      console.log('allowance:', allowance?.toString())
      console.log('pending reward amount:', pendingReward.amount.toString())
      console.groupEnd()

      if (allowance === undefined) {
        console.error('allowance not found')
        return
      }

      // NOTE currently all tokens in this contract use 18 decimals
      const parsedAllowance = parseEther(allowance?.toString() ?? '0')
      const parsedPendingReward = parseEther(pendingReward.amount.toString())

      if (parsedAllowance >= parsedPendingReward) {
        // Allowance is sufficient, proceed with contract call
        console.log('adding reward token')
        writeContract({
          address: FREEBASE_ADDRESS,
          abi: FREEBASE_ABI,
          functionName: 'addRewardToken',
          args: [pendingReward.token, parsedPendingReward]
        }, {
          onSuccess() {
            refetchRewardTokens()
            setPendingReward(null)
            showSuccessToast('Reward token added', width)
          },
          onError(error) {
            console.error('Error adding reward token:', error)
          }
        })

      } else if (!isApproveSuccess) {
        // Need approval
        console.log('approving ', pendingReward.amount.toString())
        await approve(pendingReward.amount)
      } else if (isApproveSuccess) {
        // Approval successful, refetch allowance
        await refetchAllowance()
      } else {
        console.error('unknown state')
      }
    }

    handleRewardToken()
  }, [pendingReward, allowance, isApproveSuccess, approve, writeContract, refetchAllowance, resetApprove])


  const addRewardToken = ({ rewardToken, transferAmount }: AddRewardTokenParams) => {
    setPendingReward({ token: rewardToken, amount: transferAmount })
  }

  const setRewardToken = ({ rewardToken }: SetRewardTokenParams) => {
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
    isPendingAddReward: isApprovePending || isWritePending,
    isPendingSetReward: isWritePending
  };
}

/**
 * Update the reward configuration
 * @returns {Object} - An object containing the updateRewardPerBlock and setAllocationPoint functions, the transaction hash, and the status of the transaction
 */
export function useUpdateRewardConfig() {
  const { writeContract } = useWriteContract()
  const [isUpdateRewardPending, setIsUpdateRewardPending] = useState(false)
  const [isSetAllocationPending, setIsSetAllocationPending] = useState(false)

  const updateRewardPerBlock = ({ rewardPerBlock }: UpdateRewardPerBlockParams) => {
    setIsUpdateRewardPending(true)
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'updateRewardPerBlock',
      args: [rewardPerBlock]
    }, {
      onSuccess: () => setIsUpdateRewardPending(false),
      onError: () => setIsUpdateRewardPending(false)
    })
  }

  const setAllocationPoint = ({ pid, allocPoint, withUpdate }: SetAllocationPointParams) => {
    setIsSetAllocationPending(true)
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'setRewardAllocationPoint',
      args: [pid, allocPoint, withUpdate]
    }, {
      onSuccess: () => setIsSetAllocationPending(false),
      onError: () => setIsSetAllocationPending(false)
    })
  }

  return {
    updateRewardPerBlock,
    setAllocationPoint,
    isUpdateRewardPending,
    isSetAllocationPending,
  }
};