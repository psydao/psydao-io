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
            <Box
              gridArea="2 / -5 / 7 / -1"
              // TODO we need to spec/improve the background generation. Among
              // other things, right now it doesn't follow the apparent intent
              // from the design spec. It'll also only update on mount/refresh
              // because the background keyframe animation is not applied to the
              // values used for the gradient
              backgroundImage={`linear-gradient(0deg, ${dynamicBackgroundProps.background}, ${dynamicBackgroundProps.background}), url(/stan-grof.jpg)`}
              backgroundBlendMode="screen, normal"
              backgroundSize="cover"
            />
            <Box
              gridArea={{ base: "-3 / 1 / -7 / 6", xl: "-2 / 1 / -6 / 7" }}
              // TODO also this instance (see previous comment). Probably we
              // need to come up with a component that takes images and filters
              // them like we want, possibly taking color and animation values
              // from context.
              backgroundImage={`linear-gradient(0deg, ${dynamicBackgroundProps.background}, ${dynamicBackgroundProps.background}), url(/shrooms.jpg)`}
              backgroundBlendMode="screen, multiply"
              backgroundSize="cover"
            />
          </>
        }
      >
        {/* Foreground */}
        <Box gridArea="1 / 1 / 3 / 3" {...dynamicBackgroundProps}>
          <Image src="/psydao-deep-logo.svg" alt="" h="100%" w="100%" />
        </Box>
        <Box gridArea="1 / -1 / 2 / -2" p="2">
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
        <Box
          gridArea={{ base: "-3 / 1 / -1 / -1", xl: "-2 / 1 / -1 / -1" }}
          {...dynamicBackgroundProps}
        >
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
