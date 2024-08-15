import type { TokenItem } from "@/lib/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Text, Image, Link, Box, Grid, GridItem } from "@chakra-ui/react";

interface OwnedNftItemProps {
  item: TokenItem & {
    whitelist: string[];
    balance?: string;
  };
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  isOriginal: boolean;
  isOwnedView?: boolean;
  loading: boolean;
  refetchBalances: () => void;
  handleModal: () => void;
  isAddressesLoading: boolean;
  soldOut?: boolean;
}

const OwnedNftItem = (props: OwnedNftItemProps) => {
  return (
    <Flex
      p={4}
      borderRadius={"21px"}
      border="1px solid #E9BDBD"
      w={"100%"}
      h={"100%"}
      direction={"column"}
      gap={4}
    >
      <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Text
          fontFamily={"Inter"}
          fontSize={16}
          fontWeight={500}
          color={"#585858"}
        >
          {`NFT ${props.item.tokenId}`}
        </Text>
        <Flex
          borderRadius={"30px"}
          border={"1px solid #EB7A7A73"}
          padding={"5px 16px 5px 8px"}
          gap={2.5}
        >
          <Image
            src="/icons/etherscan-icon.svg"
            alt="etherscan icon"
            h={24}
            w={24}
          />
          <Link
            href={`https://etherscan.io/token/${props.item.tokenId}`}
            isExternal
          >
            <ExternalLinkIcon color={"#DA7C7C"} h={"12px"} w={"12px"} />
          </Link>
        </Flex>
      </Flex>
      <Box>IMAGE HERE HEWWOOO</Box>
      {!props.isOriginal && (
        <Grid w={"100%"} gridTemplateColumns={"50% 50%"} gap={4}>
          <GridItem w={"100%"}>
            <Box
              padding={"12px 48px"}
              borderRadius={"999px"}
              border={"1px solid #D6D6D6"}
              color={"#585858"}
            >
              {`${props.item.batchId} Copy`}
            </Box>
          </GridItem>
          <GridItem w={"100%"}>
            <Box></Box>
          </GridItem>
        </Grid>
      )}
    </Flex>
  );
};

export default OwnedNftItem;
