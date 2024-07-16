import { Flex, Text } from "@chakra-ui/react";

const SaleStatusSection = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      borderY={"1px solid #F2BEBE"}
      p={6}
    >
      <Text fontFamily={"Inter"} fontSize={18} color={"black"}>
        Sale Status
      </Text>
    </Flex>
  );
};

export default SaleStatusSection;
