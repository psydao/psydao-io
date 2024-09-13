import { useCallback, useEffect, useMemo } from "react";
import { Box, Center, Image, Text, Link } from "@chakra-ui/react";
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
import { useRescrictedCountries } from "@/hooks/restrictedCountries";
import "react-toastify/dist/ReactToastify.css";
import { NftSaleWidget } from "@/components/nft-sale-widget";
import WalletConnectHome from "@/components/connectWalletHome";
import { SocialLink } from "@/components/ui/SocialLink";
import { fadeInAnimation } from "@/styles/animations";
import dynamic from "next/dynamic";

const Blog = dynamic(() => import("@/components/windows/blog"));
const SwapWidget = dynamic(() => import("@/components/windows/swap-widget"));
const AdminDashboardWidget = dynamic(
  () => import("@/components/admin-dashboard")
);
const GeneralDashboard = dynamic(
  () => import("@/components/general-dashboard")
);

const Homepage: NextPage = () => {
  useRescrictedCountries();

  const updateHeight = useCallback(() => {
    document.documentElement.style.setProperty(
      "--app-height",
      window.innerHeight + "px"
    );
    MixpanelTracking.getInstance().pageView();
  }, []);

  useEffect(() => {
    const debouncedUpdateHeight = updateHeight;
    window.addEventListener("resize", debouncedUpdateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", debouncedUpdateHeight);
  }, [updateHeight]);

  const SALE_ACTIVE = useMemo(() => true, []);

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
                              animation={fadeInAnimation}
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
                        "PSYDAO",
                        "WHO CARES?",
                        "NOW ACCEPTING ALCHEMIST GRANT APPLICATIONS"
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
                    <SwapWidget />
                    <Radio />
                    <Manifesto />
                    <NftSaleWidget />
                    <AdminDashboardWidget />
                    <GeneralDashboard />
                  </Box>
                </WindowManager>
                <SocialLink
                  href="https://discord.gg/FJHQtBZYdp"
                  icon={<FaDiscord />}
                  color="#f2bebe"
                  hoverColor="#E69CFF"
                />
                <SocialLink
                  href="https://twitter.com/psy_dao"
                  icon={<FaTwitter />}
                  color="#f2bebe"
                  hoverColor="#a4ffff"
                />
                <SocialLink
                  href="https://www.youtube.com/channel/UC8bjrtWOPuHdvMfZ3ScAI-Q"
                  icon={<FaYoutube />}
                  color="#f2bebe"
                  hoverColor="#dc4e4e"
                />
              </Grid>
            </Box>
          </Center>
        </GridProvider>
      </Csr>
    </>
  );
};

export default Homepage;
