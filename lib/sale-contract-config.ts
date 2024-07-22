import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";
import { type AbiItem } from "web3-utils";

const psycSaleContractConfig = {
  address: psycSaleSepolia as `0x${string}`,
  abi: psycSaleAbiSepolia as AbiItem[]
};

export { psycSaleContractConfig };
