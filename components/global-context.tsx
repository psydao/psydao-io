import * as React from "react";

import { getDynamicBackgroundProps } from "lib/dynamic-background";
import { useGridTracks, gridSpecs } from "lib/grid";
import type { GridSpec } from "lib/grid";

const dynamicBackgroundProps = getDynamicBackgroundProps();

interface GlobalContextProps extends GridSpec {
  dynamicBackgroundProps: ReturnType<typeof getDynamicBackgroundProps>;
}

export const GlobalContext = React.createContext<GlobalContextProps>({
  dynamicBackgroundProps,
  ...gridSpecs.base,
  rows: undefined,
  cols: undefined,
});

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const tracks = useGridTracks();
  return (
    <GlobalContext.Provider value={{ dynamicBackgroundProps, ...tracks }}>
      {children}
    </GlobalContext.Provider>
  );
};
