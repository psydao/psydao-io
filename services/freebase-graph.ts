import { gql } from "@apollo/client";

export const getFreebasePools = gql`
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
`;

export const getFreebasePoolAllocPoints = gql`
  query GetFreebasePoolAllocPoints {
    pools {
      id
      allocPoint
    }
  }
`;

export const getFreebasePool = gql`
  query GetFreebasePool($id: ID!) {
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
`;

export const getFreebaseTokens = gql`
  query GetFreebaseTokens {
    freebaseTokens {
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
`;

export const getFreebaseDepositTokens = gql`
  query GetFreebaseDepositTokens($isDepositToken: Boolean!) {
    freebaseTokens(where: { isDepositToken: $isDepositToken }) {
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
`;

export const getFreebaseRewardTokens = gql`
  query GetFreebaseRewardTokens($isRewardToken: Boolean!) {
    freebaseTokens(where: { isRewardToken: $isRewardToken }) {
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
`;

export const getActiveFreebaseRewardTokens = gql`
  query GetActiveFreebaseRewardTokens {
    freebaseTokens(where: { isActiveRewardToken: true }) {
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
`;

export const getFreebaseGlobalStats = gql`
  query GetGlobalStats {
    globalStats {
      id
      dailyVolume
      activeRewardTokens
      totalUsers
      totalValueLocked
      totalPools
      totalDeposited
      totalRewardsToppedUp
      totalRewardsWithdrawn
      totalUnclaimedRewards
      totalRewardsDistributed
      totalAllocPoint
      startBlock
      rewardPerBlock
      bonusMultiplier
      bonusEndBlock
      weeklyVolume
    }
  }
`;

/**
 * Get the user's position in a pool with their deposit and withdraw history
 */
export const getFreebaseUserPoolPosition = gql`
  query GetUserPoolPosition($positionId: ID!) {
    userPosition(id: $positionId) {
      id
      amount # Current amount still in pool
      rewardDebt # Amount of rewards owed to the user
      lastAction # Last action taken by the user
      pool {
        id
        token {
          symbol
          decimals
        }
      }
      depositHistory {
        id
        amount
        block
        timestamp
        transaction
      }
      withdrawHistory {
        id
        amount
        block
        timestamp
        transaction
        emergency # If you want to distinguish emergency withdrawals
      }
    }
  }
`;

export const getFreebaseUserPoolsPositions = gql`
  query GetUserPositions($userId: ID!) {
    user(id: $userId) {
      positions {
        id
        pool {
          id
          token {
            symbol
            decimals
          }
        }
        amount
        depositHistory {
          id
          amount
          block
          timestamp
          transaction
        }
        withdrawHistory {
          id
          amount
          block
          timestamp
          transaction
          emergency
        }
      }
    }
  }
`;

export const getApyDetails = gql`
  query GetApyDetails($poolId: ID!) {
    pool(id: $poolId) {
      id
      allocPoint
      token {
        id
        symbol
        decimals
      }
    }
    globalStats {
      id
      rewardPerBlock
      totalAllocPoint
      totalDeposited
      bonusMultiplier
    }
  }
`;
