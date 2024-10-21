import { useReadContract } from "wagmi";
import psyClaimsAbi from "@/abis/psyClaimsAbi.json";
import { psyClaimsSepolia } from "@/constants/contracts";

export const usePsyPerBatch = () => {
  const { data, isError, isLoading, isFetched } = useReadContract({
    abi: psyClaimsAbi,
    address: psyClaimsSepolia,
    functionName: "psyPerBatch"
  });

  return {
    data,
    isError,
    isLoading,
    isFetched
  };
};
