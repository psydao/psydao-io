import { Center, GridItem, Image, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

import type { GridProps } from "../components/grid";
import { Marquee } from "../components/marquee";
import { YoutubeEmbed } from "../components/youtube-embed";
import { Window } from "../components/window";

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
  const dragConstraints = React.useRef(null);

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
        background="no-repeat url(/clouds.png)"
        backgroundPosition="top -70px right -180px"
        backgroundChildren={
          <>
            {/* Background */}
            <GridItem
              gridArea="2 / -5 / 7 / -1"
              backgroundImage="linear-gradient(0deg, #FFDFDF, #FFDFDF), url(/stan-grof.jpg)"
              backgroundBlendMode="screen, normal"
              backgroundSize="cover"
            />
            <GridItem
              gridArea={{ base: "-3 / 1 / -7 / 6", xl: "-2 / 1 / -6 / 7" }}
              backgroundImage="linear-gradient(0deg, #FFDFDF, #FFDFDF), url(/shrooms.jpg)"
              backgroundBlendMode="screen, normal"
              backgroundSize="cover"
            />
          </>
        }
      >
        {/* Foreground */}
        <GridItem gridArea="1 / 1 / 3 / 3" bg="#fffafa">
          <Image src="/psydao-deep-logo.svg" alt="" h="100%" w="100%" />
        </GridItem>
        <GridItem
          gridArea="1 / -1 / 2 / -2"
          bg="rgba(255, 250, 250, 0.6)"
          p="15%"
        >
          <Image src="/lissajous-hamburger.svg" alt="" h="100%" w="100%" />
        </GridItem>
        <GridItem
          gridArea={{
            base: "4 / 2 / -1 / -2",
            sm: "4 / 3 / -1 / -3",
            md: "3 / 3 / -1 / -3",
            lg: "2 / 5 / -1 / -5",
            xl: "2 / 5 / -1 / -5",
          }}
        >
          <YoutubeEmbed embedId="dQw4w9WgXcQ" />
        </GridItem>
        <GridItem
          gridArea={{ base: "-3 / 1 / -1 / -1", xl: "-2 / 1 / -1 / -1" }}
          bg="#fffafa"
          overflow="hidden"
        >
          <Marquee label="12.06.2022 ... A SYMPOSIUM on Psychedelics" />
        </GridItem>
      </DynamicLazyComponent>
    </>
  );
};

export default Home;
