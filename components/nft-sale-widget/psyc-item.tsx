import React, { useEffect, useState } from "react";
import { Box, Text, Spinner, Tooltip, Flex } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/ui/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import { useAccount } from "wagmi";
import { type TokenItem } from "@/lib/types";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";
import useFetchProof from "@/hooks/useFetchProof";
import { useTokenContext } from "@/providers/TokenContext";
import Image from "next/image";
import FullSizeImageModal from "../commons/image-modal";

interface PsycItemProps {
  item: TokenItem & { whitelist: string[] };
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  isOriginal: boolean;
  loading: boolean;
}

const PsycItem = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  isOriginal,
  loading
}: PsycItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting } = useBuyNft(
    isPrivateSale,
    isRandom,
    isOriginal
  );

  const { address } = useAccount();
  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );

  const { refetch } = useTokenContext();

  useEffect(() => {
    if (isSold) {
      refetch();
    }
  }, [isSold, refetch]);

  const proof = useFetchProof(address, item.ipfsHash, isPrivateSale);

  const isWhitelisted = address ? item.whitelist.includes(address) : false;

  const handleMint = async () => {
    await buyNft(
      parseInt(item.batchId),
      parseInt(item.tokenId),
      item.price,
      proof
    );
    refetch();
  };

  const isButtonDisabled =
    !address ||
    (!isWhitelisted && isOriginal) ||
    (isOriginal && !isRandom && isSold)
      ? true
      : isPending || isConfirming || isMinting || isSoldLoading;

  const tooltipLabel = !address
    ? "You need to connect your wallet"
    : "You need to be whitelisted to mint";

  const [isImageOpen, setIsImageOpen] = useState(false);

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
        {isOriginal && isSold && !isRandom && (
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
        <NFTPrice price={item.price} />
      </Box>
      {isOriginal && (
        <Tooltip
          isDisabled={address ? isWhitelisted : false}
          label={tooltipLabel}
          placement="top"
          bg="white"
          py={2}
          px={4}
          color="#1A202C"
          fontSize={14}
          maxW="300px"
          whiteSpace="normal"
          borderRadius="16px"
          border="2px solid #F2BEBE73"
        >
          <Flex justifyContent="center" w="100%">
            <MintButton
              customStyle={{
                width: "100%",
                opacity: isButtonDisabled ? 0.5 : 1
              }}
              onClick={handleMint}
              isDisabled={isButtonDisabled}
              isRandom={isRandom}
            >
              {isMinting ? (
                <>
                  <Spinner size="sm" mr={2} />
                  Minting
                </>
              ) : (
                "Mint"
              )}
            </MintButton>
          </Flex>
        </Tooltip>
      )}
      {!isOriginal && (
        <Flex justifyContent="center" w="100%">
          <MintButton
            customStyle={{ width: "100%", opacity: isButtonDisabled ? 0.5 : 1 }}
            onClick={handleMint}
            isDisabled={isButtonDisabled}
            isRandom={isRandom}
          >
            {isMinting ? (
              <>
                <Spinner size="sm" mr={2} />
                Minting
              </>
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
