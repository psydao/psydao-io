import { useQuery } from "@tanstack/react-query";
import { codexSDK } from "@/services/defined";
import {
  useFreebaseActiveRewardToken,
  useLiquidityPool
} from "@/lib/services/freebase";
import { useMemo } from "react";

export interface TokenPrices {
  rewardToken: {
    price: number;
    symbol: string;
  };
  stakedToken: {
    price: number;
    symbol: string;
  };
}

const defaultPrices: TokenPrices = {
  rewardToken: { price: 0, symbol: "BIO" },
  stakedToken: { price: 0, symbol: "PSY" }
};

export function useTokenPrices(poolId: string) {
  const { data: activeRewardToken } = useFreebaseActiveRewardToken();
  const { data: pool } = useLiquidityPool(poolId);

  const currentActiveRewardToken = activeRewardToken?.freebaseTokens[0];
  const currentPoolToken = pool?.pool.token;

  async function fetchTokenPrices(): Promise<TokenPrices> {
    if (!currentActiveRewardToken?.id || !currentPoolToken?.id) {
      console.error("Token addresses not configured");
      return defaultPrices;
    }

    try {
      const { getTokenPrices } = await codexSDK.queries.getTokenPrices({
        inputs: [
          { address: currentActiveRewardToken.id, networkId: 1 },
          { address: currentPoolToken.id, networkId: 1 }
        ]
      });

      if (!getTokenPrices?.length) {
        console.error("No price data available");
        return defaultPrices;
      }

      const priceMap = getTokenPrices.reduce(
        (acc, token) => {
          if (!token?.address) return acc;
          return {
            ...acc,
            [token.address.toLowerCase()]: {
              price: token.priceUsd,
              symbol:
                token.address.toLowerCase() ===
                currentPoolToken.id.toLowerCase()
                  ? currentPoolToken.symbol
                  : currentActiveRewardToken.symbol
            }
          };
        },
        {} as Record<string, { price: number; symbol: string }>
      );

      return {
        stakedToken:
          priceMap[currentPoolToken.id.toLowerCase()] ??
          defaultPrices.stakedToken,
        rewardToken:
          priceMap[currentActiveRewardToken.id.toLowerCase()] ??
          defaultPrices.rewardToken
      };
    } catch (error) {
      console.error("Error fetching token prices:", error);
      return defaultPrices;
    }
  }

  return useQuery({
    queryKey: ["tokenPrices"],
    queryFn: fetchTokenPrices,
    enabled: Boolean(currentActiveRewardToken?.id && currentPoolToken?.id),
    refetchInterval: 60_000,
    retry: 3,
    staleTime: 60_000
  });
}
