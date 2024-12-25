import { useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { TokenManagement } from "./token-management"
import { RewardConfiguration } from "./reward-configuration"
import { AdminSwitch } from "./admin-switch"
import { useAddDepositToken, useUpdateRewardConfig, useRewardTokenManagement } from "@/hooks/useFreebaseAdmin"

export function AdminFreebaseComponent() {
  const [isTokenManagement, setIsTokenManagement] = useState(true)

  // Hooks for contract interactions
  const { addDepositToken, isPending: isAddDepositTokenPending } =
    useAddDepositToken();
  const {
    addRewardToken,
    setRewardToken,
    isPendingAddReward,
    isPendingSetReward
  } = useRewardTokenManagement();
  const { updateRewardPerBlock, setAllocationPoint, isUpdateRewardPending, isSetAllocationPending } = useUpdateRewardConfig();

  return (
    <Box p={6}>
      <Text
        as="h2"
        fontSize={{ base: "24px", sm: "40px" }}
        color="#269200"
        mb={6}
      >
        Freebase LP Admin
      </Text>

      <AdminSwitch
        isTokenManagement={isTokenManagement}
        setIsTokenManagement={setIsTokenManagement}
      />

      <Box p={6} borderRadius="md" border="1px solid #E9BDBD" bg="white">
        {isTokenManagement ? (
          <TokenManagement
            onAddToken={{
              addDepositToken,
              isPending: isAddDepositTokenPending
            }}
            onAddReward={{
              addRewardToken,
              isPending: isPendingAddReward
            }}
            onSetReward={{
              setRewardToken,
              isPending: isPendingSetReward
            }}
          />
        ) : (
          <RewardConfiguration
            onUpdatePerBlock={updateRewardPerBlock}
            onSetAllocation={setAllocationPoint}
              isUpdateRewardPending={isUpdateRewardPending}
              isSetAllocationPending={isSetAllocationPending}
          />
        )}
      </Box>
    </Box>
  );
}

export default AdminFreebaseComponent