import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Window } from "../ui/window";
import Image from "next/image";
import PsyButton from "../ui/psy-button";
import getPOAPStatus from "@/utils/getPOAPStatus";
import type { Address } from "viem";
import { useAccount } from "wagmi";
import ShopifyImageModal from "./shopify-image-modal";
import { useEffect, useState } from "react";

const handlePoapLogic = async (address: Address | undefined) => {
  const userPOAPStatus = await getPOAPStatus(address);

  return userPOAPStatus;
};

const ShopifyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userHoldsPOAPToken, setUserHoldsPoapToken] = useState(false);

  const { address } = useAccount();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const checkUserPOAPStatus = async () => {
      const userPOAPData = await handlePoapLogic(address);

      if (userPOAPData) {
        setUserHoldsPoapToken(true);
      } else {
        setUserHoldsPoapToken(false);
      }
    };
    checkUserPOAPStatus().catch(() =>
      console.error("Error fetching POAP status")
    );
  }, [address]);

  return (
    <Window
      id="shopify-widget"
      defaultIsOpen
      height={{ base: "75%", sm: "60%", lg: "385px" }}
      width={{ base: "90%", sm: "50%", lg: "231px" }}
      bottom={{ base: "5%", sm: "20%", lg: "18%" }}
      right={{ base: "5%", sm: "25%", lg: "6%" }}
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
              <Flex
                direction={"column"}
                gap={1}
                textAlign={{ base: "center", lg: "start" }}
              >
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
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onClick={() => {}}
                customStyle={{
                  width: "100%"
                }}
                isDisabled={!userHoldsPOAPToken}
              >
                {address
                  ? userHoldsPOAPToken
                    ? "Claim Here"
                    : "Ineligible to Claim"
                  : "Wallet Disconnected"}
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
