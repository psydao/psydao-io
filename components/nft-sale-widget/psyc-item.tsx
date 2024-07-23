import React from "react";
import { Box, Image, Text, Spinner, Tooltip, Flex } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/ui/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import { useAccount } from "wagmi";
import { type TokenItem } from "@/lib/types";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";
import useFetchProof from "@/hooks/useFetchProof";

interface PsycItemProps {
  item: TokenItem & { whitelist: string[] };
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  loading: boolean;
}

const PsycItem = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  loading
}: PsycItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting, isConfirmed } = useBuyNft(
    isPrivateSale,
    isRandom
  );

  const { address } = useAccount();
  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );

  const proof = useFetchProof(address, item.ipfsHash, isPrivateSale);

  const isWhitelisted = address ? item.whitelist.includes(address) : false;

  const handleMint = async () => {
    await buyNft(
      parseInt(item.batchId),
      parseInt(item.tokenId),
      item.price,
      proof
    );
  };

  const isButtonDisabled =
    !address ||
    !isWhitelisted ||
    ((isRandom ? false : isSold) ?? isPending) ||
    isConfirming ||
    isMinting ||
    isSoldLoading;

  const tooltipLabel = !address
    ? "You need to connect your wallet"
    : "You need to be whitelisted to mint";

  return (
    <Flex
      key={index}
      maxW={isRandom ? "500px" : "170px"}
      mx="auto"
      w={loading ? "100%" : "auto"}
      direction={"column"}
      gap={4}
      alignItems={"center"}
    >
      <Box
        w="100%"
        h={isRandom ? "auto" : "208px"}
        borderRadius={isRandom ? "15px" : "20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
      >
        <Image
          src={item.src}
          alt={`PSYC ${index}`}
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg={"#00000066"}
          display={isSold && !isRandom ? "flex" : "none"}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontWeight="bold">
            Sold
          </Text>
        </Box>
        <NFTPrice price={item.price} />
      </Box>
      <Tooltip
        isDisabled={address && isWhitelisted}
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
            customStyle={{ width: "100%", opacity: isButtonDisabled ? 0.5 : 1 }}
            onClick={handleMint}
            isDisabled={isButtonDisabled}
            isRandom={isRandom}
          >
            {isConfirmed ? (
              <Text color="black">Minted</Text>
            ) : isMinting ? (
              <>
                <Spinner size="sm" mr={2} />
                Minting
              </>
            ) : isRandom || !isSold ? (
              "Mint"
            ) : (
              <Text color="black">Sold</Text>
            )}
          </MintButton>
        </Flex>
      </Tooltip>
    </Flex>
  );
};

export default PsycItem;
