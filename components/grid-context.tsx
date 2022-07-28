import { createCtx } from "lib/context";

import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface GridParameters {
  borderWidth: number;
  minPadding: number;
  trackSize: number;
}

interface Tracks {
  cols: number;
  rows: number;
}

// TODO I'd actually prefer to reimplement this calc by taking width and height
// of target element, not necessarily the whole window
const getTracks = ({
  borderWidth,
  minPadding,
  trackSize,
}: GridParameters): Tracks | undefined => {
  if (typeof window !== "undefined") {
    const cols = Math.trunc(
      (window.innerWidth - 2 * minPadding - borderWidth) /
        (trackSize + borderWidth)
    );
    const rows = Math.trunc(
      (window.innerHeight - 2 * minPadding - borderWidth) /
        (trackSize + borderWidth)
    );
    return {
      cols,
      rows,
    };
  }
};

// TODO improve index type to "base" | "sm" | "md" ...
export const gridSpecs: { [breakpoint: string]: GridParameters } = {
  base: { borderWidth: 2, minPadding: 5, trackSize: 55 },
  md: { borderWidth: 2, minPadding: 10, trackSize: 60 },
  xl: { borderWidth: 2, minPadding: 20, trackSize: 85 },
};

export interface GridSpec extends GridParameters, Tracks {}

export const [useGrid, GridContextProvider] = createCtx<GridSpec>();

interface GridProvider {
  children: React.ReactNode;
}
export const GridProvider = ({ children }: GridProvider) => {
  const spec = useBreakpointValue(gridSpecs, { ssr: false });
  const [tracks, setGridTracks] = useState<Tracks | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined" && spec) {
      const handleResize = () => {
        const newTracks = getTracks(spec);
        if (tracks && newTracks) {
          if (
            tracks.cols !== newTracks.cols ||
            tracks.rows !== newTracks.rows
          ) {
            setGridTracks({ ...newTracks });
          }
        } else if (newTracks) {
          setGridTracks({ ...newTracks });
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [spec, tracks]);

  if (spec && tracks) {
    return (
      <GridContextProvider value={{ ...spec, ...tracks }}>
        {children}
      </GridContextProvider>
    );
  }

  return null;
};
