import { Box, Text, Flex, Link, Grid } from "@chakra-ui/react";
import { type ClaimStatus } from "@/lib/types";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import { useMemo } from "react";
import ClaimCard from "../claim/claim-card";
import { dummyData } from "../claim/dummyData";
import { whitelistedAddresses } from "../admin-dashboard/whitelisted-addresses";
import { useAccount } from "wagmi";

export const Claim = () => {
  const { state } = useWindowManager();

  const { address } = useAccount();

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "claim") {
      return true;
    }

    return false;
  }, [state]);

  const isAdmin = whitelistedAddresses.includes(address ?? "0x");

  return (
    <Window
      id="claim"
      maxHeight={{
        base: fullScreenWindow ? "100%" : "90%",
        sm: fullScreenWindow ? "100%" : "80%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      height={"100%"}
      maxWidth={{
        base: fullScreenWindow ? "100%" : "95%",
        md: fullScreenWindow ? "100%" : "602px"
      }}
      width={"100%"}
      top={{
        base: fullScreenWindow ? "0" : "55%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "50%"
      }}
      left={"50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-40%, -45%)"}
      fullScreenWindow={fullScreenWindow}
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content
        layerStyle="window"
        position="relative"
        zIndex="0"
        p={0}
        overflowX={"hidden"}
      >
        <Box>
          <Flex
            px={{ base: "4", md: "8" }}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderBottom={"1px solid #E9BDBD"}
          >
            <Flex
              width={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
              gap={1.5}
              py={6}
            >
              <Text
                as="h2"
                fontSize={{ base: "20px", sm: "24px" }}
                lineHeight={{ base: "20px", sm: "24px" }}
              >
                Claimable Rewards
              </Text>
              {/* add href to claim creation */}
              {isAdmin && (
                <Link
                  h={"100%"}
                  py={{ base: 2, md: 3 }}
                  px={{ base: 2, md: 4 }}
                  w={"100%"}
                  maxW={{ base: "106px", sm: "138px" }}
                  display={"flex"}
                  justifyContent={"center"}
                  cursor={"pointer"}
                  href=""
                  target="_blank"
                  rel="noreferrer noopener"
                  bg={"#AF52DE26"}
                  borderRadius={"50px"}
                  color={"#AF52DE"}
                  fontFamily={"Inter Medium"}
                  fontSize={{ base: 12, md: 14 }}
                  _hover={{ textDecoration: "none" }}
                >
                  Create claims
                </Link>
              )}
            </Flex>
          </Flex>

          <Grid
            templateColumns={{
              base: "minmax(170px, 1fr)",
              sm: "repeat(auto-fit, minmax(170px, 1fr))"
            }}
            gap={2}
            justifyItems="center"
            maxW="100%"
            padding={{ base: "4", md: "8" }}
          >
            {dummyData.map((index) => (
              <ClaimCard
                key={index.batchNumber}
                amount={index.amount}
                claimStatus={index.claimStatus as ClaimStatus}
                batchNumber={index.batchNumber}
                expiry={index.expiry}
              />
            ))}
          </Grid>
        </Box>
      </Window.Content>
    </Window>
  );
};
