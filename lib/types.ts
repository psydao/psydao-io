import type { Address } from "viem";

export interface TokenOnSale {
  id: string;
  tokenID: string;
  buyer: Address | null;
}

export interface TokenMetadata {
  name: string;
  imageURI: string;
  description: string;
}

export interface SaleTokensMetadata {
  tokens: {
    id: string;
    tokenId: string;
    metadata: TokenMetadata;
  }[];
}

export interface Sale {
  ipfsHash: string;
  batchID: string;
  blockNumber: string;
  ceilingPrice: string;
  floorPrice: string;
  id: string;
  tokensOnSale: TokenOnSale[];
}

export interface GetAllSalesWithTokensData {
  sales: Sale[];
}

export interface GetSaleByIdData {
  sale: Sale;
}

export interface TokenItem {
  src: string;
  price: string;
  isSold: boolean;
  batchId: string;
  tokenId: string;
  ipfsHash: string;
}

export type OwnedTokenItem = {
  owner: string;
  tokenAddress: string;
  tokenId: string;
  uri: string;
  __typename: string;
};

export type GetTokensByOwnerData = {
  tokens: OwnedTokenItem[];
};

export type AdminSale = {
  ceilingPrice: string;
  floorPrice: string;
  startDate: string;
  startTime: string;
  tokenIds: number[];
};

export type GeneralSettings = {
  revenue: string;
  buyLimit: string;
  royalties: string;
  treasury: string;
  ownerPercentage: string;
  openPublicSale: boolean;
};

export type ClaimStatus = "claimable" | "claimed" | "expired";

export type ClaimDetail = {
  account: string;
  amount: string;
};

export type Claim = {
  id: string;
  claims: ClaimDetail[];
  ipfsHash: string;
  merkleRoot: string;
  amount: string;
  claimed: boolean;
  deadline: string;
};
