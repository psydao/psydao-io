import { graphClient } from "@/config/apolloClients";
import {
  getFreebasePool,
  getFreebasePools,
  getFreebaseTokens,
  getFreebaseRewardTokens,
  getFreebaseDepositTokens,
  getFreebaseGlobalStats,
  getFreebaseUserPoolPosition,
  getFreebaseUserPoolsPositions,
  getActiveFreebaseRewardTokens,
  getApyDetails
} from "@/services/freebase-graph";
import { useQuery } from "@apollo/client";
import { Address } from "viem";

// #region Interfaces

interface BaseHistoryEntry {
  id: string; // tx hash + "-" + log index
  amount: string; // BigInt
  block: string; // BigInt
  timestamp: string; // BigInt
  transaction: string; // Bytes
}

interface DepositHistoryEntry extends BaseHistoryEntry {}

interface WithdrawHistoryEntry extends BaseHistoryEntry {
  emergency: boolean;
}

export interface FreebaseToken {
  id: Address;
  name: string;
  symbol: string;
  decimals: number;
  isActiveRewardToken: boolean;
  isDepositToken: boolean;
  isRewardToken: boolean;
  totalDeposited: bigint;
  price: string; // BigDecimal
  lastPriceUpdate: string; // BigInt
}

export interface FreebasePool {
  id: string;
  token: FreebaseToken;
  allocPoint: string;
  lastRewardBlock: string;
  totalDeposited: bigint;
  accRewardPerShare: string;
  userCount: number;
  depositCount: number;
  withdrawCount: number;
}

export interface LimitedFreebasePool {
  id: string;
  token: {
    symbol: string;
    decimals: number;
  };
}

interface FreebasePoolsResponse {
  pools: FreebasePool[];
}

interface FreebaseGlobalStats {
  id: string;
  dailyVolume: string;
  activeRewardTokens: string;
  totalUsers: string;
  totalValueLocked: string;
  totalPools: string;
  totalDeposited: string;
  totalRewardsToppedUp: string;
  totalRewardsWithdrawn: string;
  totalUnclaimedRewards: string;
  totalRewardsDistributed: string;
  totalAllocPoint: string;
  startBlock: string;
  rewardPerBlock: string;
  weeklyVolume: string;

  bonusMultiplier: string;
  bonusEndBlock: string;
}

interface FreebaseUserPoolPositionResponse {
  user: {
    positions: FreebaseUserPoolPosition[];
  };
}
export interface FreebaseUserPoolPosition {
  id: string;
  pool: LimitedFreebasePool;
  amount: bigint;
  depositHistory: DepositHistoryEntry[];
  withdrawHistory: WithdrawHistoryEntry[];
}

export interface FreebaseApyDetails {
  pool: {
    id: string;
    allocPoint: bigint;
    totalDeposited: bigint;
    token: {
      id: string;
      symbol: string;
      decimals: number;
    };
  };
  globalStats: {
    id: string;
    rewardPerBlock: bigint;
    totalDeposited: bigint;
    bonusMultiplier: bigint;
  }[];
}

// #endregion

export function useLiquidityPools() {
  return useQuery<FreebasePoolsResponse>(getFreebasePools, {
    client: graphClient
  });
}

const POLL_INTERVAL = 10_000;
export function useLiquidityPool(id: string) {
  return useQuery<{ pool: FreebasePool }>(getFreebasePool, {
    variables: { id },
    client: graphClient
  });
}

export function useFreebaseTokens() {
  return useQuery<{ tokens: FreebaseToken[] }>(getFreebaseTokens, {
    client: graphClient
  });
}

export function useFreebaseDepositTokens() {
  return useQuery<{ freebaseTokens: FreebaseToken[] }>(
    getFreebaseDepositTokens,
    {
      variables: {
        isDepositToken: true
      },
      client: graphClient,
      pollInterval: POLL_INTERVAL
    }
  );
}

export function useFreebaseRewardTokens() {
  return useQuery<{ freebaseTokens: FreebaseToken[] }>(
    getFreebaseRewardTokens,
    {
      variables: {
        isRewardToken: true
      },
      client: graphClient,
      pollInterval: POLL_INTERVAL
    }
  );
}

export function useFreebaseActiveRewardToken() {
  return useQuery<{ freebaseTokens: FreebaseToken[] }>(
    getActiveFreebaseRewardTokens,
    {
      variables: {
        isActiveRewardToken: true
      },
      client: graphClient,
      pollInterval: POLL_INTERVAL
    }
  );
}

export function useFreebaseGlobalStats() {
  return useQuery<{ globalStats: FreebaseGlobalStats[] }>(
    getFreebaseGlobalStats,
    {
      client: graphClient,
      pollInterval: POLL_INTERVAL
    }
  );
}

export function useFreebaseUserPoolPosition(
  poolId: string,
  userAddress: Address
) {
  return useQuery<{ userPoolPosition: FreebaseUserPoolPosition }>(
    getFreebaseUserPoolPosition,
    {
      variables: { poolId, userId: userAddress },
      client: graphClient
    }
  );
}

export function useFreebaseUserPoolsPositions(userAddress: Address) {
  return useQuery<FreebaseUserPoolPositionResponse>(
    getFreebaseUserPoolsPositions,
    {
      variables: { userId: userAddress },
      client: graphClient,
      pollInterval: POLL_INTERVAL
    }
  );
}

export function useFreebaseApyDetails(poolId: string) {
  return useQuery<FreebaseApyDetails>(getApyDetails, {
    variables: { poolId },
    client: graphClient
  });
}
