import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { GlobalContext } from "components/global-context";
import { getDynamicBackgroundProps } from "lib/dynamic-background";
import { theme } from "lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContext.Provider
      value={{ dynamicBackgroundProps: getDynamicBackgroundProps() }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
};

export default App;
