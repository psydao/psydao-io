import { Box, Flex, Text } from "@chakra-ui/react";
import { Window } from "../ui/window";
import Image from "next/image";
import PsyButton from "../ui/psy-button";

const ShopifyWidget = () => {
  return (
    <Window
      id="shopify-widget"
      defaultIsOpen
      height={{ base: "75%", sm: "58%", lg: "375px" }}
      width={{ base: "90%", sm: "50%", lg: "231px" }}
      bottom={{ base: "5%", sm: "20%", lg: "168px" }}
      right={{ base: "5%", sm: "25%", lg: "83px" }}
    >
      <Window.TitleBar />
      <Window.Content p={4}>
        <Flex direction={"column"} alignItems={"center"} w={"100%"} h={"100%"}>
          <Box
            height={"100%"}
            width={"100%"}
            position={"relative"}
            maxW={"200px"}
            maxH={"175px"}
          >
            <Image
              src={"/windows/shopify/shopify-hat.png"}
              alt="product"
              fill
            />
          </Box>
          <Flex direction="column" gap={4}>
            <Flex direction={"column"} gap={1}>
              <Text
                color={"#269200"}
                fontSize={{ base: 20, md: 24 }}
                fontFamily={"Amiri"}
                lineHeight={"36px"}
              >
                PsyDAO Camo Hat
              </Text>
              <Text
                color={"#1A202C"}
                fontFamily={"Amiri"}
                fontSize={{ base: 16, md: 18 }}
              >
                Exclusive hat for top <br /> holders of PSYs
              </Text>
            </Flex>
            <PsyButton
              onClick={() => {
                console.log("insert claim logic");
              }}
            >
              Claim Here
            </PsyButton>
          </Flex>
        </Flex>
      </Window.Content>
    </Window>
  );
};

export default ShopifyWidget;
