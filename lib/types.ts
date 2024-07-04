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
