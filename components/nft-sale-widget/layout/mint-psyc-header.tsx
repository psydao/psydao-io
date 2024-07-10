import { Box, Flex, Text } from "@chakra-ui/react";
import { WhitepaperLink } from "../commons/whitepaper-link";
import { PrivateSaleSwitch } from "../commons/privatesale-switch";
import { Open } from "@/components/window-manager";

export const MintPsycHeader = () => {
  // TODO: Hide toggle if user is not whitelisted
  const IS_WHITELISTED = true;

  return (
    <Box px={{ base: 2, md: 4 }} py={2}>
      <Flex
        alignItems={{ base: "start", md: "center" }}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={2}
      >
        <Flex
          alignItems={{ base: "start", md: "center" }}
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Text
            textColor="#269200"
            fontWeight="500"
            fontStyle="italic"
            fontSize={{ base: "20px", sm: "40px" }}
            lineHeight={{ base: "20px", sm: "40px" }}
            fontFamily={"Amiri"}
          >
            Mint PSYC
          </Text>
          {IS_WHITELISTED && <PrivateSaleSwitch />}
        </Flex>
        <Flex alignItems={"center"} gap={3}>
          <Open id="admin-dashboard">
            <Text
              fontFamily={"Inter Medium"}
              fontSize={14}
              color={"#AF52DE"}
              cursor={"pointer"}
            >
              Admin Dashboard
            </Text>
          </Open>
          <WhitepaperLink />
        </Flex>
      </Flex>
    </Box>
  );
};
