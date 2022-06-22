import { Box, Button } from "@chakra-ui/react";

import { useState } from "react";

const CloudPage = () => {
  const [seed, setSeed] = useState(Math.random() * 1000);
  const size = {
    height: "250px",
    width: "500px",
  };
  return (
    <>
      <Button onClick={() => setSeed(Math.random() * 1000)}>New</Button>
      <Box position="absolute" pointerEvents="none" {...size} opacity="0.6">
        <Box
          borderRadius="50%"
          position="absolute"
          top="-275px"
          left="-500px"
          boxShadow={`${size.width} 275px 30px -20px #f2bebe`}
          {...size}
          filter="url(#filter-back)"
        />
        <Box
          borderRadius="50%"
          position="absolute"
          top="-275px"
          left="-500px"
          boxShadow={`${size.width} 300px 70px -60px #ea9a9a`}
          {...size}
          filter="url(#filter-mid)"
        />
        <Box
          borderRadius="50%"
          position="absolute"
          top="-275px"
          left="-500px"
          boxShadow={`${size.width} 320px 60px -100px #e37676`}
          {...size}
          filter="url(#filter-front)"
        />
        <svg width="0" height="0" display="none">
          <filter id="filter-back">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="4"
              seed={seed}
            />
            <feDisplacementMap in="SourceGraphic" scale="170" />
          </filter>
          <filter id="filter-mid">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed={seed}
            />
            <feDisplacementMap in="SourceGraphic" scale="150" />
          </filter>
          <filter id="filter-front">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed={seed}
            />
            <feDisplacementMap in="SourceGraphic" scale="100" />
          </filter>
        </svg>
      </Box>
    </>
  );
};

export default CloudPage;
