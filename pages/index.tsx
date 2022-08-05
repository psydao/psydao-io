import { Box, Center, Icon, Image, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

import { BackgroundGrid } from "components/background-grid";
import { Blobs } from "components/blobs";
import { Grid } from "components/grid";
import { Head } from "components/head";
import { Item } from "components/item";
import { Manifesto } from "components/manifesto";
import { Marquee } from "components/marquee";
import { Newsletter } from "components/newsletter";
import { Youtube } from "components/video";
import { WindowManager } from "components/window-manager";
import { psydaoDescription } from "lib/constants";

// TODO Extract Pill component since it seems it will become a basic primitive
// in our design

// TODO Improve theming. All these 1px to 2px border transformations should
// probably a theme prop

const Homepage: NextPage = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);

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

  if (isBrowser) {
    return (
      <>
        <Head />
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
              getNumberOfFillers={(cols, rows) => cols * (rows - 1) - 6}
            >
              <Box gridArea="1 / 1 / 3 / 3">
                <Image src="/psydao-deep-logo.svg" alt="" h="100%" w="100%" />
              </Box>
              <Box gridArea="-2 / 1 / -1 / -1">
                <Marquee label={psydaoDescription} />
              </Box>
              <WindowManager>
                <Box
                  height="calc(100% - 2px)"
                  width="100%"
                  gridArea={{
                    base: "1 / 1 / span 4 / -1",
                    lg: "1 / 1 / span 1 / -1",
                  }}
                  pos="absolute"
                  border="none !important"
                  display="grid"
                  gridTemplateColumns={{ base: "1fr", lg: "repeat(4, auto)" }}
                  gridTemplateRows={{ base: "repeat(4, 1fr)", lg: "1fr" }}
                  alignItems="center"
                  justifyItems="end"
                  justifyContent="end"
                  gap={{ base: "2px", lg: "4" }}
                  pr={{ base: "2", md: "4" }}
                >
                  <Youtube />
                  <Manifesto />
                  <Newsletter />
                  <Item id="discord">
                    <Item.Icon
                      px="8"
                      borderRadius="full"
                      boxShadow="4px 4px 13px 0px #F2BEBEA1"
                      background="linear-gradient(to bottom, #FFFFFF 0%, #F3FFE9 50.52%, #E7FEFF 100%)"
                      color="#E69CFF"
                      fontSize="24px"
                      fontStyle="italic"
                      fontWeight="700"
                      textAlign="center"
                      // TODO transition this 200ms with gradient transition hack
                      // https://css-tricks.com/transitioning-gradients/
                      _hover={{
                        color: "#FFFFFF",
                        background:
                          "linear-gradient(to bottom, #FAC5FF 0%, #E69CFF 100%)",
                      }}
                    >
                      <Link
                        href="https://discord.gg/hUH4MWxVFx"
                        target="_blank"
                        display="flex"
                        alignItems="center"
                        gap="2"
                        _hover={{ textDecor: "none" }}
                      >
                        <Icon as={FaDiscord} />
                        Join Us
                      </Link>
                    </Item.Icon>
                  </Item>
                </Box>
              </WindowManager>
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
                href="https://youtube.com"
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
      </>
    );
  }

  return null;
};

export default Homepage;
