import { Box, Flex, Text } from "@chakra-ui/react"
import { useUpdateRewardConfig } from "@/hooks/useFreebaseAdmin"
import SetRewardPerBlock from "./set-reward-per-block"
import SetAllocationPoint from "./set-allocation-point"
import { useState } from "react"

interface RewardConfigurationProps {
  onUpdatePerBlock: (args: { rewardPerBlock: bigint }) => void
  onSetAllocation: (args: { pid: bigint, allocPoint: bigint, withUpdate: boolean }) => void
}

export function RewardConfiguration({ onUpdatePerBlock, onSetAllocation }: RewardConfigurationProps) {
  const [rewardPerBlock, setRewardPerBlock] = useState("")
  const [allocPoint, setAllocPoint] = useState("")
  const [poolId, setPoolId] = useState("")

  return (
    <Box
      borderRadius="xl"
      borderColor="#F2BEBE"
      borderWidth="1px"
      p={6}
    >
      <Text
        fontSize={{ base: "20px", sm: "24px" }}
        fontFamily="Inter"
        mb={6}
      >
        Reward Configuration
      </Text>

      <Flex direction="column" gap={6}>
        <SetRewardPerBlock
          value={rewardPerBlock}
          onChange={setRewardPerBlock}
          onSubmit={() => {
            if (!rewardPerBlock) return
            onUpdatePerBlock({ rewardPerBlock: BigInt(rewardPerBlock) })
          }}
        />

        <SetAllocationPoint
          poolId={poolId}
          allocPoint={allocPoint}
          onPoolIdChange={setPoolId}
          onAllocPointChange={setAllocPoint}
          onSubmit={() => {
            if (!poolId || !allocPoint) return
            onSetAllocation({
              pid: BigInt(poolId),
              allocPoint: BigInt(allocPoint),
              withUpdate: true
            })
          }}
        />
      </Flex>
    </Box>
  )
}

// Sub-components
