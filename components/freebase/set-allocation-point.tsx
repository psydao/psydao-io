import {
  Box,
  FormControl, FormLabel,
  Tabs, Tab, TabList, TabPanels, TabPanel,
  Input, Button,
  Text,
  VStack
} from "@chakra-ui/react"
import { usePoolData } from "@/hooks/useFreebaseUser"

interface SetAllocationPointProps {
  poolId: string
  allocPoint: string
  onPoolIdChange: (value: string) => void
  onAllocPointChange: (value: string) => void
  onSubmit: () => void
}

export default function SetAllocationPoint({
  poolId,
  allocPoint,
  onPoolIdChange,
  onAllocPointChange,
  onSubmit
}: SetAllocationPointProps) {
  const { pools } = usePoolData()
  return (
    <FormControl>
      <Tabs variant="soft-rounded" colorScheme="pink">
        <TabList mb={4}>
          <Tab>Set Allocation Point</Tab>
          <Tab>List of Allocation Points</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <VStack align="stretch" spacing={4}>
              <FormLabel
                fontSize="18"
                mb="0"
                fontFamily="Inter"
              >
                Pool Allocation Points
              </FormLabel>

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
                  type="number"
                  value={poolId}
                  onChange={(e) => onPoolIdChange(e.target.value)}
                  placeholder="Pool ID"
                  w="100px"
                  border="none"
                  focusBorderColor="transparent"
                  fontFamily="Inter"
                />
                <Input
                  type="number"
                  value={allocPoint}
                  onChange={(e) => onAllocPointChange(e.target.value)}
                  placeholder="Alloc Points"
                  w="120px"
                  border="none"
                  focusBorderColor="transparent"
                  fontFamily="Inter"
                />
              </Box>

              <Button
                onClick={onSubmit}
                bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
                color="black"
                borderRadius="20px"
                px={6}
                py={2}
                fontSize="16px"
                fontWeight="bold"
                _hover={{ opacity: 0.8 }}
              >
                Set
              </Button>
            </VStack>
          </TabPanel>

          <TabPanel p={0}>
            <VStack align="stretch" spacing={4}>
              <FormLabel
                fontSize="18"
                mb="0"
                fontFamily="Inter"
              >
                List of Allocation Points
              </FormLabel>
              {pools?.map((pool) => (
                <Text key={pool.id}>Pool ID - {pool.id} Allocation Point - {pool.allocPoint.toString()}</Text>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  )
}