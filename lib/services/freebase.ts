import { freebaseGraphClient } from "@/config/apolloClients";
import {
  getFreebasePool,
  getFreebasePools,
  getFreebaseTokens,
  getFreebaseRewardTokens,
  getFreebaseDepositTokens
} from "@/services/freebase-graph";
import { useQuery } from "@apollo/client"
import { Address } from "viem"

export interface FreebaseToken {
  id: Address
  name: string
  decimals: number
  isActiveRewardToken: boolean
  isDepositToken: boolean
  isRewardToken: boolean
  lastPriceUpdate: string
  price: string
  symbol: string
  totalDeposited: string
}

interface FreebasePool {
  id: string
  token: FreebaseToken
  allocPoint: string
  lastRewardBlock: string
  accRewardPerShare: string
  userCount: number
  depositCount: number
  withdrawCount: number
}

interface FreebasePoolsResponse {
  pools: FreebasePool[]
}

export function useLiquidityPools() {
  return useQuery<FreebasePoolsResponse>(getFreebasePools, {
    client: freebaseGraphClient
  })
}

export function useLiquidityPool(id: string) {
  return useQuery<{ pool: FreebasePool }>(getFreebasePool, {
    variables: { id },
    client: freebaseGraphClient
  })
}

export function useFreebaseTokens() {
  return useQuery<{ tokens: FreebaseToken[] }>(getFreebaseTokens, {
    client: freebaseGraphClient
  })
}

export function useFreebaseDepositTokens() {
  return useQuery<{ tokens: FreebaseToken[] }>(getFreebaseDepositTokens, {
    variables: {
      isDepositToken: true
    },
    client: freebaseGraphClient
  })
}

export function useFreebaseRewardTokens() {
  return useQuery<{ tokens: FreebaseToken[] }>(getFreebaseRewardTokens, {
    variables: {
      isRewardToken: true
    },
    client: freebaseGraphClient
  })
}