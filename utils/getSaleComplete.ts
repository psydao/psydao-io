import type { Sale } from "@/lib/types";

export const getSaleComplete = (sale: Sale) => {
  const saleBuyers = sale.tokensOnSale.map((token) => token.buyer);
  const isSoldOut = saleBuyers.every(Boolean);

  return isSoldOut;
};
