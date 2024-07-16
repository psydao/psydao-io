import { type AdminSale } from "@/lib/types";
import { generateNftIds } from "@/services/generateNftIds";
import { getLastTokenId } from "@/utils/saleUtils";

import { useState, useEffect } from "react";

export const useTokenIds = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  useEffect(() => {
    const storedSales = localStorage.getItem("createdSales");
    let mySales: AdminSale[] = [];

    if (storedSales) {
      try {
        mySales = JSON.parse(storedSales) as AdminSale[];
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
      }
    }

    const batchId = mySales.length + 1;
    const lastTokenId = getLastTokenId(mySales);
    const newTokenIds = generateNftIds(batchId, lastTokenId);

    setTokenIds(newTokenIds);
  }, []);

  return tokenIds;
};
