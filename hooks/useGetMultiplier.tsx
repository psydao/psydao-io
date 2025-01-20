import { env } from "@/config/env.mjs";
import { useReadContract } from "wagmi";

import psydaoMasterBaseAbi from "@/abis/PsyDAOMasterBase.json";
import { Address } from "viem";

const useGetMultiplier = (from: string, to: string) => {
  const FREEBASE_ADDRESS = env.NEXT_PUBLIC_FREEBASE_CONTRACT_ADDRESS as Address;
  const FREEBASE_ABI = psydaoMasterBaseAbi;
  const { data } = useReadContract({
    address: FREEBASE_ADDRESS,
    abi: FREEBASE_ABI,
    functionName: "getMultiplier",
    args: [from, to]
  });

  return data as bigint;
};

export default useGetMultiplier;
