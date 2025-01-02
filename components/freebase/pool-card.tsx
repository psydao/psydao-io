import { Box, Button, Flex, Text, Input } from "@chakra-ui/react"
import { usePoolInteraction } from "@/hooks/useFreebaseUser"
import { useState } from "react"
import { type Address } from "viem"
import { useTokenInfo } from "@/hooks/useTokenInfo"

interface PoolCardProps {
  pool: {
    id: number
    token: Address
    allocPoint: bigint
    lastRewardBlock: bigint
    accRewardPerShare: bigint
  }
  userAddress?: Address
}

export function PoolCard({ pool, userAddress }: PoolCardProps) {
  const [amount, setAmount] = useState("")
  const {
    deposit,
    withdraw,
    isPending,
    approvedSuccess,
    allowance
  } = usePoolInteraction(BigInt(pool.id))
  const { symbol, decimals } = useTokenInfo(pool.token)

  const handleDeposit = () => {
    if (!amount) return
    deposit({ amount: BigInt(amount) })
    setAmount("")
  }

  const handleWithdraw = () => {
    if (!amount) return
    withdraw({ amount: BigInt(amount) })
    setAmount("")
  }

  return (
    <Box
      borderRadius="xl"
      borderColor="#F2BEBE"
      borderWidth="1px"
      p={6}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">Pool #{pool.id}</Text>
        <Text>{symbol}</Text>
      </Flex>

      <Flex direction="column" gap={4}>
        <Box
          bg="#FBF6F8"
          borderRadius="xl"
          boxShadow="inner"
          p={4}
        >
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            border="none"
            focusBorderColor="transparent"
            disabled={isPending}
          />
        </Box>

        <Flex gap={4}>
          <Button
            onClick={handleDeposit}
            bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
            color="black"
            flex={1}
            _hover={{ opacity: 0.8 }}
            isDisabled={isPending}
          >
            {isPending ? 'Approving...' :
              !approvedSuccess && !allowance ? 'Approve & Deposit' :
                'Deposit'}
          </Button>
          <Button
            onClick={handleWithdraw}
            bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
            color="black"
            flex={1}
            _hover={{ opacity: 0.8 }}
            isDisabled={isPending}
          >
            Withdraw
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}