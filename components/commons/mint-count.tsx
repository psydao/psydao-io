import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface MintCountProps {
  count: string;
}

const MintCount = ({ count }: MintCountProps) => {
  return (
    <Flex
      alignItems="center"
      position="absolute"
      top="10px"
      left="10px"
      bg="white"
      px={2}
      py={1}
      borderRadius="10px"
      fontWeight="bold"
    >
      <Text>You minted {count}</Text>
    </Flex>
  );
};

export default MintCount;
