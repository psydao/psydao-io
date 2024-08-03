import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type OwnedNFTItemProps = {
  index: number;
  isPrivateSale: boolean;
  isOwned: boolean;
  copiesOwned: number;
  src: string;
  item: {
    tokenId: string;
    owner: string;
    src: string;
  };
  isOriginal: boolean;
};

export const OwnedNFTItem = (props: OwnedNFTItemProps) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    console.log(props.item.tokenId, "item.tokenId");
  }, [props.item.tokenId]);

  const handleImageClick = () => {
    setIsImageOpen((prev) => !prev);
  };

  return (
    <Flex
      key={props.index}
      maxW={"170px"}
      mx="auto"
      w={"100%"}
      direction={"column"}
      gap={4}
      alignItems={"center"}
    >
      <Box
        w="100%"
        h={"208px"}
        borderRadius={"20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
        onClick={handleImageClick}
      >
        <Image
          src={props.src}
          alt={`PSYC ${props.index + 1}`}
          w="100%"
          h="100%"
          objectFit="cover"
        />

        {props.isOriginal && (
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
            <Text>You own token {props.item.tokenId}</Text>
          </Flex>
        )}

        {!props.isOriginal && props.isOwned && !props.isPrivateSale && (
          <Flex
            position={"absolute"}
            top={3}
            left={3}
            bg={"#FFFFFFE5"}
            borderRadius={"14px"}
            padding={"6px 6px 6px 8px"}
            alignItems={"center"}
            gap={1}
          >
            <Text color={"black"} fontSize={"12px"} fontWeight={700}>
              You Minted
            </Text>
            <Flex
              borderRadius={"9999px"}
              border={"1px solid #F2BEBE73"}
              fontSize={12}
              padding={"2px 8px"}
              color={"black"}
              textDecoration={"none"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"25px"}
              width={"25px"}
            >
              {props.copiesOwned}
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
