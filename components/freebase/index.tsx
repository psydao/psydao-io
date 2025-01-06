import {
  usePoolData,
  useRewards,
  useRewardTokens,
  useUserPoolPositions
} from "@/hooks/useFreebaseUser";
import { Box, Grid, Text, Flex, Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { type Address } from "viem";
import { PoolCard } from "./pool-card";
import { useWizard } from "react-use-wizard";
import { whitelistedAddresses } from "../admin-dashboard/whitelisted-addresses";

export function UserDashboard() {
  const { address } = useAccount();
  const { pools } = usePoolData();
  const { userPoolPositions } = useUserPoolPositions(address as Address);
  const { unclaimedRewards } = useRewards(address as Address);
  const { rewardTokens } = useRewardTokens();
  const { nextStep } = useWizard();

  const isAdmin = whitelistedAddresses.includes(address ?? "0x");

  return (
    <Box>
      <Flex
        px={{ base: "4", md: "8" }}
        alignItems="center"
        borderBottom="1px solid #E9BDBD"
        justifyContent="space-between"
      >
        <Text as="h2" fontSize={{ base: "20px", sm: "24px" }}>
          Freebase Pools
        </Text>
        {isAdmin && (
          <Button
            onClick={nextStep}
            variant={"unstyled"}
            fontFamily={"Inter Medium"}
            fontSize={14}
            fontWeight={400}
            color={"#AF52DE"}
            cursor={"pointer"}
            whiteSpace={"nowrap"}
          >
            Manage Pools
          </Button>
        )}
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(300px, 1fr))"
        }}
        gap={4}
        p={6}
      >
        {pools?.map((pool) => {
          const userPoolPosition = userPoolPositions?.find(
            (position) => Number(position.pool.id) === pool.id
          );

          return (
            <PoolCard
              rewardTokens={rewardTokens}
              key={pool.id}
              pool={pool}
              userAddress={address}
              userPoolPosition={userPoolPosition}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
