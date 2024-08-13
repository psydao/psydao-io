import React, { useEffect, useMemo, useState } from "react";
import { Box, Text, Spinner, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useAccount } from "wagmi";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/ui/mint-button";
import MintCount from "@/components/commons/mint-count";
import FullSizeImageModal from "@/components/commons/image-modal";
import useBuyNft from "@/hooks/useBuyNft";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";
import useFetchProof from "@/hooks/useFetchProof";
import usePausedSale from "@/hooks/usePausedSale";
import { useTokenContext } from "@/providers/TokenContext";
import { type TokenItem } from "@/lib/types";
import useReadFloorAndCeilingPrice from "@/hooks/useReadFloorAndCeilingPrice";
import { formatEther } from "viem";

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
  loading: boolean;
  refetchBalances: () => void;
  handleModal: () => void;
  isAddressesLoading: boolean;
  soldOut?: boolean;
}

const PsycItem = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  isOriginal,
  isOwnedView = false,
  refetchBalances,
  handleModal,
  soldOut
}: PsycItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting } = useBuyNft(
    isPrivateSale,
    isRandom,
    isOriginal,
    refetchBalances
  );

  const { address } = useAccount();
  const [copyPrice, setCopyPrice] = useState("0.00");
  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );

  const { isPaused } = usePausedSale(item.batchId);

  const { refetch } = useTokenContext();

  const { floorAndCeilingPriceData } = useReadFloorAndCeilingPrice(
    item.tokenId
  );

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (floorAndCeilingPriceData && isRandom) {
      const floorPrice = formatEther(floorAndCeilingPriceData[0]);
      setCopyPrice(floorPrice);
    } else if (floorAndCeilingPriceData && !isRandom) {
      const ceilingPrice = formatEther(floorAndCeilingPriceData[1]);
      setCopyPrice(ceilingPrice);
    }

    if (floorAndCeilingPriceData) {
      setIsActive(floorAndCeilingPriceData[2]);
    }
  }, [floorAndCeilingPriceData, isRandom]);

  useEffect(() => {
    if (isSold) {
      refetch();
    }
  }, [isSold, refetch]);

  const proof = useFetchProof(address, item.ipfsHash, isPrivateSale);

  const isWhitelisted = address ? item.whitelist.includes(address) : false;
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
      >
        <Image
          src={item.src}
          alt={`PSYC ${index + 1}`}
          fill
          objectFit="cover"
        />
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
        {(!isOwnedView || !isOriginal) && (
          <NFTPrice price={isOriginal ? item.price : copyPrice ?? "0.00"} />
        )}
      </Box>

      {(!isOwnedView || !isOriginal) && (
        <Flex justifyContent="center" w="100%">
          <MintButton
            customStyle={{
              width: "100%",
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              opacity: isButtonDisabled || modalNeeded ? 0.5 : 1,
              cursor: modalNeeded ? "help" : "pointer"
            }}
            onClick={modalNeeded ? handleModal : handleMint}
            isRandom={isRandom}
            isDisabled={isButtonDisabled}
          >
            {isMinting ? (
              <>
                <Spinner size="sm" mr={2} />
                Minting
              </>
            ) : isPaused || (!isOriginal && !isActive) ? (
              "Paused"
            ) : soldOut && isOriginal ? (
              "Sold Out"
            ) : (
              "Mint"
            )}
          </MintButton>
        </Flex>
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
