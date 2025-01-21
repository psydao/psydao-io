import { BLOCKS_PER_YEAR, DEFAULT_APY_RESULT } from "@/constants/apy";
import { TokenPrices } from "@/hooks/useGetTokenPrice";
import { FreebaseApyDetails } from "@/lib/services/freebase";
import { formatEther, parseEther } from "viem";

/**
 * Calculates APY for a staking pool
 * @param prices Token prices for reward and staked tokens
 * @param apyDetails Pool details and global stats from Freebase
 * @param multiplier Block reward multiplier (read from contract)
 * @param totalAllocPoint Total allocated points for all pools (read from contract)
 * @returns APY calculation result
 */

async function getPoolApy(
  prices: TokenPrices | undefined,
  apyDetails: FreebaseApyDetails | undefined,
  multiplier: bigint | undefined,
  totalAllocPoint: number | undefined
) {
  try {
    if (!prices || !apyDetails || !multiplier || !totalAllocPoint) {
      console.error("Missing required data for APY calculation");
      return DEFAULT_APY_RESULT;
    }
    const { rewardToken, stakedToken } = prices;
    const { pool, globalStats } = apyDetails;

    const totalDeposited = formatEther(globalStats[0]?.totalDeposited ?? 0n);

    const rewardPerBlock = parseFloat(
      formatEther(globalStats[0]?.rewardPerBlock ?? 0n)
    );
    const allocatedPoints = parseFloat(pool.allocPoint.toString());

    const poolRewardPerBlock =
      (rewardPerBlock * allocatedPoints) /
      parseFloat(totalAllocPoint.toString());

    const yearlyRewards =
      poolRewardPerBlock * parseInt(multiplier.toString()) * BLOCKS_PER_YEAR;

    const yearlyRewardsUsd = yearlyRewards * rewardToken.price;
    const tvlUsd = parseFloat(totalDeposited.toString()) * stakedToken.price;

    // Avoid division by zero
    if (tvlUsd === 0) {
      return DEFAULT_APY_RESULT;
    }

    const apy = parseFloat(((yearlyRewardsUsd / tvlUsd) * 100).toFixed(2));

    return {
      apy,
      tvlUsd,
      yearlyRewardsUsd,
      lastUpdated: Date.now()
    };
  } catch (error) {
    console.error("Error calculating APY:", error);
    return DEFAULT_APY_RESULT;
  }
}

export default getPoolApy;
