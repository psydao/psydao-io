import { env } from "@/config/env.mjs";
import coreAbi from "../abis/coreAbi.json";
import coreAbiSepolia from "../abis/coreAbiSepolia.json";
import { CoreMainnet, CoreSepolia } from "../constants/contracts";
import type { Address } from "viem";
const coreContractConfig = {
  address: env.NEXT_PUBLIC_IS_MAINNET
    ? (CoreMainnet as Address)
    : (CoreSepolia as Address),
  abi: env.NEXT_PUBLIC_IS_MAINNET ? coreAbi : coreAbiSepolia
};

export { coreContractConfig };
