import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { type Address } from "viem";
import AddDepositToken from "./add-deposit-token";
import ManageRewardToken from "./manage-reward-token";

interface TokenManagementProps {
  onAddToken: {
    addDepositToken: (args: {
      allocPoint: bigint;
      token: Address;
      withUpdate: boolean;
    }) => void;
    isPending: boolean;
  };
  onAddReward: {
    addRewardToken: (args: {
      rewardToken: Address;
      transferAmount: bigint;
    }) => void;
    isPending: boolean;
  };
  onSetReward: {
    setRewardToken: (args: { rewardToken: Address }) => void;
    isPending: boolean;
  };
  onTopUpReward: {
    topUpRewardToken: (args: {
      rewardToken: Address;
      transferAmount: bigint;
    }) => void;
    isPending: boolean;
  };
}

export function TokenManagement({
  onAddToken,
  onAddReward,
  onSetReward,
  onTopUpReward
}: TokenManagementProps) {
  return (
    <Box borderRadius="xl" borderColor="#F2BEBE" borderWidth="1px" p={6}>
      <Text fontSize={{ base: "20px", sm: "24px" }} fontFamily="Inter" mb={6}>
        Token Management
      </Text>

      <Flex direction="column" gap={6}>
        <AddDepositToken
          onSubmit={onAddToken.addDepositToken}
          isPending={onAddToken.isPending}
        />
        <ManageRewardToken
          onAddReward={onAddReward.addRewardToken}
          onSetReward={onSetReward.setRewardToken}
          onTopUpReward={onTopUpReward.topUpRewardToken}
          isPendingAddReward={onAddReward.isPending}
          isPendingSetReward={onSetReward.isPending}
          isPendingTopUpReward={onTopUpReward.isPending}
        />
      </Flex>
    </Box>
  );
}
