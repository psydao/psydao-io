import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useLayoutEffect, useState } from "react";

const Mobile: NextPage = () => {
  const [{ height, width }, setDimensions] = useState<{
    height?: number;
    width?: number;
  }>({});

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Box h="100vh" w="100vw">
      <Text>{height ? `Height: ${height}` : "Not able to measure height"}</Text>
      <Text>{width ? `Width: ${width}` : "Not able to measure width"}</Text>
    </Box>
  );
};

export default Mobile;
