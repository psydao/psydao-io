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
        onClick={() => setKey(Math.random())}
      >
        <Text textAlign="center">Tap to get a new one</Text>
        <Cloud
          key={key}
          top="50px"
          right="40%"
          height="100px"
          width="100px"
          opacity="0.6"
          fadeInDuration="1s"
        />
        <Cloud
          key={key + 1}
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          height="20vh"
          width="90%"
          opacity="0.6"
          fadeInDuration="1s"
        />
        <Cloud
          key={key + 2}
          bottom="50px"
          left="10%"
          height="150px"
          width="50px"
          opacity="0.6"
          fadeInDuration="1s"
        />
        <Cloud
          id="cyan right"
          key={key + 3}
          bottom="50px"
          right="10%"
          height="150px"
          width="50px"
          opacity="0.6"
          fadeInDuration="1s"
        />
      </Box>
    </>
  );
};

export default CloudPage;
