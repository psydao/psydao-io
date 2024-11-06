import { Box, GridItem, Text, Image, Flex } from "@chakra-ui/react";
import DiagonalRectangle from "../../common/diagonal-rectangle";
import { type ReactNode } from "react";

interface OwnedNftsEmptyStateProps {
  text: ReactNode;
}

const OwnedNftsEmptyState = ({ text }: OwnedNftsEmptyStateProps) => {
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
            {text}
          </Text>
          <DiagonalRectangle position="right" />
        </Flex>
      </Box>
    </GridItem>
  );
};

export default OwnedNftsEmptyState;
