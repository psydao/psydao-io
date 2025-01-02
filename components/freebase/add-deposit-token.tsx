import { Box, Flex, FormLabel, Input, Button, FormControl, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { type Address } from "viem"

interface AddDepositTokenProps {
  onSubmit: (args: { allocPoint: bigint; token: Address; withUpdate: boolean }) => void
}

export default function AddDepositToken({ onSubmit }: AddDepositTokenProps) {
  const [tokenAddress, setTokenAddress] = useState("")
  const [allocPoint, setAllocPoint] = useState("")

  const handleSubmit = () => {
    if (!tokenAddress || !allocPoint) return
    console.log('handlesubmit is firing')
    onSubmit({
      token: tokenAddress as Address,
      allocPoint: BigInt(allocPoint),
      withUpdate: true
    })
    setTokenAddress("")
    setAllocPoint("")
  }

  return (
    <FormControl>
      <VStack align="stretch" spacing={4}>
        <FormLabel
          fontSize="18"
          mb="0"
          fontFamily="Inter"
        >
          Add Deposit Token
        </FormLabel>

        <Box
          bg="#FBF6F8"
          borderRadius="xl"
          boxShadow="inner"
          p="16px"
        >
          <VStack spacing={3}>
            <Input
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Token Address"
              w="100%"
              border="none"
              focusBorderColor="transparent"
              fontFamily="Inter"
            />
            <Input
              type="number"
              value={allocPoint}
              onChange={(e) => setAllocPoint(e.target.value)}
              placeholder="Alloc Points"
              w="100%"
              border="none"
              focusBorderColor="transparent"
              fontFamily="Inter"
            />
          </VStack>
        </Box>

        <Button
          onClick={handleSubmit}
          bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
          color="black"
          borderRadius="20px"
          px={6}
          py={2}
          fontSize="16px"
          fontWeight="bold"
          _hover={{ opacity: 0.8 }}
          w="100%"
        >
          Add Token
        </Button>
      </VStack>
    </FormControl>
  )
}