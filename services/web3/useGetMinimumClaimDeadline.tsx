import { useReadContract } from "wagmi";
import psyClaimsAbi from "@/abis/psyClaimsAbi.json";
import { psyClaimsMainnet, psyClaimsSepolia } from "@/constants/contracts";
import { env } from "process";

export const useGetMinimumClaimDeadline = () => {
    const { data, isSuccess, refetch, error } = useReadContract({
        address: env.NEXT_PUBLIC_IS_MAINNET
        ? psyClaimsMainnet
        : psyClaimsSepolia,
      abi: psyClaimsAbi,
      functionName: "minimumClaimDeadline",
    });
  
    return { minimumClaimDeadline: data as boolean, isSuccess, refetch, error };
  };
