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
    sales(orderBy: batchID, orderDirection: desc) {
      batchID
      blockNumber
      ceilingPrice
      floorPrice
      ipfsHash
      id
      tokensOnSale(orderBy: tokenID) {
        id
        tokenID
        buyer
        sale {
          id
          batchID
          blockNumber
          ceilingPrice
          floorPrice
          ipfsHash
        }
        metadata {
          name
          imageURI
          description
        }
      }
    }
  }
`;

export const getSaleById = gql`
  query GetSaleById($id: Bytes!) {
    sale(id: $id) {
      batchID
      blockNumber
      ceilingPrice
      floorPrice
      ipfsHash
      id
      tokensOnSale {
        id
        tokenID
        buyer
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

export const getTokensMetadataForASale = gql`
  query GetTokensMetadata($tokenIds: [String!]!) {
    tokens(
      where: { and: [{ tokenType_in: ["ERC721"] }, { tokenId_in: $tokenIds }] }
      orderBy: tokenId
      orderDirection: desc
    ) {
      id
      tokenId
      metadata {
        name
        imageURI
        description
      }
    }
  }
`;

export const getTokensByOwner = gql`
  query GetTokensByOwner($owner: String!) {
    tokens(where: { owner: $owner }, orderBy: tokenId, orderDirection: desc) {
      owner
      tokenId
      tokenAddress
      uri
    }
  }
`;

export const getTokensOwners = gql`
  query GetTokensOwners($ids: [ID!]!) {
    tokens(where: { id_in: $ids }) {
      id
      owner
    }
  }
`;

export const getUserCopyBalance = gql`
  query GetUserCopyBalance($id: ID!) {
    userCopyBalance(id: $id) {
      balance
      id
      originalTokenId
      user
    }
  }
`;

export const getBatchClaims = gql`
  query GetBatchClaims {
    batchClaims(orderBy: batchId) {
      id
      claims {
        account
        amount
      }
      batchId
      ipfsHash
      merkleRoot
      amount
      claimed
      deadline
    }
  }
`;

export const getProposals = gql`
  query Proposals($startTimeStamp: Int!, $endTimeStamp: Int!) {
    proposals(
      first: 1000
      skip: 0
      where: {
        space_in: ["psydao.eth"]
        state: "closed"
        created_gte: $startTimeStamp
        created_lte: $endTimeStamp
      }
      orderBy: "created"
      orderDirection: asc
    ) {
      id
      start
      end
      snapshot
    }
  }
`;

export const getVotesOnProposal = gql`
  query VotesForProposal($proposalId: String!) {
    votes(where: { proposal: $proposalId }) {
      id
      voter
      created
    }
  }
`;

// const mainnetNFTAddress = "0x6c6ab7b3215374de4a65de63eac9bc7a0c7f402d";

/**
 * Get the owners of the NFTs on the mainnet
 * The hardcoded address `0x6c6ab7b3215374de4a65de63eac9bc7a0c7f402d`
 * is the NFT contract address on mainnet
 */
export const getNFTHolders = gql`
  query NFTHolders($blockNumber: Int!) {
    tokens(
      where: {
        tokenAddress: "0x6c6ab7b3215374de4a65de63eac9bc7a0c7f402d"
        blockNumber_lte: $blockNumber
      }
      orderBy: tokenId
      orderDirection: asc
    ) {
      owner
    }
  }
`;

/**
 * Get the owners of the NFTs on the mainnet by timestamps
 * The hardcoded address `0x6c6ab7b3215374de4a65de63eac9bc7a0c7f402d`
 * is the NFT contract address on mainnet
 */
export const getNFTHoldersBeforeTimestamp = gql`
  query NFTHolders($endTimeStamp: Int!) {
    tokens(
      where: {
        tokenAddress: "0x6c6ab7b3215374de4a65de63eac9bc7a0c7f402d"
        blockTimestamp_lte: $endTimeStamp
      }
      orderBy: tokenId
      orderDirection: asc
    ) {
      owner
    }
  }
`;

export const getUserOrders = gql`
  query getUserOrders($query: String!) {
    ordersCount(query: $query) {
      count
    }
  }
`;
