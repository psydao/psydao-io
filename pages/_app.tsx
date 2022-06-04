import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { GlobalContextProvider } from "components/global-context";
import { theme } from "lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </ChakraProvider>
  );
};

export default App;
