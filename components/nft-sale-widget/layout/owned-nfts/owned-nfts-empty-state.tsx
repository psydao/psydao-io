import { Box, GridItem, Text, Image, Flex } from "@chakra-ui/react";
import DiagonalRectangle from "../../commons/diagonal-rectangle";

const OwnedNftsEmptyState = () => {
  return (
    <GridItem gridRowStart={2}>
      <Box
        p={6}
        display={"inline-flex"}
        position={"relative"}
        borderRadius={"30px"}
        border={"2px solid #F2BEBE73"}
        gap={2.5}
        flexDirection={"column"}
        alignItems={"center"}
        height={"fit-content"}
        width={"fit-content"}
      >
        <Box>
          <Image src={"/windows/nft-sale/psy-logo.svg"} />
        </Box>
        <Flex flexWrap={"nowrap"} gap={4} alignItems={"center"}>
          <DiagonalRectangle position="left" />
          <Text
            fontSize={18}
            color={"black"}
            lineHeight={"26px"}
            textAlign={"center"}
          >
            You don't own any <br /> PSYCs yet{" "}
          </Text>
          <DiagonalRectangle position="right" />
        </Flex>
      </Box>
    </GridItem>
  );
};

export default OwnedNftsEmptyState;
