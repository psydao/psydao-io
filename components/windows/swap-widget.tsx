import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { Window } from "components/window";
import { TokenContainer } from "components/token-container";
import { ConnectWalletButton } from "components/connect-button";

export const SwapWidget = () => {
  return (
    <Window
      id="highlight"
      defaultIsOpen={true}
      height="80%"
      maxHeight="640px"
      minHeight="350px"
      width="95%"
      maxWidth="655px"
      minWidth="240px"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Window.TitleBar />
      <Window.Content p="0">
        <Box p={6} pb={8}>
          <Text
            textColor="#269200"
            fontWeight="500"
            fontStyle="italic"
            mt="1"
            fontSize={"36px"}
          >
            PSY token sale now open
          </Text>
          <Link
            textDecoration={"underline"}
            textColor="#269200"
            fontWeight="400"
            fontStyle="italic"
            fontSize={"24px"}
            textUnderlineOffset={"12px"}
          >
            Whitepaper
          </Link>
        </Box>
        <Flex w={"full"} alignItems={"center"} direction={"column"}>
          <Flex
            direction={"column"}
            alignItems={"start"}
            textAlign={"center"}
            w={"fit-content"}
          >
            <Image src="/windows/swap/placeholder.png" alt="" margin="0 auto" />
            <Text fontSize={"16px"} color={"#f3c1c1"}>
              $0.1 per PSY
            </Text>
            <Text fontSize={"16px"} color={"#f3c1c1"}>
              $1.023m Circulating Market Cap
            </Text>
            <Text fontSize={"16px"} color={"#f3c1c1"}>
              PSY remaining for sale: 85%
            </Text>
            <Flex direction={"column"} alignItems={"center"} w={"full"} gap={4}>
              <TokenContainer
                amount="0.0"
                header="From"
                name="Ethereum"
                symbol="ETH"
              />
              <Box>
                <ArrowDownIcon />
              </Box>
              <TokenContainer
                amount="0.0"
                header="To (estimated)"
                name="psyDAO"
                symbol="PSY"
              />
              <ConnectWalletButton />
            </Flex>
          </Flex>
        </Flex>
      </Window.Content>
    </Window>
  );
};
