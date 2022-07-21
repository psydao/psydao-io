import { Box, BoxProps, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useSize } from "lib/hooks";

const appear = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

interface CloudProps extends BoxProps {
  fadeInDuration?: string;
  layers?: 1 | 2 | 3;
}

export const Cloud = ({
  fadeInDuration = "5s",
  layers = 1,
  ...rest
}: CloudProps) => {
  const animation = `${appear} ${fadeInDuration} linear`;

  const [seed, setSeed] = useState<number | null>(null);
  const backFilterId = `back-filter-${seed}`;
  const midFilterId = `mid-filter-${seed}`;
  const frontFilterId = `front-filter-${seed}`;

  const { height, width, target: containerRef } = useSize<HTMLDivElement>();

  useEffect(() => {
    setSeed(Math.trunc(Math.random() * 10_000));
  }, []);

  if (seed === null) {
    return null;
  }

  return (
    <Box
      ref={containerRef}
      position="absolute"
      pointerEvents="none"
      opacity="0.3"
      height="250px"
      width="500px"
      {...rest}
    >
      <Box
        height="100%"
        width="100%"
        borderRadius="50%"
        position="absolute"
        top="-100%"
        left="-100%"
        boxShadow={`${width}px ${height}px 30px 0px #f2bebe`}
        filter={`url(#${backFilterId})`}
        animation={animation}
      />
      {layers >= 2 && (
        <Box
          height="100%"
          width="100%"
          borderRadius="50%"
          position="absolute"
          top="-100%"
          left="-100%"
          boxShadow={`${width}px ${height + 25}px 70px -50px #ea9a9a`}
          filter={`url(#${midFilterId})`}
          animation={animation}
        />
      )}
      {layers >= 3 && (
        <Box
          height="100%"
          width="100%"
          borderRadius="50%"
          position="absolute"
          top="-100%"
          left="-100%"
          boxShadow={`${width}px ${height + 50}px 60px -100px #e37676`}
          filter={`url(#${frontFilterId})`}
          animation={animation}
        />
      )}
      <svg width="0" height="0" display="none">
        <filter id={backFilterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="4"
            seed={seed}
          />
          <feDisplacementMap in="SourceGraphic" scale="170" />
        </filter>
        {layers >= 2 && (
          <filter id={midFilterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed={seed}
            />
            <feDisplacementMap in="SourceGraphic" scale="150" />
          </filter>
        )}
        {layers >= 3 && (
          <filter id={frontFilterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed={seed}
            />
            <feDisplacementMap in="SourceGraphic" scale="100" />
          </filter>
        )}
      </svg>
    </Box>
  );
};
