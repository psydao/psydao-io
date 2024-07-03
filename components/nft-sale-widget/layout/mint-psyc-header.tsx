import { Box, Flex, Text } from "@chakra-ui/react";
import { WhitepaperLink } from "../commons/whitepaper-link";
import { PrivateSaleSwitch } from "../commons/privatesale-switch";

const MintPsycHeader = () => {
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
        <WhitepaperLink />
      </Flex>
    </Box>
  );
};

export default MintPsycHeader;
