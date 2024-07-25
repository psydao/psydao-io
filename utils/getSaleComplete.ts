import type { Sale } from "@/lib/types";

export const getSaleComplete = (sale: Sale) => {
  if (sale.batchID === "2") {
    console.log(sale.tokensOnSale);
  }
  const saleBuyers = sale.tokensOnSale.map((token) => token.buyer);
  const isSoldOut = saleBuyers.every(Boolean);

  return isSoldOut;
};
