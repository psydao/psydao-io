import { gql } from "@apollo/client";

export const getFreebasePools = gql`
  query GetFreebasePools {
    pools {
      id
      token {
        id,
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
        id,
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
