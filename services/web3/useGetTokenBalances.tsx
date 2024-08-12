import { useAccount, useReadContract } from "wagmi";
import tokenSaleAbi from "@/abis/tokenSaleAbi.json";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";
import {
  tokenSaleContract,
  tokenSaleContractSepolia
} from "@/constants/contracts";
import { useEffect, useState } from "react";

const useGetTokenBalances = () => {
  const { address } = useAccount();
  const [userBalance, setUserBalance] = useState(0);
  const { data, isLoading, isError } = useReadContract({
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

  useEffect(() => {
    if (data) {
      setUserBalance(data as number);
    }
    if (data === 0n) {
      setUserBalance(0);
    }
    console.log("yeet", data, data === 0n);
  }, [data, setUserBalance]);

  return {
    userBalance,
    isLoading,
    isError
  };
};

export default useGetTokenBalances;
