import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";

import { fontFaces } from "lib/constants";
import { theme } from "lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={fontFaces} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
