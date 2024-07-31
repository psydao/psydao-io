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
  const { getAddresses, isLoading: addressesLoading } = useGetAddresses();

  const [whitelistedSales, setWhitelistedSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchWhitelistedSales = async () => {
      if (address && data && !loading) {
        const salesWithWhitelist = await Promise.all(
          data.sales.map(async (sale) => {
            const addresses = await getAddresses(sale.ipfsHash);
            if (addresses.includes(address)) {
              return sale;
            }
            return null;
          })
        );

        const filteredSales = salesWithWhitelist.filter(
          (sale) => sale !== null
        ) as Sale[];
        setWhitelistedSales(filteredSales);
        console.log(filteredSales, "whitelistedSales after filtering");
      }
    };

    fetchWhitelistedSales().catch(console.error);
  }, [address, data, loading, getAddresses]);

  return {
    whitelistedSales,
    loading: loading || addressesLoading
  };
};

export default useGetOnlyWhitelistedSales;
