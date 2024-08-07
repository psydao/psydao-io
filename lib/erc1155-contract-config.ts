import ERC1155Abi from "../abis/ERC1155Abi.json";
import ERC1155AbiSepolia from "../abis/ERC115AbiSepolia.json";
import { ERC1155Mainnet, ERC1155Sepolia } from "../constants/contracts";
const erc1155sContractConfig = {
  address:
    process.env.NEXT_PUBLIC_CHAIN_ID === "1"
      ? (ERC1155Mainnet as `0x${string}`)
      : (ERC1155Sepolia as `0x${string}`),
  abi: process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? ERC1155Abi : ERC1155AbiSepolia
};

export { erc1155sContractConfig };
