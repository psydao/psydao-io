import { Box, Flex, FormLabel, Input, Button, FormControl } from "@chakra-ui/react"
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
    onSubmit({
      token: tokenAddress as Address,
      allocPoint: BigInt(allocPoint),
      withUpdate: true
    })
    // Reset form
    setTokenAddress("")
    setAllocPoint("")
  }

  return (
    <FormControl>
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
          Add Deposit Token
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
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Token Address"
              w={{ base: "100%", md: "200px" }}
              border="none"
              focusBorderColor="transparent"
              fontFamily="Inter"
            />
            <Input
              type="number"
              value={allocPoint}
              onChange={(e) => setAllocPoint(e.target.value)}
              placeholder="Alloc Points"
              w={{ base: "100%", md: "120px" }}
              border="none"
              focusBorderColor="transparent"
              fontFamily="Inter"
            />
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
          >
            Add Token
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  )
}