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
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { type Address } from "viem";
import { useRewardTokens } from "@/hooks/useFreebaseUser";

interface ManageRewardTokenProps {
  onAddReward: (args: { rewardToken: Address; transferAmount: string }) => void;
  onSetReward: (args: { rewardToken: Address }) => void;
  isPendingAddReward: boolean;
  isPendingSetReward: boolean;
}

export default function ManageRewardToken({
  onAddReward,
  onSetReward,
  isPendingAddReward,
  isPendingSetReward
}: ManageRewardTokenProps) {
  const [rewardToken, setRewardToken] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [processingTokenId, setProcessingTokenId] = useState<string | null>(null);
  const { rewardTokens, refetchRewardTokens } = useRewardTokens();

  const handleAddReward = () => {
    if (!rewardToken || !transferAmount) return;
    onAddReward({
      rewardToken: rewardToken as Address,
      transferAmount
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
                <Text key={index}>
                  {token.name}{" "}
                  {token.isActiveRewardToken === true ? (
                    <b>(currently active)</b>
                  ) : (
                    <Button
                      onClick={() => handleSetActiveRewardToken(token.id)}
                      isDisabled={processingTokenId === token.id && isPendingSetReward}
                    >
                      {processingTokenId === token.id && isPendingSetReward ? "Setting Active..." : "Make Active"}
                    </Button>
                  )}
                </Text>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  );
}
