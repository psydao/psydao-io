import { useState, useEffect, useMemo, useCallback } from "react";
import { formatUnits } from "viem";

import { useSaleWidget } from "@/providers/SaleWidgetContext";

import usePrivateSale from "@/hooks/usePrivateSale";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import { useBatchSoldOut } from "@/hooks/useBatchSoldOut";
import useImageData from "@/hooks/useImageData";
import useRandomImage from "@/hooks/useRandomImage";
import useGetRandomIds from "@/hooks/useGetRandomIds";

export const useMintSection = (isRandom: boolean) => {
  const { allSalesData, isOriginal } = useSaleWidget();
  const [isOpen, setIsOpen] = useState(false);
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});

  const { isLoading: isPrivateSaleLoading, isPrivateSale } = usePrivateSale();
  const { isLoading: isAddressesLoading, getAddresses } = useGetAddresses();

  const allTokensOnSale = useMemo(() => {
    return allSalesData?.sales.map((sale) => sale.tokensOnSale).flat();
  }, [allSalesData]);

  const { availableRandomTokens, isRandomTokensLoading } = useGetRandomIds(
    allTokensOnSale,
    isRandom,
    isOriginal
  );

  const availableImages = useMemo(() => {
    if (isRandomTokensLoading) return [];

    if (isRandom && availableRandomTokens.length > 0) {
      return availableRandomTokens;
    }

    return allTokensOnSale ?? [];
  }, [availableRandomTokens, isRandomTokensLoading, allTokensOnSale, isRandom]);

  const { imageUris, loading: imageUrisLoading } = useImageData(
    availableImages.map((token) => token.tokenID),
    isRandomTokensLoading,
    isRandom
  );
  const currentImageIndex = useRandomImage(isRandom, imageUris);

  const handleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  const activeTokens = useMemo(() => {
    if (!allSalesData) return [];
    return availableImages.map((token, index) => ({
      src: imageUris[index] ?? "",
      price: formatUnits(BigInt(token.sale.floorPrice), 18),
      isSold: false,
      batchId: token.sale.batchID,
      tokenId: token.tokenID,
      ipfsHash: token.sale.ipfsHash,
      whitelist: whitelist[token.sale.ipfsHash] ?? [],
      balance: "0"
    }));
  }, [availableImages, imageUris, whitelist, isOriginal]);

  const randomToken = useMemo(() => {
    if (!isRandom || isRandomTokensLoading) return null;
    if (activeTokens.length > 0 && isRandom && !isRandomTokensLoading) {
      return activeTokens[currentImageIndex % activeTokens.length] ?? null;
    }
    if (availableRandomTokens.length > 0) {
      return {
        src: imageUris[0] ?? "",
        price: formatUnits(
          BigInt(availableRandomTokens[0]?.sale.floorPrice ?? 0),
          18
        ),
        isSold: false,
        batchId: availableRandomTokens[0]?.sale.batchID ?? "",
        tokenId: availableRandomTokens[0]?.tokenID ?? "",
        ipfsHash: availableRandomTokens[0]?.sale.ipfsHash ?? "",
        whitelist:
          whitelist[availableRandomTokens[0]?.sale.ipfsHash ?? ""] ?? [],
        balance: "0"
      };
    }
    return null;
  }, [
    isRandom,
    activeTokens,
    currentImageIndex,
    allSalesData,
    imageUris,
    whitelist
  ]);

  useEffect(() => {
    const fetchWhitelist = async () => {
      if (allSalesData) {
        try {
          allSalesData.sales.forEach(async (sale) => {
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
  }, [allSalesData]);

  const privateSaleStatus = !isPrivateSaleLoading && isPrivateSale;

  return {
    isOpen,
    allSalesData,
    handleModal,
    randomToken,
    activeTokens,
    imageUris,
    isOriginal,
    imageUrisLoading,
    privateSaleStatus,
    isAddressesLoading,
    whitelist,
    currentImageIndex,
    tokens: allTokensOnSale ?? []
  };
};
