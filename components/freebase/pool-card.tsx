import { Box, Button, Flex, Text, Input } from "@chakra-ui/react";
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
    <Box borderRadius="xl" borderColor="#F2BEBE" borderWidth="1px" p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Pool #{pool.id}
        </Text>
        <Text>{symbol}</Text>
      </Flex>

      <Flex direction="column" gap={4}>
        {userPoolPosition?.amount && (<Text>Deposited Tokens: {formatUnits(userPoolPosition?.amount, 18)}</Text>)}
        <Box bg="#FBF6F8" borderRadius="xl" boxShadow="inner" p={4}>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            border="none"
            focusBorderColor="transparent"
            disabled={approvalPending || poolInteractionPending}
          />
        </Box>

        <Flex gap={4}>
          <Button
            onClick={handleDeposit}
            bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
            color="black"
            flex={1}
            _hover={{
              opacity: approvalPending || poolInteractionPending ? 0.4 : 0.8
            }}
            isDisabled={approvalPending || poolInteractionPending}
          >
            {approvalPending || poolInteractionPending
              ? "Please wait..."
              : !approvedSuccess && !allowance
                ? "Approve & Deposit"
                : "Deposit"}
          </Button>
          {userPoolPosition?.amount && userPoolPosition.amount > BigInt("0") && (<Button
            onClick={handleWithdraw}
            bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
            color="black"
            flex={1}
            _hover={{
              opacity: approvalPending || poolInteractionPending ? 0.4 : 0.8
            }}
            isDisabled={approvalPending || poolInteractionPending}
          >
            {approvalPending || poolInteractionPending
              ? "Please wait..."
              : "Withdraw"}
          </Button>)}
        </Flex>
      </Flex>
    </Box>
  );
}
