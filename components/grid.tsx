import { Box, Center, Grid as ChakraGrid } from "@chakra-ui/react";
import type { CenterProps } from "@chakra-ui/react";
import * as React from "react";

import { GlobalContext } from "components/global-context";

export interface GridProps extends CenterProps {
  backgroundChildren?: React.ReactNode;
}

export const Grid = ({ backgroundChildren, children, ...rest }: GridProps) => {
  const {
    borderWidth: border,
    cols,
    rows,
    trackSize: track,
  } = React.useContext(GlobalContext);

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
