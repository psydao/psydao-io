import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  createStandaloneToast,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { fontFaces } from "lib/constants";
import { Web3Provider } from "providers/Web3Provider";

const { ToastContainer } = createStandaloneToast();

export const theme = extendTheme({});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={fontFaces} />
      <Web3Provider>
        <Component {...pageProps} />
        <ToastContainer />
      </Web3Provider>
    </ChakraProvider>
  );
};

export default App;
