import { useAccount, useReadContract } from "wagmi";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import { useEffect, useMemo } from "react";
import { env } from "@/config/env.mjs";

const useGetTokenBalances = (refetchNeeded: boolean) => {
  const { address } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    abi: env.NEXT_PUBLIC_IS_MAINNET ? tokenSaleAbi : tokenSaleAbiSepolia,
    address: env.NEXT_PUBLIC_IS_MAINNET
      ? tokenSaleContract
      : tokenSaleContractSepolia,
    functionName: "userBalances",
    args: [address ? address : "0x0000000000000000000000000000000000000000"]
  });

  const userBalance = useMemo(() => {
    if (data) {
      return data as number;
    }
    return 0;
  }, [data]);

  useEffect(() => {
    const refetchTokenbalances = async () => {
      if (refetchNeeded) {
        await refetch();
      }
    };
    refetchTokenbalances().catch(console.error);
  }, [refetchNeeded]);

  return {
    userBalance,
    isLoading,
    isError
  };
};

export default useGetTokenBalances;
