import psycSaleAbi from "../abis/psycSaleAbi.json";
import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleMainnet, psycSaleSepolia } from "../constants/contracts";
import { type AbiItem } from "web3-utils";
import { env } from "@/config/env.mjs";

const psycSaleContractConfig = {
  address: env.NEXT_PUBLIC_IS_MAINNET
    ? (psycSaleMainnet as `0x${string}`)
    : (psycSaleSepolia as `0x${string}`),
  abi: env.NEXT_PUBLIC_IS_MAINNET
    ? (psycSaleAbi as AbiItem[])
    : (psycSaleAbiSepolia as AbiItem[])
};

export { psycSaleContractConfig };
