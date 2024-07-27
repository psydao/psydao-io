import { Box, Flex, Text } from "@chakra-ui/react";
import SaleStatusDropdown from "./sale-status-dropdown";
import type { Sale } from "@/lib/types";

const SaleStatusSection = (props: {
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
  sale: Sale | undefined;
}) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      borderY={"1px solid #F2BEBE"}
      p={6}
      w={"100%"}
    >
      <Text fontFamily={"Inter"} fontSize={18} color={"black"}>
        Sale Status
      </Text>
      {props.isComplete ? (
        <Box
          p={"8px 16px"}
          bg={"#F2BEBE1A"}
          borderRadius={"18px"}
          fontFamily={"Inter"}
          fontWeight={"bold"}
          fontSize={18}
        >
          <Flex alignItems={"center"} gap={2}>
            <Box color={"#999999"}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor" />
              </svg>
            </Box>
            Completed
          </Flex>
        </Box>
      ) : (
        <SaleStatusDropdown
          isPaused={props.isPaused}
          setIsPaused={props.setIsPaused}
          sale={props.sale}
        />
      )}
    </Flex>
  );
};

export default SaleStatusSection;
