import { env } from "@/config/env.mjs";
import {
  psyTokenMainnet,
  psyTokenSepolia,
  psyClaimsMainnet,
  psyClaimsSepolia
} from "@/constants/contracts";
import { useAccount, useReadContract } from "wagmi";
import psyTokenAbi from "@/abis/psyTokenAbi.json";

const useGetAvailableAllowance = () => {
  const { address } = useAccount();
  //   Temp until I find out whether owner is curr address or claims contract owner
  const owner = address ?? "0x";
  const spender = env.NEXT_PUBLIC_IS_MAINNET
    ? psyClaimsMainnet
    : psyClaimsSepolia;
  const { data, isSuccess, refetch, error, isLoading, isFetching } =
    useReadContract({
      address: env.NEXT_PUBLIC_IS_MAINNET ? psyTokenMainnet : psyTokenSepolia,
      abi: psyTokenAbi,
      functionName: "allowance",
      args: [owner, spender]
    });

  return {
    allowance: data as bigint,
    loading: isLoading || isFetching,
    isSuccess,
    refetch,
    error
  };
};

export default useGetAvailableAllowance;
