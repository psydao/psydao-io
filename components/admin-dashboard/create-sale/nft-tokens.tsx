import { Flex, Text } from "@chakra-ui/react";
import ValueContainer from "./value-container";

const NftTokensSection = ({ tokenIds }: { tokenIds: number[] }) => {
  const firstTokenId = tokenIds[0];
  const lastTokenId = tokenIds[tokenIds.length - 1];

  return (
    <Flex
      flexDirection="column"
      width="100%"
      p={6}
      gap={4}
      borderY="1px"
      borderColor="#F2BEBE"
    >
      <Text fontSize="18px" fontFamily={"Inter"}>
        NFT Tokens included in batch
      </Text>
      <Flex gap={2} flexWrap="wrap">
        <ValueContainer
          key={firstTokenId}
          value={`${firstTokenId} - ${lastTokenId}`}
          isWhitelistedAddress={false}
        />
      </Flex>
    </Flex>
  );
};

export default NftTokensSection;
