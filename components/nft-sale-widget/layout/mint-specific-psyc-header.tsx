import { Box, Flex, Text } from "@chakra-ui/react";
import DecorationFrame from "../commons/decoration-frame";
import DiagonalRectangle from "../commons/diagonal-rectangle";

export const MintSpecificPsycHeader = () => {
  return (
    <Box position="relative" textAlign="center" py={4}>
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <DecorationFrame position="left" />
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          bg="white"
          border="2px solid rgba(242, 190, 190, 0.45)"
          borderRadius="full"
          px={2.5}
          py={1}
          zIndex="1"
        >
          <DiagonalRectangle position="left" />
          <Text
            color="black"
            fontSize={{ base: "12px", sm: "16px", md: "18px" }}
            lineHeight={{ base: "20px", sm: "22px", md: "25px" }}
            fontFamily={"Amiri"}
            px={6}
          >
            Mint Specific PSYC
          </Text>
          <DiagonalRectangle position="right" />
        </Box>
        <DecorationFrame position="right" />
      </Flex>
    </Box>
  );
};
