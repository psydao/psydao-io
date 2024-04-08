import { useReadContract } from "wagmi";
import tokenSaleAbi from "../../abis/tokenSaleAbi.json";
import { tokenSaleContract } from "constants/contracts";

export const useReadTokenPriceInDollar = () => {
  const { data, isPending, error } = useReadContract({
    abi: tokenSaleAbi,
    address: tokenSaleContract,
    functionName: "tokenPriceInDollar",
  });

  return {
    data,
    isPending,
    error,
  };
};
