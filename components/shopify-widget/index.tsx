import { Box, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { Window } from "../ui/window";
import Image from "next/image";
import PsyButton from "../ui/psy-button";
import getPOAPStatus from "@/utils/getPOAPStatus";
import { useAccount } from "wagmi";
import ShopifyImageModal from "./shopify-image-modal";
import { useEffect, useState } from "react";
import useRedirectToShopify from "@/hooks/useRedirectToShopify";
import useGetUserOrders from "@/hooks/useGetUserOrders";

const ShopifyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userIsEligibleToClaim, setUserIsEligibleToClaim] = useState(false);
  const [addressSnippet, setAddressSnippet] = useState("");
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const { address } = useAccount();

  const { data, error } = useGetUserOrders(addressSnippet);

  const { redirectToShopify } = useRedirectToShopify();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!address) {
      setUserIsEligibleToClaim(false);
      return;
    }
    const snippet = address.slice(2, 8);
    setAddressSnippet(snippet);
    const checkUserEligibilityStatus = async () => {
      try {
        const userPOAPStatus = await getPOAPStatus(address);

        const isEligible =
          !!userPOAPStatus &&
          userPOAPStatus.hasValidPoap &&
          data?.ordersCount.count === 0 &&
          !error;

        setUserIsEligibleToClaim(isEligible);
      } catch (error) {
        console.error("Error fetching eligibility status", error);
      }
    };
    checkUserEligibilityStatus();
  }, [address, data]);

  return (
    <Window
      id="shopify-widget"
      defaultIsOpen
      height={{ base: "75%", sm: "60%", lg: "400px" }}
      width={{ base: "90%", sm: "50%", lg: "300px" }}
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
              <Flex direction={"column"} gap={1} textAlign={"center"}>
                <Text
                  color={"#269200"}
                  fontSize={{ base: 20, md: 24 }}
                  fontFamily={"Amiri"}
                  lineHeight={"36px"}
                >
                  Psychedelic Science Hat
                </Text>
                <Text
                  color={"#1A202C"}
                  fontFamily={"Amiri"}
                  fontSize={{ base: 16, md: 18 }}
                >
                  Exclusive for top <br /> holders of PSY
                </Text>
              </Flex>
              <PsyButton
                onClick={async () => {
                  await redirectToShopify(address);
                }}
                customStyle={{
                  width: "100%"
                }}
                isDisabled={!userIsEligibleToClaim}
              >
                {address
                  ? userIsEligibleToClaim
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
