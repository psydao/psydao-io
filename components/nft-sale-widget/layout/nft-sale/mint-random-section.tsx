import { Box, Flex } from "@chakra-ui/react";

interface MintRandomSectionProps {
  tokens: {
    src: string;
    price: string;
    isSold: boolean;
    batchId: string;
    tokenId: string;
  }[];
  currentImageIndex: number;
}

export const MintRandomSection = ({
  tokens,
  currentImageIndex
}: MintRandomSectionProps) => {
  const currentItem = tokens[currentImageIndex];

  if (!currentItem) {
    return null;
  }

  return (
    <Box textAlign="center" py={4}>
      <Flex justifyContent="center"></Flex>
    </Box>
  );
};
