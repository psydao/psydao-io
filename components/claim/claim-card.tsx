import { type ClaimStatus } from "@/lib/types";
import { useClaim } from "@/services/web3/useClaim";
import { getExpirationStatus } from "@/utils/getExpirationStatus";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";

export interface ClaimCardProps {
  amount: string;
  claimStatus: ClaimStatus;
  batchId: string;
  expiry: string;
  totalClaimable?: string;
  onClaim?: () => void;
  proof?: string[];
  text: string;
  disabled?: boolean;
}

const ClaimCardText = ({ text }: { text: string }) => (
  <Text
    fontFamily={"Inter Medium"}
    textTransform={"capitalize"}
    fontSize={{
      sm: "12px",
      md: "14px"
    }}
    fontWeight={500}
  >
    {text}
  </Text>
);

const ClaimCard = (props: ClaimCardProps) => {
  const { amount, claimStatus, batchId, expiry, proof, text, disabled } = props;

  const { claim } = useClaim({
    batchId: batchId.toString(),
    amount: amount,
    merkleProof: proof 
  });

  return (
    <Flex
      onClick={claim}
      maxW={"593px"}
      mx="auto"
      w="100%"
      direction="column"
      gap={4}
      alignItems="center"
    >
      <Box
        w="100%"
        h={"auto"}
        borderRadius={"20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #E0E0E0"
        onClick={() => true}
        padding={4}
        gap={2}
        fontFamily={"Inter Medium"}
      >
        <ClaimCardText text={`Batch ${batchId.toString()}`} />
        <Divider borderColor={"#E0E0E0"} my={3} />
        <ClaimCardText text={claimStatus} />
        <Text
          fontWeight={700}
          color={claimStatus !== "claimable" ? "#A9A9A9" : "#AF52DE"}
          fontSize={{
            sm: "14px",
            md: "16px"
          }}
        >
          {parseFloat(amount).toFixed(2)} PSY
        </Text>
        <Divider borderColor={"#E0E0E0"} my={3} />
        <ClaimCardText text={`${getExpirationStatus(expiry)}`} />
        <Box marginTop={4}>
          <Button
            onClick={() => true}
            isDisabled={disabled}
            background={
              claimStatus === "claimable"
                ? "linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)"
                : "gray.500"
            }
            width={"100%"}
            color={"white"}
            borderRadius={"20px"}
            padding={"10px 36px"}
            fontSize={"14px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            fontFamily={"Poppins Semibold"}
            _hover={{
              opacity: claimStatus === "claimed" ? "" : "0.8"
            }}
          >
            {disabled ? text : "Claim"}
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ClaimCard;
