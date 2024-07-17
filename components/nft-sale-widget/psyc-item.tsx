import React from "react";
import { Box, Image, Text, Spinner, Tooltip, Flex } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/ui/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import { useAccount } from "wagmi";
import { type TokenItem } from "@/lib/types";
import useActivateSale from "@/hooks/useActivateSale";
import { handleTransactionError } from "@/utils/transactionHandlers";
import { useResize } from "@/hooks/useResize";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";

interface PsycItemProps {
  item: TokenItem;
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  tokenIdsForActivation: number[];
}

const PsycItem = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  tokenIdsForActivation
}: PsycItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting, isConfirmed } = useBuyNft(
    isPrivateSale,
    isRandom
  );

  const { width } = useResize();
  const { isSalesActive, activateSale } = useActivateSale();
  const { address } = useAccount();
  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );

  const handleMint = async () => {
    if (!isSalesActive) {
      try {
        await activateSale(tokenIdsForActivation, (error) =>
          handleTransactionError(error, width)
        );
      } catch (error) {
        console.error("Failed to activate sales:", error);
        return;
      }
    }
    await buyNft(
      parseInt(item.batchId),
      parseInt(item.tokenId),
      tokenIdsForActivation,
      item.price
    );
  };

  const isButtonDisabled =
    !address ||
    (isSold ?? isPending) ||
    isConfirming ||
    isMinting ||
    isSoldLoading;

  return (
    <Flex
      key={index}
      maxW={isRandom ? "500px" : "170px"}
      mx="auto"
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
          alt={`PSYC ${index + 1}`}
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
          display={isSold ? "block" : "none"}
        />
        <NFTPrice price={item.price} />
      </Box>
      <Tooltip
        isDisabled={!!address}
        label="To mint PSYC NFTs, you need to connect your wallet first."
        placement="top"
        bg={"white"}
        py={4}
        px={6}
        color={"#1A202C"}
        fontSize={18}
        maxW={"300px"}
        whiteSpace={"normal"}
        borderRadius={"16px"}
        border={"2px solid #F2BEBE73"}
      >
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
          ) : isSold ? (
            <Text color="black">Sold</Text>
          ) : (
            "Mint"
          )}
        </MintButton>
      </Tooltip>
    </Flex>
  );
};

export default PsycItem;
