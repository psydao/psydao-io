import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { wagmiConfig } from "@/config/wagmi";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();
  const queryClient = useMemo(() => new QueryClient(), []);

  const theme = useMemo(
    () => (colorMode === "light" ? lightTheme() : darkTheme()),
    [colorMode]
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
