import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { formatEther } from "viem"; // Import formatEther from viem
import { psycSaleContractConfig } from "@/lib/sale-contract-config";

interface RevenueSplit {
  psycFee: string;
  royalty: string;
  erc721OwnerPortion: string;
}

export const useReadGeneralSettings = () => {
  const [buyLimit, setBuyLimit] = useState<string>("0");
  const [isPrivateSale, setIsPrivateSale] = useState<boolean>(false);
  const [royaltiesRevenue, setRoyaltiesRevenue] = useState<string>("0");
  const [revenueSplit, setRevenueSplit] = useState<RevenueSplit>({
    psycFee: "0",
    royalty: "0",
    erc721OwnerPortion: "0"
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: buyLimitData,
    isError: buyLimitError,
    isLoading: buyLimitLoading
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "buyLimit"
  }) as {
    data: bigint | null;
    isError: boolean;
    isLoading: boolean;
  };

  const {
    data: privateSaleData,
    isError: privateSaleError,
    isLoading: privateSaleLoading
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "privateSale"
  }) as {
    data: boolean | null;
    isError: boolean;
    isLoading: boolean;
  };

  const {
    data: royaltiesData,
    isError: royaltiesError,
    isLoading: royaltiesLoading
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "royalties"
  }) as {
    data: bigint | null;
    isError: boolean;
    isLoading: boolean;
  };

  const {
    data: revenueSplitData,
    isError: revenueSplitError,
    isLoading: revenueSplitLoading
  } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "revenueSplit"
  }) as {
    data: [bigint, bigint, bigint] | null;
    isError: boolean;
    isLoading: boolean;
  };

  useEffect(() => {
    setBuyLimit(buyLimitData?.toString() ?? "0");
    setIsPrivateSale(privateSaleData !== null ? !privateSaleData : false);

    setRoyaltiesRevenue(royaltiesData ? formatEther(royaltiesData) : "0");

    if (revenueSplitData) {
      setRevenueSplit({
        psycFee: (revenueSplitData[0] / 100n).toString() ?? "0",
        royalty: (revenueSplitData[1] / 100n).toString() ?? "0",
        erc721OwnerPortion: (revenueSplitData[2] / 100n).toString() ?? "0"
      });
    } else {
      setRevenueSplit({
        psycFee: "0",
        royalty: "0",
        erc721OwnerPortion: "0"
      });
    }

    if (
      !buyLimitLoading &&
      !privateSaleLoading &&
      !royaltiesLoading &&
      !revenueSplitLoading
    ) {
      setLoading(false);
    }

    if (
      buyLimitError ||
      privateSaleError ||
      royaltiesError ||
      revenueSplitError
    ) {
      setError("Failed to fetch data from the contract.");
    }
  }, [
    buyLimitData,
    privateSaleData,
    royaltiesData,
    revenueSplitData,
    buyLimitLoading,
    privateSaleLoading,
    royaltiesLoading,
    revenueSplitLoading,
    buyLimitError,
    privateSaleError,
    royaltiesError,
    revenueSplitError
  ]);

  return {
    buyLimit,
    isPrivateSale,
    royaltiesRevenue,
    revenueSplit,
    loading,
    error
  };
};
