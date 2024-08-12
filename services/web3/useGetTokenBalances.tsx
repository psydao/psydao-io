import { useAccount, useReadContract } from "wagmi";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import { useEffect, useMemo } from "react";

const useGetTokenBalances = (refetchNeeded: boolean) => {
  const { address } = useAccount();
  //   const [userBalance, setUserBalance] = useState(0);
  const { data, isLoading, isError, refetch } = useReadContract({
    abi:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
        ? tokenSaleAbi
        : tokenSaleAbiSepolia,
    address:
      process.env.NEXT_PUBLIC_CHAIN_ID === "1"
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
