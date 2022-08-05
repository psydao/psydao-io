import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";

import { Csr } from "components/csr";
import { GridProvider } from "components/grid-context";
import { fontFaces } from "lib/constants";
import { theme } from "lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={fontFaces} />
      <Csr>
        <GridProvider>
          <Component {...pageProps} />
        </GridProvider>
      </Csr>
    </ChakraProvider>
  );
};

export default App;
