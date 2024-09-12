import type { AppProps } from "next/app";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { fontFaces } from "@/lib/constants";
import { Web3Provider } from "@/providers/Web3Provider";
import { ApolloProvider } from "@apollo/client";
import graphClient from "@/config/graphql";
import { theme } from "@/lib/theme";
import { GlobalContextProvider } from "@/contexts/globalContext";

const { ToastContainer } = createStandaloneToast();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={graphClient}>
        <Global styles={fontFaces} />
        <Web3Provider>
          <GlobalContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </GlobalContextProvider>
        </Web3Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
