import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import DiagonalRectangle from "../commons/diagonal-rectangle";
import PsyButton from "@/components/ui/psy-button";

const NFTSaleWidgetEmptyState = () => {
  return (
    <GridItem gridRowStart={2}>
      <Flex
        direction={"column"}
        justifyContent="center"
        alignItems="center"
        height="100%"
        px={4}
      >
        <Box
          p={6}
          display={"inline-flex"}
          borderRadius={"30px"}
          border={"2px solid #F2BEBE73"}
          gap={2.5}
          position={"relative"}
          flexDirection={"column"}
          alignItems={"center"}
          height={"fit-content"}
          width={"fit-content"}
        >
          <Box>
            <Image src={"/psy-logo.svg"} />
          </Box>
          <Flex flexWrap={"nowrap"} gap={4} alignItems={"center"}>
            <DiagonalRectangle position="left" />
            <Text
              fontSize={18}
              color={"black"}
              lineHeight={"26px"}
              textAlign={"center"}
            >
              No sales have been <br /> created yet
            </Text>
            <DiagonalRectangle position="right" />
          </Flex>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default NFTSaleWidgetEmptyState;
