import { useReadContract } from "wagmi";
import { chainLinkMainnet, chainLinkSepolia } from "constants/contracts";
import chainLinkAbi from "@/abis/chainLinkAbi.json";
import chainLinkAbiSepolia from "@/abis/chainLinkAbiSepolia.json";

export const useReadEthPrice = () => {
  const { data, isPending, error }: any = useReadContract({
    abi:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
        ? chainLinkAbi
        : chainLinkAbiSepolia,
    address:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
        ? chainLinkMainnet
        : chainLinkSepolia,
    functionName: "latestRoundData"
  });

  return {
    data: data && Number(data[1]),
    isPending,
    error
  };
};
