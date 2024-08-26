import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import NFTPrice from "@/components/common/nftprice";
import MintCount from "@/components/common/mint-count";
import FullSizeImageModal from "@/components/common/image-modal";

import useBuyNft from "@/hooks/useBuyNft";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";
import useFetchProof from "@/hooks/useFetchProof";
import usePausedSale from "@/hooks/usePausedSale";

import { useTokenContext } from "@/providers/TokenContext";
import { type TokenItem } from "@/lib/types";
import useReadTokenInformation from "@/hooks/useReadTokenInformation";
import SkeletonLayout from "./common/skeleton-card";
import { MintButtonComponent } from "./common/mint-button-comp";
interface PsycItemProps {
  item: TokenItem & {
    whitelist: string[];
    balance?: string;
  };
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  isOriginal: boolean;
  isOwnedView?: boolean;
  handleModal: () => void;
  isAddressesLoading: boolean;
  soldOut: boolean;
  refetchBalances: () => void;
}

const PsycItem = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  isOriginal,
  isOwnedView = false,
  handleModal,
  soldOut,
  refetchBalances
}: PsycItemProps) => {
  const { address } = useAccount();

  const { buyNft, isPending, isConfirming, isMinting } = useBuyNft(
    isPrivateSale,
    isRandom,
    isOriginal,
    refetchBalances
  );

  const [copyPrice, setCopyPrice] = useState("0.00");
  const [priceLoading, setPriceLoading] = useState(true);
  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );

  const { isPaused } = usePausedSale(item.batchId);

  const { refetch } = useTokenContext();

  const { tokenInformationData } = useReadTokenInformation(item.tokenId);

  const [isActive, setIsActive] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  const proof = useFetchProof(address, item.ipfsHash, isPrivateSale);

  const isWhitelisted = address
    ? item.whitelist
        .map((addr) => addr.toLowerCase())
        .includes(address.toLowerCase())
    : false;

  const modalNeeded = !address || (!isWhitelisted && isOriginal);

  const handleMint = async () => {
    await buyNft(
      parseInt(item.batchId),
      parseInt(item.tokenId),
      isOriginal ? item.price : copyPrice ?? "0.00",
      proof
    );
  };

  const isButtonDisabled =
    isOriginal && !isRandom && isSold
      ? true
      : isPending ||
        isConfirming ||
        isMinting ||
        isSoldLoading ||
        isPaused ||
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (isRandom && soldOut && isOriginal) ||
        (!isOriginal && !isActive);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const showMintedText = isOwnedView && !isOriginal && item.balance !== "0";

  return (
    <Flex
      key={index}
      maxW={isRandom ? "500px" : "170px"}
      mx="auto"
      w={"100%"}
      direction={"column"}
      gap={4}
      alignItems={"center"}
    >
      <Box
        w="100%"
        h={isRandom ? "195px" : "208px"}
        borderRadius={isRandom ? "15px" : "20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
        onClick={() => setIsImageOpen((prev) => !prev)}
        cursor={"pointer"}
      >
        {item.src ? (
          <Image
            src={item.src}
            alt={`PSYC ${index + 1}`}
            objectFit="cover"
            placeholder="blur"
            fill
            blurDataURL="/psyc3.webp"
            quality={75}
            priority={isRandom}
            loading={isRandom ? "eager" : "lazy"}
            onLoadingComplete={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        ) : (
          <SkeletonLayout isRandom={isRandom} />
        )}
        {soldOut && isRandom && isOriginal && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg={"#00000026"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backdropFilter={"blur(2px)"}
          >
            <Text color="white" fontWeight="bold">
              Sold Out
            </Text>
          </Box>
        )}
        {isOriginal && isSold && !isRandom && !isOwnedView && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg={"#00000066"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold">
              Sold
            </Text>
          </Box>
        )}
        {!isOriginal && !isActive && !isOwnedView && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg={"#00000066"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold">
              Paused
            </Text>
          </Box>
        )}
        {isOwnedView && isOriginal && (
          <Flex
            alignItems="center"
            position="absolute"
            bottom="10px"
            left="10px"
            bg="white"
            px={2}
            py={1}
            borderRadius="10px"
            fontWeight="bold"
          >
            <Text>You own token {item.tokenId}</Text>
          </Flex>
        )}
        {showMintedText && <MintCount count={item.balance} />}
        {(!isOwnedView || !isOriginal) &&
          (priceLoading ? (
            <Skeleton
              height="30px"
              width="100px"
              position="absolute"
              bottom="10px"
              left="10px"
              borderRadius="10px"
            />
          ) : (
            <NFTPrice price={isOriginal ? item.price : copyPrice ?? "0.00"} />
          ))}
      </Box>

      {(!isOwnedView || !isOriginal) && (
        <MintButtonComponent
          isButtonDisabled={isButtonDisabled}
          modalNeeded={modalNeeded}
          handleModal={handleModal}
          handleMint={handleMint}
          isMinting={isMinting}
          isPaused={isPaused || (!isOriginal && !isActive)}
          isActive={isActive}
          soldOut={soldOut}
          isOriginal={isOriginal}
          isRandom={isRandom}
          isSold={isSold ?? false}
        />
      )}

      <FullSizeImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen((prev) => !prev)}
        imageSrc={item.src}
      />
    </Flex>
  );
};

export default PsycItem;
