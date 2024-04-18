import { useReadContract } from "wagmi";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "constants/contracts";

export const useReadTokenPriceInDollar = () => {
  const { data, isPending, error } = useReadContract({
    abi:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
        ? tokenSaleAbi
        : tokenSaleAbiSepolia,
    address:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
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
