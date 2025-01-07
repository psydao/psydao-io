import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { TokenManagement } from "./token-management";
import { RewardConfiguration } from "./reward-configuration";
import { AdminSwitch } from "./admin-switch";
import {
  useAddDepositToken,
  useUpdateRewardConfig,
  useRewardTokenManagement
} from "@/hooks/useFreebaseAdmin";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useWizard } from "react-use-wizard";

export function AdminFreebaseComponent() {
  const [isTokenManagement, setIsTokenManagement] = useState(true);
  const { previousStep } = useWizard();

  // Hooks for contract interactions
  const { addDepositToken, isPending: isAddDepositTokenPending } =
    useAddDepositToken();
  const {
    addRewardToken,
    topUpRewardToken,
    setRewardToken,
    isPendingAddReward,
    isPendingSetReward,
    isPendingTopUpReward
  } = useRewardTokenManagement();
  const {
    updateRewardPerBlock,
    setAllocationPoint,
    isUpdateRewardPending,
    isSetAllocationPending
  } = useUpdateRewardConfig();

  return (
    <Box p={6}>
      <Flex
        gap={2}
        alignItems="center"
        mb={6}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Button
            onClick={previousStep}
            variant={"unstyled"}
            p={0}
            m={0}
            size={"xs"}
          >
            <ArrowBackIcon h={5} w={5} color={"#F2BEBE"} />
          </Button>
          <Text as="h2" fontSize={{ base: "24px", sm: "38px" }} color="#269200">
            Freebase LP Admin
          </Text>
        </Flex>

        <AdminSwitch
          isTokenManagement={isTokenManagement}
          setIsTokenManagement={setIsTokenManagement}
        />
      </Flex>

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
            onTopUpReward={{
              topUpRewardToken,
              isPending: isPendingTopUpReward
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

export default AdminFreebaseComponent;
