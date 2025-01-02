# Freebase Module

A React module for managing "liquidity pools" and rewards in a the Freebase project. Built with Next.js, TypeScript, and Wagmi v2.

## Overview

The Freebase module provides both user-facing and administrative interfaces for interacting with liquidity pools. It includes functionality for:

- Depositing and withdrawing tokens from pools
- Managing reward tokens and distributions
- Configuring pool allocation points
- Claiming rewards
- Viewing pool statistics

## Key Operations

### Reward Token Management

1. Adding a Reward Token
```typescript
const { addRewardToken } = useRewardTokenManagement()

// First, add the reward token to the approved list
addRewardToken({ 
  rewardToken: "0x...", // token address
  transferAmount: BigInt("1000000000000000000") // amount to transfer
})
```

2. Setting Active Reward Token
```typescript
const { setRewardToken } = useRewardTokenManagement()

// After adding, set it as the active reward token
setRewardToken({ 
  rewardToken: "0x..." // same token address
})
```

### Pool Management

1. Adding Deposit Tokens
```typescript
const { addDepositToken } = useAddDepositToken()

addDepositToken({
  allocPoint: BigInt("100"),
  token: "0x...", // token address
  withUpdate: true
})
```

2. Updating Reward Configuration
```typescript
const { updateRewardPerBlock, setAllocationPoint } = useUpdateRewardConfig()

// Update rewards per block
updateRewardPerBlock({
  rewardPerBlock: BigInt("1000000000000000000")
})

// Set allocation points for a pool
setAllocationPoint({
  pid: BigInt("0"),
  allocPoint: BigInt("100"),
  withUpdate: true
})
```

## Architecture

### Core Components

- `UserDashboard` (`index.tsx`) - Main user interface for pool interactions
- `AdminFreebaseComponent` - Administrative interface for pool management
- `PoolCard` - Individual pool display and interaction component

### Hooks

#### User Hooks (`useFreebaseUser.tsx`)
- `usePoolInteraction` - Handles deposits and withdrawals
- `usePoolData` - Fetches pool information
- `useRewards` - Manages reward claiming
- `usePendingRewards` - Tracks pending rewards
- `useRewardTokens` - Fetches reward token information

#### Admin Hooks (`useFreebaseAdmin.tsx`)
- `useAddDepositToken` - Adds new deposit tokens
- `useRewardTokenManagement` - Manages reward tokens
- `useUpdateRewardConfig` - Updates reward configurations

### Services

#### GraphQL Services (`freebase.ts`)
- Pool and token data fetching
- Real-time updates via Apollo Client
- Type-safe GraphQL queries

## Key Features

### User Features
- View available pools
- Deposit/withdraw tokens
- Track rewards
- Claim rewards
- View pool statistics

### Admin Features
- Add deposit tokens
- Manage reward tokens
- Configure reward rates
- Set allocation points
- View token lists

## GraphQL Integration

### Queries

The module uses the following GraphQL queries to fetch data:

1. Pools Query
```graphql
query GetFreebasePools {
  pools {
    id
    token {
      id
      name
      decimals
      isActiveRewardToken
      isDepositToken
      isRewardToken
      lastPriceUpdate
      price
      symbol
      totalDeposited
    }
    allocPoint
    lastRewardBlock
    accRewardPerShare
    userCount
    depositCount
    withdrawCount
  }
}
```

2. Single Pool Query
```graphql
query GetFreebasPool($id: ID!) {
  pool(id: $id) {
    id
    token {
      id
      name
      decimals
      isActiveRewardToken
      isDepositToken
      isRewardToken
      lastPriceUpdate
      price
      symbol
      totalDeposited
    }
    allocPoint
    lastRewardBlock
    accRewardPerShare
    userCount
    depositCount
    withdrawCount
  }
}
```

3. Tokens Query
```graphql
query GetFreebaseTokens {
  tokens {
    id
    name
    decimals
    isActiveRewardToken
    isDepositToken
    isRewardToken
    lastPriceUpdate
    price
    symbol
    totalDeposited
  }
}
```

4. Reward Tokens Query
```graphql
query GetFreebaseRewardTokens($isRewardToken: Boolean!) {
  tokens(where: { isRewardToken: $isRewardToken }) {
    id
    name
    decimals
    isActiveRewardToken
    isDepositToken
    isRewardToken
    lastPriceUpdate
    price
    symbol
    totalDeposited
  }
}
```

### Data Types

```typescript
interface FreebaseToken {
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
```

### Service Hooks

The module provides React hooks for data fetching:

```typescript
// Fetch all liquidity pools
const { data: poolsData } = useLiquidityPools()

// Fetch single pool by ID
const { data: poolData } = useLiquidityPool(id)

// Fetch all tokens
const { data: tokensData } = useFreebaseTokens()

// Fetch reward tokens
const { data: rewardTokens } = useFreebaseRewardTokens()
```

### GraphQL Client Configuration

The module uses a dedicated Apollo Client for Freebase queries:

```typescript
import { freebaseGraphClient } from "@/config/apolloClients"

export function useLiquidityPools() {
  return useQuery<FreebasePoolsResponse>(getFreebasePools, {
    client: freebaseGraphClient
  })
}
```

### Real-time Updates

The GraphQL integration provides real-time updates for:
- Pool statistics (deposits, withdrawals, user count)
- Token prices and total deposits
- Reward token status
- Allocation points and reward rates

## Technical Details

### Dependencies
- Next.js 14
- TypeScript
- Wagmi v2
- Viem
- Apollo Client
- Chakra UI

### State Management
- React hooks for local state
- Apollo Client for GraphQL data
- Wagmi for blockchain interactions

### Error Handling
- Comprehensive error states
- User-friendly error messages
- Transaction status tracking

## Usage

### User Interface
```tsx
import { UserDashboard } from '@/components/freebase'
function App() {
  return <UserDashboard />
}
```

### Admin Interface
```tsx
import { AdminFreebaseComponent } from '@/components/freebase'
function AdminPanel() {
  return <AdminFreebaseComponent />
}
```

## Best Practices

1. Always handle loading and error states
2. Validate inputs before sending transactions
3. Use proper type safety with TypeScript
4. Implement proper error boundaries
5. Follow responsive design patterns
6. Use proper state management patterns

## Contributing

When contributing to this module:

1. Follow the existing code structure
2. Maintain type safety
3. Add proper documentation
4. Test all changes thoroughly
5. Follow the established styling patterns