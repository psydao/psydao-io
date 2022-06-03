import {
  Box,
  Center,
  Grid as ChakraGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { CenterProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface GridSpec {
  border: number;
  padding: number;
  track: number;
}

interface Tracks {
  cols: number | undefined;
  rows: number | undefined;
}

const getGridTracks = ({ border, padding, track }: GridSpec): Tracks => {
  let cols, rows;

  if (typeof window !== "undefined") {
    cols = Math.trunc(
      (window.innerWidth - 2 * padding - border) / (track + border)
    );
    rows = Math.trunc(
      (window.innerHeight - 2 * padding - border) / (track + border)
    );
  }

  return {
    cols,
    rows,
  };
};

// TODO I'm not sure this is optimal. I get to re-renders when cols/rows change.
// Possibly rely on reducer? Possibly not the most important performance issue.
const useGridTracks = ({ border, padding, track }: GridSpec) => {
  const [{ cols, rows }, setGridTracks] = useState<Tracks>(
    getGridTracks({ border, padding, track })
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const newTracks = getGridTracks({ border, padding, track });
        if (cols !== newTracks.cols || rows !== newTracks.rows) {
          setGridTracks({ ...newTracks });
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [border, cols, padding, rows, track]);

  return { cols, rows };
};

const gridSpec: { [breakpoint: string]: GridSpec } = {
  base: { border: 1, padding: 5, track: 40 },
  md: { border: 2, padding: 10, track: 60 },
  xl: { border: 2, padding: 20, track: 85 },
};

export interface GridProps extends CenterProps {
  backgroundChildren?: React.ReactNode;
}

export const Grid = ({ backgroundChildren, children, ...rest }: GridProps) => {
  const { border, padding, track } = useBreakpointValue(gridSpec) ?? {
    ...gridSpec.base,
  };
  const { cols, rows } = useGridTracks({ border, padding, track });

  return (
    <Center w="100vw" h="100vh" {...rest}>
      <Box pos="relative">
        {/* Background grid */}
        {backgroundChildren && (
          <ChakraGrid
            pos="absolute"
            top="0"
            left="0"
            templateColumns={`repeat(${cols}, ${track}px)`}
            templateRows={`repeat(${rows}, ${track}px)`}
            gap={`${border}px`}
            border={`${border}px solid tomato`}
            placeContent="center"
          >
            {backgroundChildren}
          </ChakraGrid>
        )}

        {/* Foreground grid */}
        <ChakraGrid
          pos="relative"
          m="0 auto"
          templateColumns={`repeat(${cols}, ${track}px)`}
          templateRows={`repeat(${rows}, ${track}px)`}
          gap={`${border}px`}
          border={`${border}px solid #f2bebe`}
          placeContent="center"
          backgroundImage={`linear-gradient(#f2bebe ${border}px, transparent ${border}px), linear-gradient(90deg, #f2bebe ${border}px, transparent ${border}px)`}
          backgroundSize={`${track + border}px ${track + border}px, ${
            track + border
          }px ${track + border}px`}
          backgroundPosition={`-${border}px -${border}px`}
        >
          {children}
        </ChakraGrid>
      </Box>
    </Center>
  );
};
