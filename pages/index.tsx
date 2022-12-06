import { Box, Center, Icon, Image, Link, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

import { BackgroundGrid } from "components/background-grid";
import { Blobs } from "components/blobs";
import { Csr } from "components/csr";
import { Grid } from "components/grid";
import { GridProvider } from "components/grid-context";
import { Head } from "components/head";
import { Marquee } from "components/marquee";
import { Menu } from "components/menu";
import { WindowManager } from "components/window-manager";
import { FundingWindow } from "components/windows/funding-window";

// TODO Extract Pill component since it seems it will become a basic primitive
// in our design

// TODO Improve theming. All these 1px to 2px border transformations should
// probably a theme prop

const Homepage: NextPage = () => {
  useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        window.innerHeight + "px"
      );
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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
                getNumberOfFillers={(cols, rows) => cols * (rows - 1) - 7}
              >
                <Box gridArea="1 / 1 / 3 / 3">
                  <Image src="/psydao-deep-logo.svg" alt="" h="100%" w="100%" />
                </Box>
                <Box gridArea="-2 / 1 / -1 / -1">
                  <Marquee label="WELCOME TO PSYDAO # FUNDING RESEARCH AT THE INTERSECTION OF PSYCHEDELICS AND MENTAL HEALTH # NOW ACCEPTING APPLICATIONS FOR RESEARCH PROJECT FUNDING AND ALCHEMIST GRANTS" />
                </Box>
                <WindowManager>
                  <Menu />
                  <FundingWindow />
                  {/* TODO implement opening of radio window from click on radio SVG */}
                  <Image
                    src="/radio.svg"
                    alt=""
                    position="absolute"
                    gridArea="-4 / 1 / span 2 / span 2"
                    border="none"
                    placeSelf="center"
                    height="80%"
                    width="80%"
                    // cursor="pointer"
                    opacity="0.5"
                    // _hover={{
                    //   opacity: 1,
                    // }}
                  />
                </WindowManager>
                <Link
                  href="https://discord.gg/hUH4MWxVFx"
                  target="_blank"
                  gridArea="-3 / -4 / span 1 / span 1"
                  p="30%"
                  color="#f2bebe"
                  _hover={{
                    color: "#E69CFF",
                    backgroundImage:
                      "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)",
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
                      "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)",
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
                      "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)",
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
