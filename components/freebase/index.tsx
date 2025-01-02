import { usePoolData, useRewards } from "@/hooks/useFreebaseUser";
import { Box, Grid, Text, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { type Address } from "viem";
import { PoolCard } from "./pool-card";


export function UserDashboard() {
  const { address } = useAccount();
  const { pools } = usePoolData();
  const { unclaimedRewards } = useRewards(address as Address);

  return (
    <Box>
      <Flex
        px={{ base: "4", md: "8" }}
        alignItems="center"
        borderBottom="1px solid #E9BDBD"
      >
        <Text
          as="h2"
          fontSize={{ base: "20px", sm: "24px" }}
        >
          Freebase LP Pools
        </Text>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(300px, 1fr))"
        }}
        gap={4}
        p={6}
      >
        {pools?.map((pool) => (
          <PoolCard
            key={pool.id}
            pool={pool}
            userAddress={address}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default UserDashboard;