import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { generateNftIds } from "@/services/generateNftIds";

interface SaleBatch {
  startIndex: bigint;
  endIndex: bigint;
  floorPriceInEth: bigint;
  ceilingPriceInEth: bigint;
  saleStartTime: bigint;
  numberOfNftsSoldInBatch: bigint;
}

export const useTokenIds = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [currentFloorPrice, setCurrentFloorPrice] = useState<bigint | null>(
    null
  );
  const [lastBatchIndex, setLastBatchIndex] = useState<bigint | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: saleBatchCount,
    isError: countError,
    isLoading: countLoading,
    error: countErrorDetails
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "saleBatchCount"
  }) as {
    data: bigint | null;
    isError: boolean;
    isLoading: boolean;
    error: Error | null;
  };

  useEffect(() => {
    if (saleBatchCount != null) {
      setLastBatchIndex(saleBatchCount);
    }
  }, [saleBatchCount]);

  const {
    data: saleBatch,
    isError: batchError,
    isLoading: batchLoading,
    error: batchErrorDetails
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "saleBatches",
    args: lastBatchIndex !== undefined ? [lastBatchIndex] : undefined
  }) as {
    data: SaleBatch | null;
    isError: boolean;
    isLoading: boolean;
    error: Error | null;
  };

  useEffect(() => {
    if (!batchLoading && !batchError && saleBatch && saleBatchCount !== null) {
      const batchArray = saleBatch as unknown as [
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean
      ];
      const lastTokenId = Number(batchArray[1]);
      setCurrentFloorPrice(batchArray[2]);
      if (saleBatchCount >= 0 && !isNaN(lastTokenId)) {
        const newBatchCount = saleBatchCount + 1n;
        const newTokenIds = generateNftIds(Number(newBatchCount), lastTokenId);
        setTokenIds(newTokenIds);
      } else {
        console.error(
          "Invalid batchId or lastTokenId",
          saleBatchCount,
          lastTokenId
        );
      }
    }
  }, [batchLoading, batchError, saleBatch, saleBatchCount]);

  useEffect(() => {
    if (!countLoading && !batchLoading) {
      setIsLoading(false);
    }
  }, [countLoading, batchLoading]);

  return { tokenIds, isLoading, currentFloorPrice };
};
