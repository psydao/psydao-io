import { useReadContract } from "wagmi";
import chainLinkAbi from "../../abis/chainLinkAbi.json";
import { chainLinkMainnet, chainLinkSepolia } from "constants/contracts";

export const useReadEthPrice = () => {
  const { data, isPending, error }: any = useReadContract({
    abi: chainLinkAbi,
    address:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
        ? chainLinkMainnet
        : chainLinkSepolia,
    functionName: "latestRoundData",
  });

  return {
    data: data && Number(data[1]),
    isPending,
    error,
  };
};
