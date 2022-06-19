import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import "@fontsource/cardo/700.css";
import "@fontsource/cardo/400.css";
import "@fontsource/cardo/400-italic.css";
import type { AppProps } from "next/app";
import { useLayoutEffect } from "react";

import { GlobalContextProvider } from "components/global-context";
import { theme } from "lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  useLayoutEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        window.innerHeight + "px"
      );
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
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
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </ChakraProvider>
  );
};

export default App;
