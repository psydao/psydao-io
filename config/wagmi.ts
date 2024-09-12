import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet
} from "@rainbow-me/rainbowkit/wallets";

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
    [mainnet.id]: http()
  },
  ssr: true
});
