import {
  Box,
  FormLabel,
  Input,
  Button,
  FormControl,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { erc20Abi, type Address } from "viem";
import { useRewardTokens } from "@/hooks/useFreebaseUser";
import { useApproveToken } from "@/services/web3/useApproveToken";
import { FREEBASE_ADDRESS } from "@/hooks/useFreebaseAdmin";

interface ManageRewardTokenProps {
  onAddReward: (args: { rewardToken: Address; transferAmount: bigint }) => void;
  onSetReward: (args: { rewardToken: Address }) => void;
  onTopUpReward: (args: {
    rewardToken: Address;
    transferAmount: bigint;
  }) => void;
  isPendingAddReward: boolean;
  isPendingSetReward: boolean;
  isPendingTopUpReward: boolean;
}

export default function ManageRewardToken({
  onAddReward,
  onSetReward,
  onTopUpReward,
  isPendingAddReward,
  isPendingSetReward,
  isPendingTopUpReward
}: ManageRewardTokenProps) {
  const [rewardToken, setRewardToken] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [processingTokenId, setProcessingTokenId] = useState<string | null>(
    null
  );
  const { rewardTokens, refetchRewardTokens } = useRewardTokens();

  const { approve, isSuccess: isApproveSuccess } = useApproveToken({
    spenderAddress: FREEBASE_ADDRESS,
    abi: erc20Abi
  });

  const handleAddReward = () => {
    if (!rewardToken || !transferAmount) return;
    onAddReward({
      rewardToken: rewardToken as Address,
      transferAmount: BigInt(transferAmount)
    });
    setRewardToken("");
    setTransferAmount("");
  };

  const handleSetActiveRewardToken = async (tokenId: string) => {
    setProcessingTokenId(tokenId);
    await onSetReward({
      rewardToken: tokenId as Address
    });
    refetchRewardTokens();
  };
  const handleTopUp = () => {
    // find the active reward token
    const activeRewardToken = rewardTokens?.find(
      (token) => token.isActiveRewardToken === true
    );

    console.log("activeRewardToken", activeRewardToken);
    if (!activeRewardToken || !transferAmount) return;
    onTopUpReward({
      rewardToken: activeRewardToken.id as Address,
      transferAmount: BigInt(transferAmount)
    });
  };
  const approveRewardToken = () => {
    const activeRewardToken = rewardTokens?.find(
      (token) => token.isActiveRewardToken === true
    );

    if (!activeRewardToken || !transferAmount) return;
    approve(BigInt(transferAmount), activeRewardToken.id as Address);
  };

  return (
    <FormControl>
      <Tabs variant="soft-rounded" colorScheme="pink">
        <TabList mb={4}>
          <Tab>Add Reward Token</Tab>
          <Tab>List of Reward Tokens</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <VStack align="stretch" spacing={4}>
              <FormLabel fontSize="18" mb="0" fontFamily="Inter">
                Add Reward Token
              </FormLabel>

              <Box bg="#FBF6F8" borderRadius="xl" boxShadow="inner" p="16px">
                <VStack spacing={3}>
                  <Input
                    value={rewardToken}
                    onChange={(e) => setRewardToken(e.target.value)}
                    placeholder="Token Address"
                    w="100%"
                    border="none"
                    focusBorderColor="transparent"
                    fontFamily="Inter"
                  />
                  <Input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Amount"
                    w="100%"
                    border="none"
                    focusBorderColor="transparent"
                    fontFamily="Inter"
                  />
                </VStack>
              </Box>

              <Button
                onClick={handleAddReward}
                bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
                isLoading={isPendingAddReward}
                isDisabled={isPendingAddReward}
                color="black"
                borderRadius="20px"
                px={6}
                py={2}
                fontSize="16px"
                fontWeight="bold"
                _hover={{ opacity: 0.8 }}
                w="100%"
              >
                {isPendingAddReward ? "Adding Token..." : "Add Token"}
              </Button>
            </VStack>
          </TabPanel>

          <TabPanel p={0}>
            <VStack align="stretch" spacing={4}>
              <FormLabel fontSize="18" mb="0" fontFamily="Inter">
                List of Reward Tokens
              </FormLabel>
              {rewardTokens?.map((token, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Text>{token.name}</Text>
                  {token.isActiveRewardToken === true ? (
                    <b>(currently active)</b>
                  ) : (
                    <Button
                      bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
                      onClick={() => handleSetActiveRewardToken(token.id)}
                      isDisabled={
                        processingTokenId === token.id && isPendingSetReward
                      }
                    >
                      {processingTokenId === token.id && isPendingSetReward
                        ? "Setting Active..."
                        : "Make Active"}
                    </Button>
                  )}
                </Flex>
              ))}
              <FormLabel
                fontSize="18"
                mb="0"
                fontFamily="Inter"
                gap={2}
                alignItems="center"
              >
                Top up active reward token
                <Box bg="#FBF6F8" borderRadius="xl" boxShadow="inner" p={1}>
                  <Input
                    mt={4}
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Amount"
                    w="100%"
                    border="none"
                    focusBorderColor="transparent"
                    fontFamily="Inter"
                  />
                </Box>
                <Button
                  mt={4}
                  fontSize="16px"
                  onClick={isApproveSuccess ? handleTopUp : approveRewardToken}
                  bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
                  isLoading={isPendingTopUpReward}
                  isDisabled={isPendingTopUpReward}
                  color="black"
                  borderRadius="20px"
                  px={6}
                  py={2}
                  fontWeight="bold"
                  _hover={{ opacity: 0.8 }}
                  w="100%"
                >
                  {isApproveSuccess
                    ? isPendingTopUpReward
                      ? "Topping up..."
                      : "Top up"
                    : "Approve"}
                </Button>
              </FormLabel>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  );
}
