import MintButton from "@/components/ui/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import type { TokenItem } from "@/lib/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Link,
  Box,
  Grid,
  GridItem,
  Spinner
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import FullSizeImageModal from "@/components/common/image-modal";
import {
  psycNFTCopiesMainnet,
  psycNFTCopiesSepolia,
  psyNFTMainnet,
  psyNFTSepolia
} from "@/constants/contracts";

interface OwnedNftItemProps {
  item: TokenItem & {
    whitelist: string[];
    balance?: string;
  };
  index: number;
  isPrivateSale: boolean;
  isOriginal: boolean;
  isOwnedView?: boolean;
  refetchBalances: () => void;
}

const OwnedNftItem = (props: OwnedNftItemProps) => {
  const CHAINID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) ?? 1;
  const contractAddress =
    CHAINID === 1
      ? props.isOriginal
        ? psyNFTMainnet
        : psycNFTCopiesMainnet
      : props.isOriginal
        ? psyNFTSepolia
        : psycNFTCopiesSepolia;
  const tokenURL =
    CHAINID === 1
      ? `${process.env.NEXT_PUBLIC_MAINNET_ETHERSCAN_BASE_URL}/${contractAddress}/${props.item.tokenId}`
      : `${process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL}/${contractAddress}/${props.item.tokenId}`;
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
            height={24}
            width={24}
          />
          <Link href={tokenURL} isExternal>
            <ExternalLinkIcon color={"#DA7C7C"} h={"12px"} w={"12px"} />
          </Link>
        </Flex>
      </Flex>
      <Box
        w="100%"
        h={"208px"}
        borderRadius={"20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
        onClick={() => setIsImageOpen((prev) => !prev)}
        cursor={"pointer"}
      >
        <Image
          src={props.item.src}
          alt={`PSYC ${props.index + 1}`}
          fill
          objectFit="cover"
        />
      </Box>
      {!props.isOriginal && (
        <Grid
          w={"100%"}
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={4}
        >
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
      <FullSizeImageModal
        isOpen={isImageOpen}
        imageSrc={props.item.src}
        onClose={() => {
          setIsImageOpen((prev) => !prev);
        }}
      />
    </Flex>
  );
};

export default OwnedNftItem;
