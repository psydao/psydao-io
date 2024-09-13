import { useReadContract } from "wagmi";
import { chainLinkMainnet, chainLinkSepolia } from "@/constants/contracts";
import chainLinkAbi from "@/abis/chainLinkAbi.json";
import chainLinkAbiSepolia from "@/abis/chainLinkAbiSepolia.json";
import { env } from "@/config/env.mjs";

export const useReadEthPrice = () => {
  const { data, isPending, error }: any = useReadContract({
    abi: env.NEXT_PUBLIC_IS_MAINNET ? chainLinkAbi : chainLinkAbiSepolia,
    address: env.NEXT_PUBLIC_IS_MAINNET ? chainLinkMainnet : chainLinkSepolia,
    functionName: "latestRoundData"
  });

  return {
    data: data && Number(data[1]),
    isPending,
    error
  };
};
