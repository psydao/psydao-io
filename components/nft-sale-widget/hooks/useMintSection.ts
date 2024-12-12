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
  const { activeSale, allSalesData, isOriginal } = useSaleWidget();
  const [isOpen, setIsOpen] = useState(false);
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});

  const { isLoading: isPrivateSaleLoading, isPrivateSale } = usePrivateSale();
  const { isLoading: isAddressesLoading, getAddresses } = useGetAddresses();

  const { availableRandomIds, isRandomIdsLoading } = useGetRandomIds(
    activeSale,
    isRandom,
    isOriginal
  );

  const allTokensOnSale = useMemo(() => {
    return allSalesData?.sales.map((sale) => sale.tokensOnSale).flat();
  }, [allSalesData]);

  const imageIds = useMemo(() => {
    if (isRandomIdsLoading) return [];

    if (isRandom && availableRandomIds.length > 0) {
      return availableRandomIds;
    }

    return allTokensOnSale?.map((token) => token.tokenID) ?? [];
  }, [availableRandomIds, isRandomIdsLoading, allTokensOnSale, isRandom]);

  const { imageUris, loading: imageUrisLoading } = useImageData(
    imageIds,
    isRandomIdsLoading,
    isRandom
  );
  const currentImageIndex = useRandomImage(isRandom, imageUris);

  const handleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  const activeTokens = useMemo(() => {
    if (!activeSale) return [];
    return imageIds.map((token, index) => ({
      src: imageUris[index] ?? "",
      price: formatUnits(BigInt(activeSale.floorPrice), 18),
      isSold: false,
      batchId: activeSale.batchID,
      tokenId: token,
      ipfsHash: activeSale.ipfsHash,
      whitelist: whitelist[activeSale.ipfsHash] ?? [],
      balance: "0"
    }));
  }, [activeSale, imageUris, whitelist, isOriginal]);

  const randomToken = useMemo(() => {
    if (!isRandom || isRandomIdsLoading) return null;
    if (activeTokens.length > 0 && isRandom && !isRandomIdsLoading) {
      return activeTokens[currentImageIndex % activeTokens.length] ?? null;
    }
    if (activeSale) {
      return {
        src: imageUris[0] ?? "",
        price: formatUnits(BigInt(activeSale.floorPrice), 18),
        isSold: false,
        batchId: activeSale.batchID,
        tokenId: "0",
        ipfsHash: activeSale.ipfsHash,
        whitelist: whitelist[activeSale.ipfsHash] ?? [],
        balance: "0"
      };
    }
    return null;
  }, [
    isRandom,
    activeTokens,
    currentImageIndex,
    activeSale,
    imageUris,
    whitelist
  ]);

  useEffect(() => {
    const fetchWhitelist = async () => {
      if (activeSale) {
        try {
          const addresses = await getAddresses(activeSale.ipfsHash);
          if (addresses && !isAddressesLoading) {
            setWhitelist((prev) => ({
              ...prev,
              [activeSale.ipfsHash]: addresses
            }));
          }
        } catch (error) {
          console.error("Error fetching whitelist addresses:", error);
        }
      }
    };
    void fetchWhitelist();
  }, [activeSale]);

  const privateSaleStatus = !isPrivateSaleLoading && isPrivateSale;

  return {
    isOpen,
    handleModal,
    activeSale,
    randomToken,
    activeTokens,
    imageUris,
    isOriginal,
    imageUrisLoading,
    privateSaleStatus,
    isAddressesLoading,
    whitelist,
    currentImageIndex,
    tokens: activeSale?.tokensOnSale ?? []
  };
};
