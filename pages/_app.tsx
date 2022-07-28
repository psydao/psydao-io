import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import "@fontsource/amiri/400-italic.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700-italic.css";
import "@fontsource/amiri/700.css";
import "@fontsource/cardo/400-italic.css";
import "@fontsource/cardo/400.css";
import "@fontsource/cardo/700.css";
import type { AppProps } from "next/app";

import { Csr } from "components/csr";
import { GridProvider } from "components/grid-context";
import { theme } from "lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={`
      @font-face {
        font-family: 'GrandSlang Roman';
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url('/grandslang-roman.ttf') format('truetype');
      }
      `}
      />
      <Csr>
        <GridProvider>
          <Component {...pageProps} />
        </GridProvider>
      </Csr>
    </ChakraProvider>
  );
};

export default App;
