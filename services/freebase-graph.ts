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

export const getFreebasePool = gql`
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
`;

export const getFreebaseTokens = gql`
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
`;

export const getFreebaseRewardTokens = gql`
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
`;
