import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/cardo/700.css";
import "@fontsource/cardo/400.css";
import "@fontsource/cardo/400-italic.css";

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
