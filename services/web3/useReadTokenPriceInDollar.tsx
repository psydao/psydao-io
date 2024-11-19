import { useReadContract } from "wagmi";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import { env } from "@/config/env.mjs";

export const useReadTokenPriceInDollar = () => {
  const { data, isPending, error } = useReadContract({
    abi: env.NEXT_PUBLIC_IS_MAINNET ? tokenSaleAbi : tokenSaleAbiSepolia,
    address: env.NEXT_PUBLIC_IS_MAINNET
      ? tokenSaleContract
      : tokenSaleContractSepolia,
    functionName: "tokenPriceInDollar"
  });

  return {
    data,
    isPending,
    error
  };
};
