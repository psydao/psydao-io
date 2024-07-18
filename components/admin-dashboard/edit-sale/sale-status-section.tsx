import { Flex, Text } from "@chakra-ui/react";
import SaleStatusDropdown from "./sale-status-dropdown";

const SaleStatusSection = () => {
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
      <SaleStatusDropdown />
    </Flex>
  );
};

export default SaleStatusSection;
