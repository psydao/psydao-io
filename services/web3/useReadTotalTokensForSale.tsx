import { useReadContract } from "wagmi";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import { env } from "@/config/env.mjs";
import { mainnetClient, sepoliaClient } from "@/constants/publicClient";
import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";

export const useReadTotalTokensForSale = () => {
  const client = env.NEXT_PUBLIC_IS_MAINNET ? mainnetClient : sepoliaClient;
  const { data, isPending, error } = useQuery({
    queryKey: ["totalTokensForSale"],
    queryFn: async () => {
      const data = await client.readContract({
        abi: env.NEXT_PUBLIC_IS_MAINNET ? tokenSaleAbi : tokenSaleAbiSepolia,
        address: env.NEXT_PUBLIC_IS_MAINNET
          ? tokenSaleContract
          : tokenSaleContractSepolia,
        functionName: "totalTokensForSale"
      });
      if (data) {
        return formatUnits(BigInt(data as number), 18);
      }
      return "0.00";
    },

    refetchInterval: 20000 // Refetch every 20 seconds
  });

  return {
    data,
    isPending,
    error
  };
};
