import * as React from "react";

import { getDynamicBackgroundProps } from "lib/dynamic-background";

const dynamicBackgroundProps = getDynamicBackgroundProps();

export const GlobalContext = React.createContext({
  dynamicBackgroundProps,
});
