import { Box, Center, Grid as ChakraGrid } from "@chakra-ui/react";
import type { CenterProps } from "@chakra-ui/react";
import * as React from "react";

import { GlobalContext } from "components/global-context";
import { getGridBackgroundPattern } from "lib/grid";

export interface GridProps extends CenterProps {
  backgroundChildren?: React.ReactNode;
}

export const Grid = ({ backgroundChildren, children, ...rest }: GridProps) => {
  const { borderWidth, cols, rows, trackSize } =
    React.useContext(GlobalContext);

  return (
    <Center w="100vw" h="100vh" overflow="hidden" {...rest}>
      <Box pos="relative">
        {/* Background grid */}
        {backgroundChildren && (
          <ChakraGrid
            pos="absolute"
            top="0"
            left="0"
            templateColumns={`repeat(${cols}, ${trackSize}px)`}
            templateRows={`repeat(${rows}, ${trackSize}px)`}
            gap={`${borderWidth}px`}
            placeContent="center"
          >
            {backgroundChildren}
          </ChakraGrid>
        )}

        {/* Foreground grid */}
        <ChakraGrid
          pos="relative"
          m="0 auto"
          templateColumns={`repeat(${cols}, ${trackSize}px)`}
          templateRows={`repeat(${rows}, ${trackSize}px)`}
          gap={`${borderWidth}px`}
          placeContent="center"
          {...getGridBackgroundPattern({
            borderWidth,
            trackSize,
          })}
        >
          {children}
        </ChakraGrid>
      </Box>
    </Center>
  );
};
