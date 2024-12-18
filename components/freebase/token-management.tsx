import { Box, Flex, Text, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import { type Address } from "viem"
import AddDepositToken from "./add-deposit-token"
import ManageRewardToken from "./manage-reward-token"

interface TokenManagementProps {
  onAddToken: (args: { allocPoint: bigint; token: Address; withUpdate: boolean }) => void
  onAddReward: (args: { rewardToken: Address; transferAmount: bigint }) => void
  onSetReward: (args: { rewardToken: Address }) => void
}

export function TokenManagement({ onAddToken, onAddReward, onSetReward }: TokenManagementProps) {
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
        Token Management
      </Text>

      <Flex direction="column" gap={6}>
        <AddDepositToken onSubmit={onAddToken} />
        <ManageRewardToken
          onAddReward={onAddReward}
          onSetReward={onSetReward}
        />
      </Flex>
    </Box>
  )
}