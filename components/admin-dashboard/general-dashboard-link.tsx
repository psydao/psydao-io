import { Flex, Text } from "@chakra-ui/react";
import { Open } from "../window-manager";

const GeneralDashboardLink = () => {
  return (
    <Open id="general-dashboard">
      <Flex
        h={{ base: "fit-content", sm: "100%" }}
        padding={"8px 14px 8px 14px"}
        cursor={"pointer"}
        bg={"#AF52DE26"}
        borderRadius={"50px"}
        alignItems={"center"}
        w={{ base: "100%", sm: "fit-content" }}
      >
        <Text
          color={"#AF52DE"}
          fontFamily={"Inter Medium"}
          fontSize={{ base: 12, md: 14 }}
          lineHeight={{ base: "12px", md: "14px" }}
        >
          General Dashboard
        </Text>
      </Flex>
    </Open>
  );
};

export default GeneralDashboardLink;
