import { type GetAllSalesWithTokensData, type Sale } from "@/lib/types";
import { getAllSalesWithTokens } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import type { Address } from "viem";
import { useGetAddresses } from "./useGetAddresses";

const useGetOnlyWhitelistedSales = (address: Address | undefined) => {
  const { data, loading } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );

  const { getAddresses, isLoading } = useGetAddresses();

  const [allIpfsHashes, setAllIpfsHashes] = useState<string[]>([]);
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (data && !loading) {
      setAllIpfsHashes(data.sales.map((sale) => sale.ipfsHash));
    }
  }, [data, loading]);

  const getOnlyWhitelistedSales = async () => {
    if (address && allIpfsHashes.length > 0) {
      for (const ipfsHash of allIpfsHashes) {
        const addresses = await getAddresses(ipfsHash);
        if (addresses && !isLoading && addresses.includes(address)) {
          console.log("We is whitelisted");
          setWhitelist((prev) => ({
            ...prev,
            [ipfsHash]: addresses
          }));
        }
      }
    }
    return whitelist;
  };
  return {
    isLoading,
    getOnlyWhitelistedSales
  };
};

export default useGetOnlyWhitelistedSales;
