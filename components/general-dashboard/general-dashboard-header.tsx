import { ArrowBackIcon } from "@chakra-ui/icons";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { Close, Open } from "../ui/window-manager";

const GeneralDashboardHeader = () => {
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex
        justifyContent={"space-between"}
        padding={"8px 24px 16px 24px"}
        flexWrap={"wrap"}
        width={"100%"}
      >
        <Flex alignItems={"center"} gap={1}>
          <Close id="general-dashboard" cursor={"pointer"}>
            <Open id="admin-dashboard">
              <ArrowBackIcon h={6} w={6} color={"#F2BEBE"} />
            </Open>
          </Close>
          <Text
            fontSize={{ base: 24, sm: 40 }}
            color={"#269200"}
            fontFamily={"Amiri"}
          >
            General Dashboard
          </Text>
        </Flex>
      </Flex>
      <Divider
        orientation="horizontal"
        bg={"#F2BEBE"}
        border={"none"}
        height={"1px"}
      />
    </Flex>
  );
};

export default GeneralDashboardHeader;
