import {
  Box,
  Button,
  Center,
  Image,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

import { GlobalContext } from "components/global-context";
import type { GridProps } from "components/grid";
import { Lissajous } from "components/lissajous";
import { Manifesto } from "components/manifesto";
import { Marquee } from "components/marquee";
import { Window } from "components/window";
import { YoutubeEmbed } from "components/youtube-embed";
import { joyAndSorrow } from "lib/constants";
import { ColorizedImage } from "components/colorized-image";

const DynamicLazyComponent = dynamic<GridProps>(
  () => import("../components/grid").then((mod) => mod.Grid),
  {
    // TODO better loading component
    loading: () => (
      <Center h="100vh" w="100vw">
        <Spinner color="#f2bebe" />
      </Center>
    ),
    ssr: false,
  }
);

// TODO implement dragging like so
//       <motion.div ref={dragConstraints} className={styles.grid}>
//         <Window drag={false} area="1 / 1 / 3 / 3">
//           Logo
//         </Window>
//         <Window dragConstraints={dragConstraints}>Window</Window>
//         <Window dragConstraints={dragConstraints}>
//           <Marquee label="12.06.2022 ... A SYMPOSIUM on Psychedelics" />
//         </Window>
//       </motion.div>

// TODO find a better way to position things on the grid. Supplying gridAreas is
// not very ergonomic. It might be cool to be use named lines or percents that
// resolve to some line coordinates responsively.

const Home: NextPage = () => {
  const { dynamicBackgroundProps } = React.useContext(GlobalContext);
  const dragConstraints = React.useRef(null);
  const [showManifesto, setShowManifesto] = React.useState(false);

  return (
    <>
      <Head>
        <title>PsyDAO - A Psychedelics Research DAO</title>
        <meta
          content="PsyDAO - A Psychedelics Research DAO"
          property="og:title"
        />
        <meta content="/psydao-seo-image.jpg" property="og:image" />
        <meta
          content="PsyDAO - A Psychedelics Research DAO"
          property="twitter:title"
        />
        <meta content="/psydao-seo-image.jpg" property="twitter:image" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          href="/psydao-favicon-black.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link href="/psydao-webclip.png" rel="apple-touch-icon" />
      </Head>
      <DynamicLazyComponent
        // TODO Improve background position. Possibly we want this to be
        // generative art clouds or something
        backgroundImage="url(/clouds.png)"
        backgroundRepeat="no-repeat"
        backgroundPosition="top -70px right -180px"
        {...dynamicBackgroundProps}
        backgroundChildren={
          <>
            {/* Background */}
            <ColorizedImage
              tone={dynamicBackgroundProps.background ?? ""}
              src="/stan-grof.jpg"
              gridArea="2 / -5 / 7 / -1"
              imageProps={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <ColorizedImage
              tone={dynamicBackgroundProps.background ?? ""}
              src="/shrooms.jpg"
              gridArea="-2 / 1 / -7 / 7"
              imageProps={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </>
        }
      >
        {/* Foreground */}
        <Box gridArea="1 / 1 / 3 / 3" {...dynamicBackgroundProps}>
          <Image src="/psydao-deep-logo.svg" alt="" h="100%" w="100%" />
        </Box>
        <Box gridArea="1 / -1 / 2 / -2" p={{ base: "1", md: "2" }}>
          <Lissajous />
        </Box>
        <Window
          p="0"
          contentBoxProps={{ p: 0, overflow: "hidden" }}
          bg="black"
          position="absolute"
          top="calc(20%)"
          left="calc(50% - 151px)"
          initial={{ height: 170 + 40, width: 302 }}
        >
          <YoutubeEmbed embedId="dQw4w9WgXcQ" />
        </Window>
        <AnimatePresence>
          {showManifesto && (
            <Window
              p={0}
              contentBoxProps={{ p: 0 }}
              position="absolute"
              top="calc(50% - 250px)"
              left="calc(50% - 175px)"
              initial={{ height: 500, width: 350 }}
            >
              <Manifesto />
            </Window>
          )}
        </AnimatePresence>
        <Box gridArea="-2 / 1 / -1 / -1" {...dynamicBackgroundProps}>
          <Marquee label={joyAndSorrow} />
        </Box>
        <Center gridArea="-4 / -3 / -3 / -1">
          <Button
            onClick={() => setShowManifesto((prev) => !prev)}
            colorScheme="red"
            rounded="full"
          >
            Manifesto
          </Button>
        </Center>
      </DynamicLazyComponent>
    </>
  );
};

export default Home;
