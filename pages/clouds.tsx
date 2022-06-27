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
        <Text textAlign="center">Tap to generate a new one</Text>
        <Cloud
          key={key}
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          height="60vw"
          width="95vw"
          maxHeight="400px"
          maxWidth="800px"
          opacity="0.6"
          fadeInDuration="0.3s"
          layers={3}
        />
      </Box>
    </>
  );
};

export default CloudPage;
