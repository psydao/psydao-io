import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Icon,
  Image,
  Link,
  Text,
  keyframes
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import { BackgroundGrid } from "@/components/ui/background-grid";
import { Blobs } from "@/components/ui/blobs";
import { Csr } from "@/components/ui/csr";
import { Grid } from "@/components/ui/grid";
import { GridProvider } from "@/components/ui/grid-context";
import { Head } from "@/components/ui/head";
import { Marquee } from "@/components/ui/marquee";
import { Menu } from "@/components/ui/menu";
import { Open, WindowManager } from "@/components/ui/window-manager";
import { Manifesto } from "@/components/windows/manifesto";
import { Radio } from "@/components/windows/radio";
import { MixpanelTracking } from "@/services/mixpanel";
import { SwapWidget } from "@/components/windows/swap-widget";
import { useRescrictedCountries } from "@/hooks/restrictedCountries";
import { Blog } from "@/components/windows/blog";
import "react-toastify/dist/ReactToastify.css";
import { NftSaleWidget } from "@/components/nft-sale-widget";
import WalletConnectHome from "@/components/connectWalletHome";
import AdminDashboardWidget from "@/components/admin-dashboard";
import GeneralDashboard from "@/components/general-dashboard";
// import SaleWidgetProvider from "@/providers/SaleWidgetContext";

// TODO Extract Pill component since it seems it will become a basic primitive
// in our design

// TODO Improve theming. All these 1px to 2px border transformations should
// probably a theme prop

const Homepage: NextPage = () => {
  useRescrictedCountries();

  useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        window.innerHeight + "px"
      );
      MixpanelTracking.getInstance().pageView();
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const fadeIn = keyframes`
   0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  `;

  const fadeinAnimate = `${fadeIn} infinite 6s`;

  const SALE_ACTIVE = true;

  const [updateNftSaleTrigger, setUpdateNftSaleTrigger] = useState(0);

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  return (
    <>
      <Head />
      <Csr
        fallback={
          <noscript>
            <Box fontSize="2xl" p="6">
              <Text>This page requires JavaScript.</Text>
              <Text>
                Check out our{" "}
                <Link href="/links" textDecor="underline">
                  links
                </Link>{" "}
                page, which doesn&apos;t.
              </Text>
            </Box>
          </noscript>
        }
      >
        <ToastContainer />
        <GridProvider>
          <Center
            h="var(--app-height)"
            w="100vw"
            overflow="hidden"
            background="no-repeat top right url(/clouds.png), linear-gradient(60deg, #fffafa, #fff9ef)"
          >
            <Blobs />
            <BackgroundGrid />
            <Box id="window-bounds">
              <Grid
                position="relative"
                zIndex="0"
                getNumberOfFillers={(cols, rows) => cols * (rows - 1) - 11}
              >
                <WindowManager>
                  <Box gridArea="1 / 1 / 3 / 3">
                    {/* TODO: temporary until I can find a better way to do this */}
                    <Open h="100%" w="100%" id="swap">
                      <Box
                        cursor="pointer"
                        h="100%"
                        w="100%"
                        position={"relative"}
                      >
                        {SALE_ACTIVE ? (
                          <>
                            <Image
                              src="/purple-logo.svg"
                              h={"100%"}
                              w={"100%"}
                              alt="logo"
                              position={"absolute"}
                              top={0}
                            />
                            <Image
                              src="/purple-logo-glow.svg"
                              h={"100%"}
                              w={"100%"}
                              alt="logo"
                              animation={`${fadeinAnimate}`}
                              position={"absolute"}
                              top={0}
                            />
                          </>
                        ) : (
                          <Image
                            h={"100%"}
                            w={"100%"}
                            alt="logo"
                            src="/psydao-deep-logo.svg"
                          />
                        )}
                      </Box>
                    </Open>
                  </Box>
                  <Box gridArea="-2 / 1 / -1 / -1">
                    <Marquee
                      text={[
                        "WELCOME TO PSYDAO",
                        "FUNDING RESEARCH AT THE INTERSECTION OF PSYCHEDELICS AND MENTAL HEALTH",
                        "NOW ACCEPTING APPLICATIONS FOR RESEARCH PROJECT FUNDING AND ALCHEMIST GRANTS"
                      ]}
                    />
                  </Box>
                  <WalletConnectHome />
                  <Menu />
                  <Open id="radio" gridArea="-4 / 1 / span 2 / span 2" p="3">
                    <Image
                      src="/radio.svg"
                      alt=""
                      height="100%"
                      width="100%"
                      cursor="pointer"
                      opacity="0.5"
                      _hover={{
                        opacity: 1
                      }}
                    />
                  </Open>
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    bottom="0"
                    left="0"
                    pointerEvents="none"
                    overflow="hidden"
                  >
                    <Blog />
                    <Radio />
                    <Manifesto />
                    <SwapWidget />
                    <NftSaleWidget updateTrigger={updateNftSaleTrigger} />
                    <AdminDashboardWidget
                      triggerNftSaleUpdate={triggerNftSaleUpdate}
                    />
                    <GeneralDashboard
                      triggerNftSaleUpdate={triggerNftSaleUpdate}
                    />
                  </Box>
                </WindowManager>
                <Link
                  href="https://discord.gg/FJHQtBZYdp"
                  target="_blank"
                  gridArea="-3 / -4 / span 1 / span 1"
                  p="30%"
                  color="#f2bebe"
                  _hover={{
                    color: "#E69CFF",
                    backgroundImage:
                      "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)"
                  }}
                  transition="all 200ms ease"
                >
                  <Icon as={FaDiscord} boxSize="full" />
                </Link>
                <Link
                  href="https://twitter.com/psy_dao"
                  target="_blank"
                  gridArea="-3 / -3 / span 1 / span 1"
                  p="30%"
                  color="#f2bebe"
                  _hover={{
                    color: "#a4ffff",
                    backgroundImage:
                      "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)"
                  }}
                  transition="all 200ms ease"
                >
                  <Icon as={FaTwitter} boxSize="full" />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UC8bjrtWOPuHdvMfZ3ScAI-Q"
                  target="_blank"
                  gridArea="-3 / -2 / span 1 / span 1"
                  p="30%"
                  color="#f2bebe"
                  _hover={{
                    color: "#dc4e4e",
                    backgroundImage:
                      "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)"
                  }}
                  transition="all 200ms ease"
                >
                  <Icon as={FaYoutube} boxSize="full" />
                </Link>
              </Grid>
            </Box>
          </Center>
        </GridProvider>
      </Csr>
    </>
  );
};

export default Homepage;
