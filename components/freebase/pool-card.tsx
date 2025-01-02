import { Box, Button, Card, CardBody, CardHeader, CardFooter, Flex, Text, Input } from "@chakra-ui/react";
import { usePoolInteraction } from "@/hooks/useFreebaseUser";
import { useState } from "react";
import { formatUnits, type Address } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { FreebaseToken, FreebaseUserPoolPosition } from "@/lib/services/freebase";

interface PoolCardProps {
  pool: {
    id: number;
    tokenAddress: Address;
    allocPoint: bigint;
    lastRewardBlock: bigint;
    accRewardPerShare: bigint;
    tokenInfo: FreebaseToken;
    userCount: number;
    depositCount: number;
    withdrawCount: number;
    totalDeposited: bigint;
  };
  userAddress?: Address;
  rewardTokens?: FreebaseToken[];
  userPoolPosition?: FreebaseUserPoolPosition;
}

export function PoolCard({ pool, userAddress, rewardTokens, userPoolPosition }: PoolCardProps) {
  const [amount, setAmount] = useState("");
  const {
    deposit,
    withdraw,
    approvalPending,
    approvedSuccess,
    allowance,
    poolInteractionPending
  } = usePoolInteraction(BigInt(pool.id));
  const { symbol, decimals } = useTokenInfo(pool.tokenAddress);

  const handleDeposit = () => {
    if (!amount) return;
    deposit({ amount: BigInt(amount) });
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!amount) return;
    withdraw({ amount: BigInt(amount) });
    setAmount("");
  };

  return (
    <Card
      borderColor="#F2BEBE"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <CardHeader pb={0}>
        <Flex justify="space-between" align="center">
          <Text fontSize="md" fontWeight="medium">
            Pool #{pool.id}
          </Text>
          <Text fontSize="md">
            {symbol}
          </Text>
        </Flex>
      </CardHeader>

      <CardBody>
        {userPoolPosition?.amount && (
          <Text fontSize="sm" color="gray.600" mb={4}>
            Deposited Tokens: {formatUnits(userPoolPosition?.amount, 18)}
          </Text>
        )}

        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          bg="#FBF6F8"
          border="none"
          borderRadius="md"
          fontSize="sm"
          height="48px"
          _placeholder={{ color: 'gray.500' }}
          disabled={approvalPending || poolInteractionPending}
        />
      </CardBody>

      <CardFooter gap={3}>
        <Button
          onClick={handleDeposit}
          bg="linear-gradient(90deg, #F2BEBE, #F77CC2)"
          color="black"
          flex={1}
          height="48px"
          isDisabled={approvalPending || poolInteractionPending}
          _hover={{ opacity: 0.9 }}
        >
          {approvalPending || poolInteractionPending
            ? "Please wait..."
            : !approvedSuccess && !allowance
              ? "Approve & Deposit"
              : "Deposit"}
        </Button>
        {userPoolPosition?.amount && userPoolPosition.amount > BigInt("0") && (
          <Button
            onClick={handleWithdraw}
            bg="linear-gradient(90deg, #F2BEBE, #F77CC2)"
            color="black"
            flex={1}
            height="48px"
            isDisabled={approvalPending || poolInteractionPending}
            _hover={{ opacity: 0.9 }}
          >
            Withdraw
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
