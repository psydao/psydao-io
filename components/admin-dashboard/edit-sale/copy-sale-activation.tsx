import { Flex, Text } from "@chakra-ui/react";
import MintButton from "@/components/ui/mint-button";

interface CopySaleActivationProps {
  handleActivateSale: () => void;
  isButtonDisabled: boolean;
  isLoading: boolean;
}

const CopySaleActivation = ({
  handleActivateSale,
  isButtonDisabled,
  isLoading
}: CopySaleActivationProps) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      borderY={"1px solid #F2BEBE"}
      p={6}
      w={"100%"}
    >
      <Text fontFamily={"Inter"} fontSize={18} color={"black"}>
        Activate Copy Sales
      </Text>
      <MintButton
        onClick={handleActivateSale}
        isDisabled={isButtonDisabled}
        customStyle={{
          background: "linear-gradient(90deg, #f3a6a6, #f77cc2)",
          color: "black",
          borderRadius: "20px",
          padding: "10px 36px",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isLoading ? "Activating..." : "Activate"}
      </MintButton>
    </Flex>
  );
};

export default CopySaleActivation;
