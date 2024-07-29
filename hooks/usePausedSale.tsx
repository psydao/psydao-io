import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

type SaleBatchesReturn = [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean
];

const usePausedSale = (saleId: string) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [saleBatches, setSaleBatches] = useState<SaleBatchesReturn | undefined>(
    undefined
  );

  const { data, isError, isLoading } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "saleBatches",
    args: [saleId]
  });
  useEffect(() => {
    if (data) {
      setSaleBatches(data as SaleBatchesReturn);
    }

    if (saleBatches) {
      setIsPaused(saleBatches[6]);
    }
  }, [data, saleBatches]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching sale status");
    }
  });

  return { isPaused, isError, isLoading };
};

export default usePausedSale;
