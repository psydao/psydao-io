import { useAddDepositToken, useUpdateRewardConfig, useRewardTokenManagement } from "@/hooks/useFreebaseAdmin";
import { Flex, Box, Text, Grid } from "@chakra-ui/react";
import { RewardConfiguration } from "./freebase/reward-configuration";
import { TokenManagement } from "./freebase/token-management";

const AdminFreebaseComponent: React.FC = () => {
  const { addDepositToken } = useAddDepositToken();
  const { addRewardToken, setRewardToken } = useRewardTokenManagement();
  const { updateRewardPerBlock, setAllocationPoint } = useUpdateRewardConfig();

  return (
    <Box>
      <Flex
        px={{ base: "4", md: "8" }}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #E9BDBD"
      >
        <Text
          as="h2"
          fontSize={{ base: "24px", sm: "40px" }}
          color="#269200"
        >
          Freebase LP Admin
        </Text>
      </Flex>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p={6}>
        <TokenManagement
          onAddToken={addDepositToken}
          onAddReward={addRewardToken}
          onSetReward={setRewardToken}
        />
        <RewardConfiguration
          onUpdatePerBlock={updateRewardPerBlock}
          onSetAllocation={setAllocationPoint}
        />
      </Grid>
    </Box>
  );
};

export default AdminFreebaseComponent;