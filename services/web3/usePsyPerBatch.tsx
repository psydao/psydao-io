import { useReadContract } from "wagmi";
import psyClaimsAbi from "@/abis/psyClaimsAbi.json";
import { psyClaimsMainnet, psyClaimsSepolia } from "@/constants/contracts";
import { env } from "@/config/env.mjs";

export const usePsyPerBatch = () => {
  const { data, isError, isLoading, isFetched } = useReadContract({
    abi: psyClaimsAbi,
    address: env.NEXT_PUBLIC_IS_MAINNET ? psyClaimsMainnet : psyClaimsSepolia,
    functionName: "psyPerBatch"
  });

  return {
    data,
    isError,
    isLoading,
    isFetched
  };
};
