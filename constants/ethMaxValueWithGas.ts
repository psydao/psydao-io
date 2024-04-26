import { parseEther } from "viem";

export const defaultGasEstimate = parseEther("0.0045");

export const maxGasUsage = 100000; // Max gas usage seen on Etherscan was ~85k
