import type { GetSaleByIdData } from "@/lib/types";
import { getSaleById } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCustomToasts } from "./useCustomToasts";
import { useReadContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import usePausedSale from "./usePausedSale";

type SaleBatchesReturn = [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean
];

export const useGetCurrentSaleValues = (id: string, width: number) => {
  const { isPaused, isError: pausedSaleError } = usePausedSale(id);
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState<string>("");
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const { showErrorToast } = useCustomToasts();

  const { data, error } = useQuery<GetSaleByIdData>(getSaleById, {
    variables: {
      id
    }
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (data && data.sale) {
      setCeilingPrice(data.sale.ceilingPrice);
      setFloorPrice(data.sale.floorPrice);
      setIpfsHash(data.sale.ipfsHash);
    }
    if (error) {
      showErrorToast("Error fetching data from subgraph", width);
    }

    if (isPaused) {
      console.log(isPaused, "saleBatchesData");
    }

    if (pausedSaleError) {
      showErrorToast(
        "Error fetching current sale statuses from contract",
        width
      );

      console.error("Error fetching current sale statuses from contract");
    }
  }, [
    data,
    setCeilingPrice,
    setFloorPrice,
    setIpfsHash,
    isPaused,
    pausedSaleError
  ]);
  return { floorPrice, ceilingPrice, ipfsHash, isPaused };
};
