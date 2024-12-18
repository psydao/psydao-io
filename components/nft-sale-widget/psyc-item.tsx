import React, { useState } from "react";
import { Box, Text, Flex, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import NFTPrice from "@/components/common/nftprice";
import FullSizeImageModal from "@/components/common/image-modal";
import SkeletonLayout from "./common/skeleton-card";
import { MintButtonComponent } from "./common/mint-button-comp";
import { type TokenItem } from "@/lib/types";
import { usePsycItem } from "./hooks/usePsycItem";

interface PsycItemProps {
  item: TokenItem & {
    whitelist: string[];
    balance?: string;
  };
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  isOriginal: boolean;
  refetchBalances: () => void;
  handleModal: () => void;
}

const PsycItem: React.FC<PsycItemProps> = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  isOriginal,
  refetchBalances,
  handleModal
}) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const {
    isImageLoaded,
    setIsImageLoaded,
    copyPrice,
    priceLoading,
    isActive,
    isSold,
    isPaused,
    modalNeeded,
    handleMint,
    isButtonDisabled,
    isMinting
  } = usePsycItem({
    item,
    isRandom,
    isPrivateSale,
    isOriginal,
    refetchBalances
  });

  return (
    <Flex
      key={index}
      maxW={isRandom ? "500px" : "170px"}
      mx="auto"
      w="100%"
      direction="column"
      gap={4}
      alignItems="center"
    >
      <Box
        w="100%"
        h={isRandom ? "195px" : "208px"}
        borderRadius={isRandom ? "15px" : "20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        onClick={() => setIsImageOpen(true)}
        cursor="pointer"
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
            style={{
              visibility: isImageLoaded ? "visible" : "hidden",
              maxHeight: isImageLoaded ? "none" : "0",
              maxWidth: isImageLoaded ? "none" : "0"
            }}
            onLoadingComplete={() => {
              setIsImageLoaded(true);
            }}
            onError={() => {
              console.error(
                `Image failed to load. Src: ${item.src}; TokenID ${item.tokenId}`
              );
            }}
          />
        ) : (
          <SkeletonLayout isRandom={isRandom} />
        )}
        {renderOverlays()}
        {renderPrice()}
      </Box>

      {renderMintButton()}

      <FullSizeImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        imageSrc={item.src}
      />
    </Flex>
  );

  function renderOverlays() {
    if (isOriginal && isSold && !isRandom) {
      return <SoldOverlay />;
    }
    if (isOriginal && isSold && isRandom) {
      return <SoldOverlay />;
    }
    if ((!isOriginal && !isActive) || isPaused) {
      return <PausedOverlay />;
    }
    return null;
  }

  function renderPrice() {
    return priceLoading ? (
      <PriceSkeleton />
    ) : (
      <NFTPrice price={isOriginal ? item.price : copyPrice} />
    );
  }

  function renderMintButton() {
    return (
      <MintButtonComponent
        isButtonDisabled={isButtonDisabled}
        modalNeeded={modalNeeded}
        handleModal={handleModal}
        handleMint={handleMint}
        isMinting={isMinting}
        isPaused={isPaused || (!isOriginal && !isActive)}
        isActive={isActive}
        isOriginal={isOriginal}
        isRandom={isRandom}
        isSold={isSold ?? false}
      />
    );
  }
};

const SoldOutOverlay = () => (
  <Box
    position="absolute"
    top="0"
    left="0"
    width="100%"
    height="100%"
    bg="#00000026"
    display="flex"
    alignItems="center"
    justifyContent="center"
    backdropFilter="blur(2px)"
  >
    <Text color="white" fontWeight="bold">
      Sold Out
    </Text>
  </Box>
);

const SoldOverlay = () => (
  <Box
    position="absolute"
    top="0"
    left="0"
    width="100%"
    height="100%"
    bg="#00000066"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text color="white" fontWeight="bold">
      Sold
    </Text>
  </Box>
);

const PausedOverlay = () => (
  <Box
    position="absolute"
    top="0"
    left="0"
    width="100%"
    height="100%"
    bg="#00000066"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text color="white" fontWeight="bold">
      Paused
    </Text>
  </Box>
);

const PriceSkeleton = () => (
  <Skeleton
    height="30px"
    width="100px"
    position="absolute"
    bottom="10px"
    left="10px"
    borderRadius="10px"
  />
);

export default PsycItem;
