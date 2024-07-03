import { Box, Image, Text } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/mint-button";

interface NFTItemProps {
  item: {
    src: string;
    price: string;
    isSold: boolean;
    batchId: string;
    tokenId: string;
  };
  index: number;
  isRandom: boolean;
}

const NFTItem = ({ item, index, isRandom }: NFTItemProps) => {
  const handleMint = async () => {
    console.log("Minting NFT");
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

        <NFTPrice price={item.price} />
      </Box>
      <Box mt={2}>
        <MintButton
          customStyle={{ width: "100%" }}
          onClick={handleMint}
          // isDisabled={item.isSold || isPending || isConfirming || isMinting}
        >
          {item.isSold ? <Text color="black">Sold</Text> : "Mint"}
        </MintButton>
      </Box>
    </Box>
  );
};

export default NFTItem;
