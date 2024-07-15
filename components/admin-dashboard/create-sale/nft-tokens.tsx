import { Flex, Text } from "@chakra-ui/react";
import ValueContainer from "./value-container";

const NftTokensSection = () => {
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
        {/* Note: We'll be iterating through tokenIds so it will look cleaner */}
        <ValueContainer value="123456" isWhitelistedAddress={false} />
        <ValueContainer value="123456" isWhitelistedAddress={false} />
      </Flex>
    </Flex>
  );
};

export default NftTokensSection;
