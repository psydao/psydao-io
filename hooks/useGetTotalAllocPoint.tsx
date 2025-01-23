import { env } from "@/config/env.mjs";
import { useReadContract } from "wagmi";
import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json";
import { Address } from "viem";

const useGetTotalAllocPoint = () => {
  const { data, isLoading } = useReadContract({
    address: env.NEXT_PUBLIC_FREEBASE_CONTRACT_ADDRESS as Address,
    abi: psydaoMasterBaseAbi,
    functionName: "totalAllocPoint"
  });

  return { data: data as number, isLoading };
};

export default useGetTotalAllocPoint;
