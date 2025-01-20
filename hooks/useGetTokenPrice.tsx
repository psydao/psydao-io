import { useQuery } from "@tanstack/react-query";
import {
  useFreebaseActiveRewardToken,
  useLiquidityPool
} from "@/lib/services/freebase";

export interface TokenPriceResponse {
  getTokenPrices: {
    address: string;
    confidence: number;
    networkId: number;
    priceUsd: number;
    poolAddress: string;
    timestamp: number;
  }[];
}

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

export function useTokenPrices(poolId: string) {
  const { data: activeRewardToken } = useFreebaseActiveRewardToken();
  const { data: pool } = useLiquidityPool(poolId);

  const currentActiveRewardToken = activeRewardToken?.freebaseTokens[0];
  const currentPoolToken = pool?.pool.token;

  async function fetchTokenPrices(): Promise<TokenPrices> {
    if (!currentActiveRewardToken?.id || !currentPoolToken?.id) {
      console.error("Token addresses not configured");
      return {
        rewardToken: {
          price: 0,
          symbol: currentActiveRewardToken?.symbol ?? ""
        },
        stakedToken: { price: 0, symbol: currentPoolToken?.symbol ?? "" }
      };
    }

    try {
      const response = await fetch("/api/defined", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addresses: [currentActiveRewardToken.id, currentPoolToken.id]
        })
      });

      const { getTokenPrices } = (await response.json()) as TokenPriceResponse;

      if (!getTokenPrices?.length) {
        console.error("No price data available");
        return {
          rewardToken: { price: 0, symbol: currentActiveRewardToken.symbol },
          stakedToken: { price: 0, symbol: currentPoolToken.symbol }
        };
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
        stakedToken: priceMap[currentPoolToken.id.toLowerCase()] ?? {
          price: 0,
          symbol: currentPoolToken?.symbol ?? ""
        },
        rewardToken: priceMap[currentActiveRewardToken.id.toLowerCase()] ?? {
          price: 0,
          symbol: currentActiveRewardToken?.symbol ?? ""
        }
      };
    } catch (error) {
      console.error("Error fetching token prices:", error);
      return {
        stakedToken: { price: 0, symbol: currentPoolToken?.symbol ?? "" },
        rewardToken: {
          price: 0,
          symbol: currentActiveRewardToken?.symbol ?? ""
        }
      };
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
