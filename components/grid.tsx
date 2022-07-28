import type { GridProps as ChakraGridProps } from "@chakra-ui/react";
import { Box, Grid as ChakraGrid } from "@chakra-ui/react";

import { useGrid } from "components/grid-context";

interface GridProps extends ChakraGridProps {
  getNumberOfFillers?: (cols: number, rows: number) => number;
}

export const Grid = ({ children, getNumberOfFillers, ...rest }: GridProps) => {
  const { cols, rows, trackSize, borderWidth } = useGrid();
  if (cols && rows) {
    const gutterStylingProps = getNumberOfFillers && {
      borderTop: `${borderWidth}px solid #f2bebe`,
      borderLeft: `${borderWidth}px solid #f2bebe`,
      sx: {
        "& > *": {
          borderRight: `${borderWidth}px solid #f2bebe`,
          borderBottom: `${borderWidth}px solid #f2bebe`,
        },
      },
    };
    return (
      <ChakraGrid
        // @ts-expect-error
        templateColumns={`repeat(${cols}, ${trackSize}px)`}
        templateRows={`repeat(${rows}, ${trackSize}px)`}
        placeContent="center"
        {...gutterStylingProps}
        {...rest}
      >
        {children}
        {getNumberOfFillers &&
          new Array(getNumberOfFillers(cols, rows))
            .fill(null)
            .map((_, idx) => <Box key={idx} />)}
      </ChakraGrid>
    );
  }

  return null;
};
