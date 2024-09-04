import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Window } from "../ui/window";
import Image from "next/image";
import PsyButton from "../ui/psy-button";

const ShopifyWidget = () => {
  return (
    <Window
      id="shopify-widget"
      defaultIsOpen
      height={{ base: "75%", sm: "55%", md: "375px" }}
      width={{ base: "92%", sm: "43%", md: "231px" }}
      bottom={{ base: "5%", sm: "20%", md: "168px" }}
      right={{ base: "5%", sm: "30%", md: "83px" }}
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
                fontSize={24}
                fontFamily={"Amiri"}
                lineHeight={"36px"}
              >
                PsyDAO Camo Hat
              </Text>
              <Text color={"#1A202C"} fontFamily={"Amiri"} fontSize={18}>
                Exclusive hat for top <br /> holders of PSYs
              </Text>
              <PsyButton
                onClick={() => {
                  console.log("insert claim logic");
                }}
              >
                Claim Here
              </PsyButton>
            </Flex>
          </Flex>
        </Flex>
      </Window.Content>
    </Window>
  );
};

export default ShopifyWidget;
