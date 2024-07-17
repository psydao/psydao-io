interface TokenOnSale {
  id: string;
  tokenID: string;
}

interface Sale {
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

export interface TokenItem {
  src: string;
  price: string;
  isSold: boolean;
  batchId: string;
  tokenId: string;
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
  treasury: string;
  royalties: string;
  nftOwners: string;
};
