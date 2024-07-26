import type { GetSaleByIdData } from "@/lib/types";
import { getSaleById } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCustomToasts } from "./useCustomToasts";
import { useReadContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";

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
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState<string>("");
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const { showErrorToast } = useCustomToasts();
  const [saleBatches, setSaleBatches] = useState<SaleBatchesReturn>([
    0n,
    0n,
    0n,
    0n,
    0n,
    0n,
    false
  ]);

  const { data, error } = useQuery<GetSaleByIdData>(getSaleById, {
    variables: {
      id
    }
  });

  const { data: saleBatchesData, error: saleBatchesError } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "saleBatches",
    args: [id]
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

    if (saleBatchesData) {
      console.log(saleBatchesData, "saleBatchesData");
      setSaleBatches(saleBatchesData as SaleBatchesReturn);
    }

    if (saleBatchesError) {
      showErrorToast(
        "Error fetching current sale statuses from contract",
        width
      );
      console.log(saleBatchesError.message);
      console.error(saleBatchesError.message);
    }
  }, [
    data,
    setCeilingPrice,
    setFloorPrice,
    setIpfsHash,
    saleBatchesData,
    saleBatchesError
  ]);
  return { floorPrice, ceilingPrice, ipfsHash, saleBatches };
};
