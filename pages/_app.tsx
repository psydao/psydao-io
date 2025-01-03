import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  createStandaloneToast
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { fontFaces, shimmer } from "@/lib/constants";
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
        <Global styles={css`
          ${fontFaces}
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `} />
        <Web3Provider>
          <Component {...pageProps} />
          <ToastContainer />
        </Web3Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
