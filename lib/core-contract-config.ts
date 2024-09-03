import { env } from "@/config/env.mjs";
import coreAbi from "../abis/coreAbi.json";
import coreAbiSepolia from "../abis/coreAbiSepolia.json";
import { CoreMainnet, CoreSepolia } from "../constants/contracts";
const coreContractConfig = {
  address: env.NEXT_PUBLIC_IS_MAINNET
    ? (CoreMainnet as `0x${string}`)
    : (CoreSepolia as `0x${string}`),
  abi: env.NEXT_PUBLIC_IS_MAINNET ? coreAbi : coreAbiSepolia
};

export { coreContractConfig };
