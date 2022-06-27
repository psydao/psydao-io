import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

import { Cloud } from "components/cloud";

const CloudPage = () => {
  const [key, setKey] = useState(Math.random());

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <Box
        position="relative"
        h="100vh"
        w="100vw"
        p="2"
        overflow="hidden"
        onClick={() => setKey(Math.random())}
      >
        <Text textAlign="center">Tap to generate new ones</Text>
        <Cloud
          key={key}
          top="30%"
          left="50%"
          transform="translate(-50%, -50%)"
          height="40vw"
          width="80vw"
          opacity="0.6"
          fadeInDuration="0.3s"
          layers={3}
        />
        <Cloud
          key={key + 1}
          top="70%"
          left="50%"
          transform="translate(-50%, -50%)"
          height="40vw"
          width="80vw"
          opacity="0.6"
          fadeInDuration="0.3s"
          layers={3}
        />
      </Box>
    </>
  );
};

export default CloudPage;
