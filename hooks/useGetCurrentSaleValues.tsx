import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import type { GetSaleByIdData } from "@/lib/types";
import { getSaleById } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { useCustomToasts } from "./useCustomToasts";

export const useGetCurrentSaleValues = (id: string, width: number) => {
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState<string>("");
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const { showErrorToast } = useCustomToasts();

  const { data, error } = useQuery<GetSaleByIdData>(getSaleById, {
    variables: {
      id
    }
  });

  //! TEMPORARY: Figure out what gives with switchSaleType
  const { data: isPaused } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "paused"
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
  }, [data, setCeilingPrice, setFloorPrice, setIpfsHash]);
  return { floorPrice, ceilingPrice, ipfsHash };
};
