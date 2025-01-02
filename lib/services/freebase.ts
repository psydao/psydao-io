import { freebaseGraphClient } from "@/config/apolloClients";
import { getFreebasePool, getFreebasePools } from "@/services/freebase-graph";
import { useQuery } from "@apollo/client"
import { Address } from "viem"

interface FreebaseToken {
  id: Address
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
