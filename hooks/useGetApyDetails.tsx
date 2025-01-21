import { useBlockNumber } from "wagmi";
import { useTokenPrices } from "@/hooks/useGetTokenPrice";
import { useFreebaseApyDetails } from "@/lib/services/freebase";
import useGetMultiplier from "./useGetMultiplier";
import getPoolApy from "@/utils/calculateApy";
import { useEffect, useState } from "react";
import useGetTotalAllocPoint from "./useGetTotalAllocPoint";

type ApyDetails =
  | {
      apy: number;
      tvlUsd: number;
      yearlyRewardsUsd: number;
      lastUpdated: number;
    }
  | undefined;
/**
 * Hook to fetch and calculate APY details for a specific pool
 * @param poolId - The ID of the pool to get APY details for
 * @returns {Object} An object containing:
 *   - apy: APY details object with:
 *     - apy: The calculated APY percentage
 *     - tvlUsd: Total value locked in USD
 *     - yearlyRewardsUsd: Yearly rewards in USD
 *     - lastUpdated: Timestamp of last update
 */

const useGetApyDetails = (poolId: string) => {
  const [apy, setApy] = useState<ApyDetails>({
    apy: 0,
    tvlUsd: 0,
    yearlyRewardsUsd: 0,
    lastUpdated: 0
  });
  const { data: prices } = useTokenPrices(poolId);
  const { data: apyDetails } = useFreebaseApyDetails(poolId);
  const { data: currentBlock } = useBlockNumber();
  const { data: totalAllocPoint } = useGetTotalAllocPoint();

  const multiplier = useGetMultiplier(
    currentBlock?.toString() ?? "0",
    ((currentBlock ?? 0n) + 1n).toString() ?? "0"
  );

  useEffect(() => {
    const fetchApy = async () => {
      if (
        !prices ||
        !apyDetails ||
        !multiplier ||
        !totalAllocPoint ||
        !currentBlock
      ) {
        console.error("Missing required data for APY calculation");
        return;
      }
      const calculatedApy = await getPoolApy(
        prices,
        apyDetails,
        multiplier,
        totalAllocPoint
      );

      setApy(calculatedApy);
    };

    fetchApy();
  }, [prices, apyDetails, multiplier, totalAllocPoint, currentBlock]);

  return {
    apy
  };
};

export default useGetApyDetails;
