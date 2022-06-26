import { Box } from "@chakra-ui/react";

import { Cloud } from "components/cloud";

export const BackgroundClouds = () => {
  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      overflow="hidden"
    >
      <Cloud
        top="-20px"
        right="-10%"
        height="40%"
        width="90%"
        minHeight="150px"
        minWidth="500px"
        maxHeight="800px"
        maxWidth="1500px"
        opacity="0.4"
        fadeInDuration="3s"
      />
      <Cloud
        right="50%"
        bottom="100px"
        transform="translateX(50%)"
        height="30%"
        width="50%"
        minHeight="150px"
        minWidth="500px"
        maxHeight="600px"
        maxWidth="1000px"
        fadeInDuration="10s"
      />
    </Box>
  );
};
