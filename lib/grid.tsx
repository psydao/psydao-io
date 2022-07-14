import { useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";

interface GridParameters {
  borderWidth: number;
  minPadding: number;
  trackSize: number;
}

interface Tracks {
  cols: number | undefined;
  rows: number | undefined;
}

const getTracks = ({
  borderWidth,
  minPadding,
  trackSize,
}: GridParameters): Tracks => {
  let cols, rows;

  if (typeof window !== "undefined") {
    cols = Math.trunc(
      (window.innerWidth - 2 * minPadding - borderWidth) /
        (trackSize + borderWidth)
    );
    rows = Math.trunc(
      (window.innerHeight - 2 * minPadding - borderWidth) /
        (trackSize + borderWidth)
    );
  }

  return {
    cols,
    rows,
  };
};

// TODO narrow breakpoint type down from string to union of literals base, sm,
// md, etc.
export const gridSpecs: { [breakpoint: string]: GridParameters } = {
  base: { borderWidth: 1, minPadding: 5, trackSize: 40 },
  md: { borderWidth: 1, minPadding: 10, trackSize: 60 },
  xl: { borderWidth: 1, minPadding: 20, trackSize: 85 },
};

export interface GridSpec extends GridParameters, Tracks {}

// TODO I'm not sure this is optimal. I get two re-renders when cols/rows
// change. Possibly rely on reducer? Possibly not the most important performance
// issue.
export const useGridTracks = (): GridSpec => {
  const { borderWidth, minPadding, trackSize } = useBreakpointValue(
    gridSpecs
  ) ?? {
    ...gridSpecs.base,
  };
  const [{ cols, rows }, setGridTracks] = React.useState<Tracks>({
    cols: undefined,
    rows: undefined,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const newTracks = getTracks({ borderWidth, minPadding, trackSize });
        if (cols !== newTracks.cols || rows !== newTracks.rows) {
          setGridTracks({ ...newTracks });
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [borderWidth, cols, minPadding, rows, trackSize]);

  return { borderWidth, cols, minPadding, rows, trackSize };
};

interface GetGridBackgroundPatternParameters {
  borderWidth: number;
  strokeColor?: string;
  trackSize: number;
}

export const getGridBackgroundPattern = ({
  borderWidth,
  strokeColor = "#f2bebe",
  trackSize,
}: GetGridBackgroundPatternParameters) => {
  const backgroundImage = `linear-gradient(${strokeColor} ${borderWidth}px, transparent ${borderWidth}px), linear-gradient(90deg, ${strokeColor} ${borderWidth}px, transparent ${borderWidth}px)`;
  const backgroundPosition = `-${borderWidth}px -${borderWidth}px`;
  const backgroundSize = `${trackSize + borderWidth}px ${
    trackSize + borderWidth
  }px, ${trackSize + borderWidth}px ${trackSize + borderWidth}px`;
  const border = `${borderWidth}px solid ${strokeColor}`;

  return {
    backgroundImage,
    backgroundPosition,
    backgroundSize,
    border,
  };
};
