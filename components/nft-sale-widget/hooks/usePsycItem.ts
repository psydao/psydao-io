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
  soldOut: boolean;
}

export const usePsycItem = ({
  item,
  isRandom,
  isPrivateSale,
  isOriginal,
  refetchBalances,
  soldOut
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
  // const { floorAndCeilingPriceData } = useReadFloorAndCeilingPrice(
  //   item.tokenId
  // );

  // const { copyPrice, priceLoading, isActive } = useMemo(() => {
  //   if (!floorAndCeilingPriceData) {
  //     return { copyPrice: "0.00", priceLoading: true, isActive: true };
  //   }

  //   const price = isRandom
  //     ? formatEther(floorAndCeilingPriceData[0])
  //     : formatEther(floorAndCeilingPriceData[1]);

  //   return {
  //     copyPrice: price,
  //     priceLoading: false,
  //     isActive: floorAndCeilingPriceData[2]
  //   };
  // }, [floorAndCeilingPriceData, isRandom]);

  const [copyPrice, setCopyPrice] = useState("0.00");
  const [priceLoading, setPriceLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (tokenInformationData && isRandom) {
      const floorPrice = formatEther(tokenInformationData[0]);
      setCopyPrice(floorPrice);
      setPriceLoading(false);
      setIsActive(tokenInformationData[2]);
    } else if (tokenInformationData && !isRandom) {
      const ceilingPrice = formatEther(tokenInformationData[1]);
      setCopyPrice(ceilingPrice);
      setPriceLoading(false);
    }

    if (tokenInformationData) {
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
      (isRandom && soldOut && isOriginal) ||
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
    soldOut,
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
