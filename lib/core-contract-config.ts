import coreAbi from "../abis/coreAbi.json";
import coreAbiSepolia from "../abis/coreAbiSepolia.json";
import { CoreMainnet, CoreSepolia } from "../constants/contracts";
const coreContractConfig = {
  address:
    process.env.NEXT_PUBLIC_CHAIN_ID === "1"
      ? (CoreMainnet as `0x${string}`)
      : (CoreSepolia as `0x${string}`),
  abi: process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? coreAbi : coreAbiSepolia
};

export { coreContractConfig };
