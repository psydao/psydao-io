import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "wagmi/chains";

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_MAINNET_CLIENT)
});

export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http()
});
