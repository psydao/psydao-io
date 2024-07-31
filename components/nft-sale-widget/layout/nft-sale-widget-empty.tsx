import { Box, Button, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import DiagonalRectangle from "../commons/diagonal-rectangle";
import type { Address } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const NFTSaleWidgetEmptyState = (props: { address: Address | undefined }) => {
  const { openConnectModal } = useConnectModal();
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
          {props.address ? (
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
          ) : (
            <Flex
              flexWrap={"nowrap"}
              gap={4}
              alignItems={"center"}
              direction={"column"}
              justifyContent={"center"}
            >
              <DiagonalRectangle position="left" />
              <Text
                fontSize={18}
                color={"black"}
                lineHeight={"26px"}
                textAlign={"center"}
              >
                Connect your wallet <br /> to access sales
              </Text>
              <DiagonalRectangle position="right" />
              <Button
                variant={"unstyled"}
                w={"100%"}
                borderRadius={"24px"}
                border={"2px solid #F2BEBE"}
                color={"#F2BEBE"}
                fontSize={18}
                fontFamily={"Amiri"}
                fontWeight={"bold"}
                onClick={() => {
                  openConnectModal && openConnectModal();
                }}
              >
                Connect Wallet
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </GridItem>
  );
};

export default NFTSaleWidgetEmptyState;
