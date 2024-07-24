import { useReadContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";

const usePrivateSale = () => {
  const { data, isError, isLoading } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "privateSale",
    args: []
  });

  const isPrivateSale = Boolean(data);

  return { isPrivateSale, isError, isLoading };
};

export default usePrivateSale;
