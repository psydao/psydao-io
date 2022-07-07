import type { GridProps as ChakraGridProps } from "@chakra-ui/react";
import { Box, Grid as ChakraGrid, Spinner } from "@chakra-ui/react";
import * as React from "react";

import { GlobalContext } from "components/global-context";

interface GridProps extends ChakraGridProps {
  getNumberOfFillers?: (cols: number, rows: number) => number;
}

export const Grid = ({ children, getNumberOfFillers, ...rest }: GridProps) => {
  const { cols, rows, trackSize } = React.useContext(GlobalContext);
  if (cols && rows) {
    const gutterStylingProps = getNumberOfFillers && {
      borderTop: "1px solid #f2bebe",
      borderLeft: "1px solid #f2bebe",
      sx: {
        "& > *": {
          borderRight: "1px solid #f2bebe",
          borderBottom: "1px solid #f2bebe",
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

  return <Spinner />;
};
