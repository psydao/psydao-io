import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/mint-button";
import { Box, Flex, Image } from "@chakra-ui/react";

export const MintSection = () => {
  return (
    <Box textAlign="center" py={4}>
      <Flex justifyContent="center">
        <Box
          w="100%"
          maxW="500px"
          borderRadius="15px"
          overflow="hidden"
          position="relative"
        >
          <Image src="/random-psyc.png" alt="Random PSYC" w="100%" />
          <NFTPrice price="0.1 ETH" />
        </Box>
      </Flex>
      <Flex justifyContent="center" py={4}>
        <MintButton
          customStyle={{ width: "169.43px" }}
          onClick={() => {
            console.log("Mint");
          }}
        >
          Mint
        </MintButton>
      </Flex>
    </Box>
  );
};
