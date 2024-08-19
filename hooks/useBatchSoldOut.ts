import { useState, useEffect } from "react";
import type { Sale } from "@/lib/types";
import getAvailableTokens from "@/utils/getAvailableTokenIds";

export function useBatchSoldOut(
  currentSale: Sale | undefined,
  privateSale: boolean
) {
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);

  useEffect(() => {
    const availableTokens = getAvailableTokens(currentSale, privateSale);
    if (availableTokens.length === 0) {
      setIsSoldOut(true);
    } else {
      setIsSoldOut(false);
    }
  }, [currentSale, privateSale]);

  return isSoldOut;
}
