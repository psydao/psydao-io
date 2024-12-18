import { Box, Flex, FormLabel, Input, Button, FormControl, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import { useState } from "react"
import { type Address } from "viem"

interface ManageRewardTokenProps {
  onAddReward: (args: { rewardToken: Address; transferAmount: bigint }) => void
  onSetReward: (args: { rewardToken: Address }) => void
}

export default function ManageRewardToken({ onAddReward, onSetReward }: ManageRewardTokenProps) {
  const [rewardToken, setRewardToken] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [activeToken, setActiveToken] = useState("")

  const handleAddReward = () => {
    if (!rewardToken || !transferAmount) return
    onAddReward({
      rewardToken: rewardToken as Address,
      transferAmount: BigInt(transferAmount)
    })
    setRewardToken("")
    setTransferAmount("")
  }

  const handleSetReward = () => {
    if (!activeToken) return
    onSetReward({
      rewardToken: activeToken as Address
    })
    setActiveToken("")
  }

  return (
    <FormControl>
      <Tabs variant="soft-rounded" colorScheme="pink">
        <TabList mb={4}>
          <Tab>Add Reward Token</Tab>
          <Tab>Set Active Token</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              alignItems={{ base: "start", md: "center" }}
              justifyContent="space-between"
              w="100%"
              p={4}
              borderBottom="1px solid #F2BEBE"
            >
              <FormLabel
                fontSize="18"
                mb="0"
                fontFamily="Inter"
              >
                Add Reward Token
              </FormLabel>

              <Flex gap={4} alignItems="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
                <Box
                  display="flex"
                  bg="#FBF6F8"
                  alignItems="center"
                  borderRadius="xl"
                  boxShadow="inner"
                  p="16px"
                  gap={2}
                >
                  <Input
                    value={rewardToken}
                    onChange={(e) => setRewardToken(e.target.value)}
                    placeholder="Token Address"
                    w={{ base: "100%", md: "200px" }}
                    border="none"
                    focusBorderColor="transparent"
                    fontFamily="Inter"
                  />
                  <Input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Amount"
                    w={{ base: "100%", md: "120px" }}
                    border="none"
                    focusBorderColor="transparent"
                    fontFamily="Inter"
                  />
                </Box>

                <Button
                  onClick={handleAddReward}
                  bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
                  color="black"
                  borderRadius="20px"
                  px={6}
                  py={2}
                  fontSize="16px"
                  fontWeight="bold"
                  _hover={{ opacity: 0.8 }}
                >
                  Add Token
                </Button>
              </Flex>
            </Flex>
          </TabPanel>

          <TabPanel p={0}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              alignItems={{ base: "start", md: "center" }}
              justifyContent="space-between"
              w="100%"
              p={4}
              borderBottom="1px solid #F2BEBE"
            >
              <FormLabel
                fontSize="18"
                mb="0"
                fontFamily="Inter"
              >
                Set Active Token
              </FormLabel>

              <Flex gap={4} alignItems="center">
                <Box
                  display="flex"
                  bg="#FBF6F8"
                  alignItems="center"
                  borderRadius="xl"
                  boxShadow="inner"
                  p="16px"
                >
                  <Input
                    value={activeToken}
                    onChange={(e) => setActiveToken(e.target.value)}
                    placeholder="Token Address"
                    w={{ base: "100%", md: "200px" }}
                    border="none"
                    focusBorderColor="transparent"
                    fontFamily="Inter"
                  />
                </Box>

                <Button
                  onClick={handleSetReward}
                  bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
                  color="black"
                  borderRadius="20px"
                  px={6}
                  py={2}
                  fontSize="16px"
                  fontWeight="bold"
                  _hover={{ opacity: 0.8 }}
                >
                  Set Active
                </Button>
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  )
}