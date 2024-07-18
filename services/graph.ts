import { gql } from "@apollo/client";

export const getTokensOnSale = gql`
  query GetAllTokensOnSale {
    tokenOnSales {
      tokenID
      id
      price
      sale {
        batchID
        blockNumber
        ceilingPrice
        floorPrice
        id
      }
    }
  }
`;

export const getAllSalesWithTokens = gql`
  query GetAllSalesWithTokens {
    sales(orderBy: batchID) {
      batchID
      blockNumber
      ceilingPrice
      floorPrice
      ipfsHash
      id
      tokensOnSale {
        id
        tokenID
      }
    }
  }
`;

export const getSaleById = gql`
  query GetSaleById($id: Bytes!) {
    sale(id: $id) {
      batchID
      blockNumber
      blockTimestamp
      ceilingPrice
      floorPrice
      ipfsHash
      saleStartTime
      tokensOnSale {
        blockNumber
        id
        price
        tokenID
      }
    }
  }
`;

export const getTokenById = gql`
  query GetTokenOnSaleById($id: Bytes!) {
    tokenOnSale(id: $id) {
      batchID
      blockNumber
      buyer
      id
      price
    }
  }
`;

export const getTokensByOwner = gql`
  query GetTokensByOwner($owner: String!) {
    tokens(where: { owner: $owner }) {
      owner
      tokenId
      tokenAddress
      uri
    }
  }
`;
