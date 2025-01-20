import { TokenPrices } from "@/hooks/useGetTokenPrice";
import { FreebaseApyDetails } from "@/lib/services/freebase";
import { formatEther, parseEther } from "viem";

interface ApyResult {
  apy: number;
  tvlUsd: number;
  yearlyRewardsUsd: number;
  lastUpdated: number;
}

async function getPoolApy(
  prices: TokenPrices,
  poolApyDetails: FreebaseApyDetails,
  multiplier: bigint
) {
  //   try {
  const { rewardToken, stakedToken } = prices;
  const { pool, globalStats } = poolApyDetails;

  const totalDeposited = formatEther(globalStats[0]?.totalDeposited ?? 0n);

  const BLOCKS_PER_YEAR = 2_629_800; // Approximate, adjust based on chain

  const poolRewardPerBlock =
    (parseFloat(globalStats[0]?.rewardPerBlock ?? "0") *
      parseFloat(pool.allocPoint)) /
    parseFloat(globalStats[0]?.totalAllocPoint ?? "0");
  const yearlyRewards =
    poolRewardPerBlock * parseInt(multiplier.toString()) * BLOCKS_PER_YEAR;

  console.log(totalDeposited, poolRewardPerBlock, multiplier, yearlyRewards);

  // const yearlyRewardsUsd = yearlyRewards * rewardToken.price;
  // const tvlUsd = parseFloat(totalDeposited.toString()) * stakedToken.price;

  // console.log({
  //   yearlyRewardsUsd,
  //   tvlUsd,
  //   poolRewardPerBlock,
  //   yearlyRewards
  // });

  // // Avoid division by zero
  // if (tvlUsd === 0) {
  //   return {
  //     apy: 0,
  //     tvlUsd: 0,
  //     yearlyRewardsUsd: yearlyRewardsUsd,
  //     lastUpdated: Date.now()
  //   };
  // }

  // const apy = (yearlyRewardsUsd / tvlUsd) * 100;

  // return {
  //   apy,
  //   tvlUsd,
  //   yearlyRewardsUsd,
  //   lastUpdated: Date.now()
  // };
  //   } catch (error) {
  //     console.error("Error calculating APY:", error);
  //     return {
  //       apy: 0,
  //       tvlUsd: 0,
  //       yearlyRewardsUsd: 0,
  //       lastUpdated: 0
  //     };
  //   }
}

export default getPoolApy;
