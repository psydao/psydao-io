import { useBlockNumber } from "wagmi";
import { useTokenPrices } from "@/hooks/useGetTokenPrice";
import { useFreebasePoolApyDetails } from "@/lib/services/freebase";
import useGetMultiplier from "./useGetMultiplier";
import getPoolApy from "@/utils/calculateApy";
import { useEffect, useState } from "react";

type ApyDetails =
  | {
      apy: number;
      tvlUsd: number;
      yearlyRewardsUsd: number;
      lastUpdated: number;
    }
  | undefined;

const useGetApyDetails = (poolId: string) => {
  const [apy, setApy] = useState<ApyDetails>({
    apy: 0,
    tvlUsd: 0,
    yearlyRewardsUsd: 0,
    lastUpdated: 0
  });
  const { data: prices } = useTokenPrices(poolId);
  const { data: poolApyDetails, error } = useFreebasePoolApyDetails(poolId);
  const { data: currentBlock } = useBlockNumber();

  const multiplier = useGetMultiplier(
    currentBlock?.toString() ?? "0",
    ((currentBlock ?? 0n) + 1n).toString() ?? "0"
  );

  useEffect(() => {
    const fetchApy = async () => {
      if (!prices || !poolApyDetails || !multiplier) return;
      const calculatedApy = await getPoolApy(
        prices,
        poolApyDetails,
        multiplier
      );

      setApy(calculatedApy);
    };

    fetchApy();
  }, [prices, poolApyDetails, multiplier]);

  return {
    apy
  };
};

export default useGetApyDetails;
