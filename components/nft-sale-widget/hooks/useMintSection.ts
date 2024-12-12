import { useState, useEffect, useMemo, useCallback } from "react";
import { formatUnits } from "viem";

import { useSaleWidget } from "@/providers/SaleWidgetContext";

import usePrivateSale from "@/hooks/usePrivateSale";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import useImageData from "@/hooks/useImageData";
import useRandomImage from "@/hooks/useRandomImage";
import useGetRandomIds from "@/hooks/useGetRandomIds";

export const useMintSection = (isRandom: boolean) => {
  const { allSalesData, isOriginal } = useSaleWidget();
  const [isOpen, setIsOpen] = useState(false);
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});

  const { isLoading: isPrivateSaleLoading, isPrivateSale } = usePrivateSale();
  const { isLoading: isAddressesLoading, getAddresses } = useGetAddresses();

  const allSales = allSalesData?.sales;

  const allTokensOnSale = useMemo(() => {
    return allSales?.flatMap((sale) => sale.tokensOnSale) ?? [];
  }, [allSales]);

  const { availableRandomIds, isRandomIdsLoading } = useGetRandomIds(
    allTokensOnSale,
    isRandom,
    isOriginal
  );

  const imageIds = useMemo(() => {
    if (isRandomIdsLoading) return [];

    if (isRandom && availableRandomIds.length > 0) {
      return availableRandomIds;
    }

    return allTokensOnSale ?? [];
  }, [availableRandomIds, isRandomIdsLoading, allTokensOnSale, isRandom]);

  const { imageUris, loading: imageUrisLoading } = useImageData(
    imageIds.map((token) => token.tokenID),
    isRandomIdsLoading,
    isRandom
  );
  const currentImageIndex = useRandomImage(isRandom, imageUris);

  const handleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  const activeTokens = useMemo(() => {
    if (!allSales) return [];
    return imageIds.map((token, index) => ({
      src: imageUris[index] ?? "",
      price: formatUnits(BigInt(token.sale.floorPrice), 18),
      isSold: false,
      batchId: token.sale.batchID ?? "0",
      tokenId: token.tokenID,
      ipfsHash: token.sale.ipfsHash ?? "",
      whitelist: whitelist[token.sale.ipfsHash ?? "0x"] ?? [],
      balance: "0"
    }));
  }, [allSales, imageUris, whitelist, isOriginal]);

  const randomToken = useMemo(() => {
    if (!isRandom || isRandomIdsLoading) return null;
    if (activeTokens.length > 0 && isRandom && !isRandomIdsLoading) {
      return activeTokens[currentImageIndex % activeTokens.length] ?? null;
    }
    if (allSales) {
      return {
        src: imageUris[0] ?? "",
        price: formatUnits(BigInt(allSales[0]?.floorPrice ?? "0"), 18),
        isSold: false,
        batchId: allSales[0]?.batchID ?? "0",
        tokenId: "0",
        ipfsHash: allSales[0]?.ipfsHash ?? "",
        whitelist: whitelist[allSales[0]?.ipfsHash ?? "0x"] ?? [],
        balance: "0"
      };
    }
    return null;
  }, [
    isRandom,
    activeTokens,
    currentImageIndex,
    allSales,
    imageUris,
    whitelist
  ]);

  useEffect(() => {
    const fetchWhitelist = async () => {
      if (allSales) {
        try {
          allSales.forEach(async (sale) => {
            const addresses = await getAddresses(sale.ipfsHash);
            if (addresses && !isAddressesLoading) {
              setWhitelist((prev) => ({
                ...prev,
                [sale.ipfsHash]: addresses
              }));
            }
          });
        } catch (error) {
          console.error("Error fetching whitelist addresses:", error);
        }
      }
    };
    void fetchWhitelist();
  }, [allSales]);

  const privateSaleStatus = !isPrivateSaleLoading && isPrivateSale;

  return {
    isOpen,
    handleModal,
    isOriginal,
    randomToken,
    activeTokens,
    imageUris,
    imageUrisLoading,
    privateSaleStatus,
    isAddressesLoading,
    whitelist,
    currentImageIndex,
    allSales,
    tokens: allTokensOnSale ?? []
  };
};
