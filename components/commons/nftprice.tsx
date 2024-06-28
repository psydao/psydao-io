import React from "react";
import { Image, Flex, Text } from "@chakra-ui/react";

interface NFTPriceProps {
  price: string;
}

const NFTPrice = ({ price }: NFTPriceProps) => {
  return (
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
      <Text>{price}</Text>
      <Image src="/windows/swap/ETH.svg" alt="ETH Symbol" ml={1} />
    </Flex>
  );
};

export default NFTPrice;
