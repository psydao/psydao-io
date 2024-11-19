import { useReadContract } from "wagmi";
import psyClaimsAbi from "@/abis/psyClaimsAbi.json";
import { psyClaimsMainnet, psyClaimsSepolia } from "@/constants/contracts";
import { env } from "@/config/env.mjs";

export const useNextBatchId = () => {
  const { data, isSuccess, refetch, error } = useReadContract({
    address: env.NEXT_PUBLIC_IS_MAINNET ? psyClaimsMainnet : psyClaimsSepolia,
    abi: psyClaimsAbi,
    functionName: "nextBatchId"
  });

  return { nextBatchId: data as bigint, isSuccess, refetch, error };
};
