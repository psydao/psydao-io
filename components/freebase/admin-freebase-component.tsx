import { useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { TokenManagement } from "./token-management"
import { RewardConfiguration } from "./reward-configuration"
import { AdminSwitch } from "./admin-switch"
import { useAddDepositToken, useUpdateRewardConfig, useRewardTokenManagement } from "@/hooks/useFreebaseAdmin"

export function AdminFreebaseComponent() {
  const [isTokenManagement, setIsTokenManagement] = useState(true)

  // Hooks for contract interactions
  const { addDepositToken } = useAddDepositToken()
  const { addRewardToken, setRewardToken } = useRewardTokenManagement()
  const { updateRewardPerBlock, setAllocationPoint } = useUpdateRewardConfig()

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

      <Box
        p={6}
        borderRadius="md"
        border="1px solid #E9BDBD"
        bg="white"
      >
        {isTokenManagement ? (
          <TokenManagement
            onAddToken={addDepositToken}
            onAddReward={addRewardToken}
            onSetReward={setRewardToken}
          />
        ) : (
          <RewardConfiguration
            onUpdatePerBlock={updateRewardPerBlock}
            onSetAllocation={setAllocationPoint}
          />
        )}
      </Box>
    </Box>
  )
}

export default AdminFreebaseComponent