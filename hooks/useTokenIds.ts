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

  console.log("Count Error Details:", countError && countErrorDetails);

  useEffect(() => {
    if (saleBatchCount != null) {
      console.log("Setting lastBatchIndex:", saleBatchCount);
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

  console.log("Batch Error Details:", batchErrorDetails);

  useEffect(() => {
    if (!batchLoading && !batchError && saleBatch && saleBatchCount !== null) {
      const batchArray = saleBatch as unknown as [
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ];
      const lastTokenId = Number(batchArray[1]);

      console.log("Checking conditions for generateNftIds...");
      console.log("saleBatchCount:", saleBatchCount);
      console.log("lastTokenId:", lastTokenId);

      if (saleBatchCount > 0 && !isNaN(lastTokenId)) {
        const newBatchCount = saleBatchCount + 1n;
        console.log(
          "Generating new token IDs with batchCount:",
          newBatchCount,
          "and lastTokenId:",
          lastTokenId
        );
        const newTokenIds = generateNftIds(Number(newBatchCount), lastTokenId);
        console.log("Setting tokenIds:", newTokenIds);
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

  return { tokenIds, isLoading };
};
