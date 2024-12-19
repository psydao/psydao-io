import { freebaseSepolia } from "@/constants/contracts"
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json"
import { useWriteContract, useSimulateContract } from "wagmi"
import { Address } from "viem"

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
  const { data: addSimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'addRewardToken'
  })

  const { data: setSimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'setRewardToken'
  })

  const { writeContract } = useWriteContract()

  const addRewardToken = ({ rewardToken, transferAmount }: AddRewardTokenParams) => {
    if (!addSimulateData?.request) return
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'addRewardToken',
      args: [rewardToken, transferAmount]
    })
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
    setRewardToken
  }
}

/**
 * Update the reward configuration
 * @returns {Object} - An object containing the updateRewardPerBlock and setAllocationPoint functions, the transaction hash, and the status of the transaction
 */
export function useUpdateRewardConfig() {
  const { data: perBlockSimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'updateRewardPerBlock'
  })

  const { data: allocPointSimulateData } = useSimulateContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: 'setRewardAllocationPoint'
  })

  const { writeContract } = useWriteContract()

  const updateRewardPerBlock = ({ rewardPerBlock }: UpdateRewardPerBlockParams) => {
    // if (!perBlockSimulateData?.request) return
    writeContract({
      address: FREEBASE_ADDRESS,
      abi: FREEBASE_ABI,
      functionName: 'updateRewardPerBlock',
      args: [rewardPerBlock]
    })
  }

  const setAllocationPoint = ({ pid, allocPoint, withUpdate }: SetAllocationPointParams) => {
    // if (!allocPointSimulateData?.request) return
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