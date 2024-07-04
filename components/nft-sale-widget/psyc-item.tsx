import React from "react";
import { Box, Image, Text, Spinner, Tooltip } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import { type TokenItem } from "./layout/mint-section";
import { useAccount } from "wagmi";

interface PsycItemProps {
  item: TokenItem;
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
}

const PsycItem = ({ item, index, isRandom, isPrivateSale }: PsycItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting, isConfirmed } = useBuyNft(
    isPrivateSale,
    isRandom
  );

  const { address } = useAccount();

  const handleMint = async () => {
    await buyNft(parseInt(item.batchId), parseInt(item.tokenId), item.price);
  };

  return (
    <Box key={index} maxW={isRandom ? "500px" : "170px"} mx="auto">
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
          display={item.isSold ? "block" : "none"}
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
        whiteSpace={"wrap"}
        borderRadius={"16px"}
        border={"2px solid #F2BEBE73"}
      >
        <Box mt={2}>
          <MintButton
            customStyle={{ width: "100%" }}
            onClick={handleMint}
            isDisabled={
              !address ||
              isRandom ||
              item.isSold ||
              isPending ||
              isConfirming ||
              isMinting
            }
          >
            {isConfirmed ? (
              <Text color="black">Minted</Text>
            ) : isMinting ? (
              <>
                <Spinner size="sm" mr={2} />
                Minting
              </>
            ) : item.isSold ? (
              <Text color="black">Sold</Text>
            ) : (
              "Mint"
            )}
          </MintButton>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default PsycItem;
