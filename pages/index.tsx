import { Box, Center, Image, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import * as React from "react";

import { BackgroundGrid } from "components/background-grid";
import { Grid } from "components/grid";
import { Head } from "components/head";
import { Item } from "components/item";
import { Lissajous } from "components/lissajous";
import { Manifesto } from "components/manifesto";
import { Marquee } from "components/marquee";
import { Newsletter } from "components/newsletter";
import { Video } from "components/video";
import { WindowManager } from "components/window-manager";
import { joyAndSorrow } from "lib/constants";

const Homepage: NextPage = () => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
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
          <BackgroundGrid />
          <Grid
            position="relative"
            zIndex="0"
            getNumberOfFillers={(cols, rows) => cols * (rows - 1) - 25}
          >
            <Box gridArea="1 / 1 / 3 / 3">
              <Image src="/psydao-deep-logo.svg" alt="" h="100%" w="100%" />
            </Box>
            <Box gridArea="1 / -1 / 2 / -2" p={{ base: "1", md: "2" }}>
              <Lissajous />
            </Box>
            <Box gridArea="-2 / 1 / -1 / -1">
              <Marquee label={joyAndSorrow} />
            </Box>
            <WindowManager>
              <Box
                gridArea="2 / -5 / 7 / -1"
                textAlign="right"
                p={{ base: "2", sm: "3", md: "4" }}
                fontSize={{ base: "1.3rem", sm: "1.5rem", md: "2.5rem" }}
                fontStyle="italic"
                lineHeight="1.3em"
                textShadow="2xl"
              >
                <Video />
                <Manifesto />
                <Newsletter />
                <Item id="discord">
                  <Item.Icon>
                    <NextLink href="https://discord.gg/hUH4MWxVFx" passHref>
                      <Link
                        _hover={{ color: "#f00", textDecoration: "none" }}
                        target="_blank"
                      >
                        Discord
                      </Link>
                    </NextLink>
                  </Item.Icon>
                </Item>
                <Item id="twitter">
                  <Item.Icon>
                    <NextLink href="https://twitter.com/PsyDAO_" passHref>
                      <Link
                        _hover={{ color: "#f00", textDecoration: "none" }}
                        target="_blank"
                      >
                        Twitter
                      </Link>
                    </NextLink>
                  </Item.Icon>
                </Item>
              </Box>
            </WindowManager>
          </Grid>
        </Center>
      </>
    );
  }

  return null;
};

export default Homepage;
