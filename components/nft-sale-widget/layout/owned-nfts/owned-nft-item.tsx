import MintButton from "@/components/ui/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import type { TokenItem } from "@/lib/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Image,
  Link,
  Box,
  Grid,
  GridItem,
  Spinner
} from "@chakra-ui/react";
import { useState } from "react";

interface OwnedNftItemProps {
  item: TokenItem & {
    whitelist: string[];
    balance?: string;
  };
  index: number;
  isPrivateSale: boolean;
  isOriginal: boolean;
  isOwnedView?: boolean;
  loading: boolean;
  refetchBalances: () => void;
  isAddressesLoading: boolean;
}

const OwnedNftItem = (props: OwnedNftItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting } = useBuyNft(
    props.isPrivateSale,
    false,
    props.isOriginal,
    props.refetchBalances
  );

  const handleMint = async () => {
    await buyNft(
      parseInt(props.item.batchId),
      parseInt(props.item.tokenId),
      props.item.price ?? "0.00",
      []
    );
  };

  const isButtonDisabled =
    isPending ||
    isConfirming ||
    isMinting ||
    props.isOriginal ||
    props.isPrivateSale;

  const [isImageOpen, setIsImageOpen] = useState(false);

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
            h={6}
            w={6}
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
        <Grid w={"100%"} gridTemplateColumns={"1fr 1fr"} gap={4}>
          <GridItem w={"100%"}>
            <Flex
              padding={"12px 48px"}
              borderRadius={"999px"}
              border={"1px solid #D6D6D6"}
              color={"#585858"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {props.item.balance && props.item.balance === "1"
                ? `${props.item.balance} Copy`
                : `${props.item.balance} Copies`}
            </Flex>
          </GridItem>
          <GridItem w={"100%"}>
            <MintButton
              onClick={handleMint}
              isDisabled={isButtonDisabled}
              customStyle={{
                width: "100%"
              }}
              ownedView
            >
              {isPending || isConfirming ? (
                <>
                  <Spinner size="sm" mr={2} />
                  Minting
                </>
              ) : (
                "Mint"
              )}
            </MintButton>
          </GridItem>
        </Grid>
      )}
    </Flex>
  );
};

export default OwnedNftItem;
