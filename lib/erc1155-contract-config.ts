import { env } from "@/config/env.mjs";
import ERC1155Abi from "../abis/ERC1155Abi.json";
import ERC1155AbiSepolia from "../abis/ERC115AbiSepolia.json";
import { ERC1155Mainnet, ERC1155Sepolia } from "../constants/contracts";
import type { Address } from "viem";
const erc1155sContractConfig = {
  address: env.NEXT_PUBLIC_IS_MAINNET
    ? (ERC1155Mainnet as Address)
    : (ERC1155Sepolia as Address),
  abi: env.NEXT_PUBLIC_IS_MAINNET ? ERC1155Abi : ERC1155AbiSepolia
};

export { erc1155sContractConfig };
