import { useState, useEffect, useMemo } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useTokenContext } from "@/providers/TokenContext";
import useBuyNft from "@/hooks/useBuyNft";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";
import useFetchProof from "@/hooks/useFetchProof";
import usePausedSale from "@/hooks/usePausedSale";
import useReadTokenInformation from "@/hooks/useReadTokenInformation";
import { type TokenItem } from "@/lib/types";

interface UsePsycItemProps {
  item: TokenItem & {
    whitelist: string[];
    balance?: string;
  };
  isRandom: boolean;
  isPrivateSale: boolean;
  isOriginal: boolean;
  refetchBalances: () => void;
}

export const usePsycItem = ({
  item,
  isRandom,
  isPrivateSale,
  isOriginal,
  refetchBalances
}: UsePsycItemProps) => {
  const { address } = useAccount();
  const { refetch } = useTokenContext();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { buyNft, isPending, isConfirming, isMinting } = useBuyNft(
    isPrivateSale,
    isRandom,
    isOriginal,
    refetchBalances
  );

  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );
  const { isPaused } = usePausedSale(item.batchId);
  const { tokenInformationData } = useReadTokenInformation(item.tokenId);
  const proof = useFetchProof(address, item.ipfsHash, isPrivateSale);

  const [copyPrice, setCopyPrice] = useState("0.00");
  const [priceLoading, setPriceLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (tokenInformationData) {
      const price = isRandom
        ? formatEther(tokenInformationData[0])
        : formatEther(tokenInformationData[1]);

      setCopyPrice(price);
      setPriceLoading(false);
      setIsActive(tokenInformationData[2]);
    }
  }, [tokenInformationData, isRandom]);

  useEffect(() => {
    if (isSold) {
      refetch();
    }
  }, [isSold, refetch]);

  const isWhitelisted = useMemo(() => {
    if (!address) return false;
    return item.whitelist
      .map((addr) => addr.toLowerCase())
      .includes(address.toLowerCase());
  }, [address, item.whitelist]);

  const modalNeeded = !address || (!isWhitelisted && isOriginal);

  const handleMint = async () => {
    await buyNft(
      parseInt(item.batchId),
      parseInt(item.tokenId),
      isOriginal ? item.price : copyPrice,
      proof
    );
  };

  const isButtonDisabled = useMemo(() => {
    if (isOriginal && !isRandom && isSold) return true;
    return (
      isPending ||
      isConfirming ||
      isMinting ||
      isSoldLoading ||
      isPaused ||
      (!isOriginal && !isActive)
    );
  }, [
    isOriginal,
    isRandom,
    isSold,
    isPending,
    isConfirming,
    isMinting,
    isSoldLoading,
    isPaused,
    isActive
  ]);

  return {
    isImageLoaded,
    setIsImageLoaded,
    copyPrice,
    priceLoading,
    isActive,
    isSold,
    isPaused,
    isWhitelisted,
    modalNeeded,
    handleMint,
    isButtonDisabled,
    isMinting
  };
};
