import psycSaleAbi from "../abis/psycSaleAbi.json";
import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleMainnet, psycSaleSepolia } from "../constants/contracts";
import { type AbiItem } from "web3-utils";

const psycSaleContractConfig = {
  address:
    process.env.NEXT_PUBLIC_CHAIN_ID === "1"
      ? (psycSaleMainnet as `0x${string}`)
      : (psycSaleSepolia as `0x${string}`),
  abi:
    process.env.NEXT_PUBLIC_CHAIN_ID === "1"
      ? (psycSaleAbi as AbiItem[])
      : (psycSaleAbiSepolia as AbiItem[])
};

export { psycSaleContractConfig };
