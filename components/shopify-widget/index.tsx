import { Box, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { Window } from "../ui/window";
import Image from "next/image";
import PsyButton from "../ui/psy-button";
import ShopifyImageModal from "./shopify-image-modal";
import { useState } from "react";
import useRedirectToShopify from "@/hooks/useRedirectToShopify";

const ShopifyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");
  const { redirectToShopify } = useRedirectToShopify();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Window
      id="shopify-widget"
      height={{ base: "68%", sm: "60%", lg: "400px" }}
      width={{ base: "90%", sm: "50%", lg: "300px" }}
      bottom={{ base: "3%", sm: "20%", lg: "18%" }}
      right={{ base: "5%", sm: "25%", lg: "6%" }}
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content p={4}>
        <Grid placeItems={"center"} w={"100%"} h={"100%"}>
          <Box h={"fit-content"} position={"relative"}>
            <button onClick={handleModal}>
              <Image
                src={"/windows/shopify/shopify-hat.png"}
                alt="product"
                width={200}
                height={175}
                quality={75}
              />
            </button>

            <Flex direction="column" gap={4}>
              <Flex direction={"column"} gap={1} textAlign={"center"}>
                <Text
                  color={"#269200"}
                  fontSize={{ base: 20, md: 24 }}
                  fontFamily={"Amiri"}
                  lineHeight={"36px"}
                >
                  Psychedelic Science Hat
                </Text>
              </Flex>
              <PsyButton
                onClick={redirectToShopify}
                customStyle={{
                  width: "100%"
                }}
              >
                Buy
              </PsyButton>
            </Flex>
          </Box>
          <ShopifyImageModal
            imageSrc="/windows/shopify/shopify-hat.png"
            isOpen={isOpen}
            onClose={() => {
              setIsOpen((prev) => !prev);
            }}
          />
        </Grid>
      </Window.Content>
    </Window>
  );
};

export default ShopifyWidget;
