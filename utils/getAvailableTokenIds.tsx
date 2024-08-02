import type { Sale, TokenOnSale } from "@/lib/types";

const getAvailableTokens = (
  currentSale: Sale | undefined,
  privateSale: boolean
) => {
  let availableNFTs: TokenOnSale[] = [];
  if (currentSale && privateSale) {
    availableNFTs = currentSale.tokensOnSale.filter(
      (item) => item.buyer === null
    );
  } else if (currentSale && !privateSale) {
    availableNFTs = currentSale.tokensOnSale;
  } else {
    return [];
  }

  return availableNFTs;
};

export default getAvailableTokens;
