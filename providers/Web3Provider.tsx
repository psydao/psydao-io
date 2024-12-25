import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  getDefaultConfig
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { wallets } = getDefaultWallets();

export const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet]
    }
  ],
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http("https://sepolia.gateway.tenderly.co"),
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_CLIENT)
  },
  ssr: true
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();

  const theme = colorMode === "light" ? lightTheme() : darkTheme();

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
