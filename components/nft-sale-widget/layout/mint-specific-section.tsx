import React from "react";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/mint-button";

const specificItems = [
  { src: "/specific-psyc-1.png", price: "0.2 ETH", isSold: false },
  { src: "/specific-psyc-2.png", price: "0.2 ETH", isSold: false },
  { src: "/specific-psyc-3.png", price: "0.2 ETH", isSold: true }
];

export const MintSpecificSection = () => {
  return (
    <Box textAlign="center" py={4} px={4}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(auto-fit, minmax(130px, 1fr))"
        }}
        gap={6}
      >
        {specificItems.map((item, index) => (
          <Box key={index}>
            <Box
              w="100%"
              maxW="170px"
              h="208px"
              mx="auto"
              borderRadius="20px"
              overflow="hidden"
              position="relative"
              border="1px solid #e2e2e2"
              boxShadow="md"
            >
              <Image
                src={item.src}
                alt={`Specific PSYC ${index + 1}`}
                w="100%"
                h="100%"
                objectFit="cover"
              />
              {!item.isSold && <NFTPrice price={item.price} />}
            </Box>
            <Box w="100%" maxW="170px" mx="auto" mt={2}>
              <MintButton
                customStyle={{ width: "100%" }}
                onClick={() => {
                  console.log(`Mint ${index + 1}`);
                }}
                isDisabled={item.isSold}
              >
                {item.isSold ? <Text color="black">Sold</Text> : "Mint"}
              </MintButton>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MintSpecificSection;
