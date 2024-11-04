import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  createStandaloneToast
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { fontFaces } from "@/lib/constants";
import { Web3Provider } from "@/providers/Web3Provider";
import { ApolloProvider } from "@apollo/client";
import { graphClient } from "@/config/apolloClients";

const { ToastContainer } = createStandaloneToast();

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: "Amiri"
      }
    })
  }
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={graphClient}>
        <Global styles={fontFaces} />
        <Web3Provider>
          <Component {...pageProps} />
          <ToastContainer />
        </Web3Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
