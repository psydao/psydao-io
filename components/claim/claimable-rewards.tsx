import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import ClaimCard from "./claim-card";
import { dummyData } from "./dummyData";
import { type ClaimStatus } from "@/lib/types";
import { useWizard } from "react-use-wizard";

interface ClaimableRewardsProps {
  isAdmin: boolean;
}

const ClaimableRewards: React.FC<ClaimableRewardsProps> = ({ isAdmin }) => {
  const { nextStep } = useWizard();

  return (
    <Box>
      <Flex
        px={{ base: "4", md: "8" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E9BDBD"}
      >
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          gap={1.5}
          py={6}
        >
          <Text
            as="h2"
            fontSize={{ base: "20px", sm: "24px" }}
            lineHeight={{ base: "20px", sm: "24px" }}
          >
            Claimable Rewards
          </Text>
          {/* add href to claim creation */}
          {isAdmin && (
            <Button
              h={"100%"}
              py={{ base: 2, md: 3 }}
              px={{ base: 2, md: 4 }}
              w={"100%"}
              maxW={{ base: "106px", sm: "138px" }}
              display={"flex"}
              justifyContent={"center"}
              bg={"#AF52DE26"}
              borderRadius={"50px"}
              color={"#AF52DE"}
              fontFamily={"Inter Medium"}
              fontSize={{ base: 12, md: 14 }}
              _hover={{ textDecoration: "none" }}
              onClick={nextStep}
            >
              Create claims
            </Button>
          )}
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "minmax(170px, 1fr)",
          sm: "repeat(auto-fit, minmax(170px, 1fr))"
        }}
        gap={2}
        justifyItems="center"
        maxW="100%"
        padding={{ base: "4", md: "8" }}
      >
        {dummyData.map((index) => (
          <ClaimCard
            key={index.batchNumber}
            amount={index.amount}
            claimStatus={index.claimStatus as ClaimStatus}
            batchNumber={index.batchNumber}
            expiry={index.expiry}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ClaimableRewards;
