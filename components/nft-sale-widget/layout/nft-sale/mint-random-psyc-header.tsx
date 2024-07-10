import { Box, Flex, Text } from "@chakra-ui/react";
import DecorationFrame from "../../commons/decoration-frame";
import DiagonalRectangle from "../../commons/diagonal-rectangle";

type MintRandomPsycHeaderProps = {
  isFullScreen: boolean;
};

const MintRandomPsycHeader = (props: MintRandomPsycHeaderProps) => {
  return (
    <Box position="relative" textAlign="center" py={4} px={2}>
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        width="100%"
        gap={{ base: 2, sm: 6 }}
      >
        <DecorationFrame position="left" isFullScreen={props.isFullScreen} />
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
            whiteSpace={"nowrap"}
          >
            Mint Random PSYC
          </Text>
          <DiagonalRectangle position="right" />
        </Box>
        <DecorationFrame position="right" isFullScreen={props.isFullScreen} />
      </Flex>
    </Box>
  );
};

export default MintRandomPsycHeader;
