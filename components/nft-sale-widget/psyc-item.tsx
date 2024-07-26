import React, { useEffect } from "react";
import { Box, Text, Spinner, Tooltip, Flex } from "@chakra-ui/react";
import NFTPrice from "@/components/commons/nftprice";
import MintButton from "@/components/ui/mint-button";
import useBuyNft from "@/hooks/useBuyNft";
import { useAccount } from "wagmi";
import { type TokenItem } from "@/lib/types";
import { useTokenSoldState } from "@/hooks/useTokenSoldState";
import useFetchProof from "@/hooks/useFetchProof";
import { useTokenContext } from "@/providers/TokenContext";
import Image from "next/image";
import ConnectWalletModal from "./commons/connect-wallet-modal";

interface PsycItemProps {
  item: TokenItem & { whitelist: string[] };
  index: number;
  isRandom: boolean;
  isPrivateSale: boolean;
  isOriginal: boolean;
  loading: boolean;
}

const PsycItem = ({
  item,
  index,
  isRandom,
  isPrivateSale,
  isOriginal,
  loading
}: PsycItemProps) => {
  const { buyNft, isPending, isConfirming, isMinting } = useBuyNft(
    isPrivateSale,
    isRandom,
    isOriginal
  );

  const { address } = useAccount();
  const { isSold, isLoading: isSoldLoading } = useTokenSoldState(
    parseInt(item.tokenId)
  );

  const { refetch } = useTokenContext();

  useEffect(() => {
    if (isSold) {
      refetch();
    }
  }, [isSold, refetch]);

  const [connectModalOpen, setConnectModalOpen] = React.useState(false);

  const proof = useFetchProof(address, item.ipfsHash, isPrivateSale);

  const isWhitelisted = address ? item.whitelist.includes(address) : false;

  const handleMint = async () => {
    await buyNft(
      parseInt(item.batchId),
      parseInt(item.tokenId),
      item.price,
      proof
    );
    refetch();
  };

  const isButtonDisabled =
    isOriginal && !isRandom && isSold
      ? true
      : isPending || isConfirming || isMinting || isSoldLoading;

  const modalNeeded = !address || (!isWhitelisted && isOriginal);

  return (
    <Flex
      key={index}
      maxW={isRandom ? "500px" : "170px"}
      mx="auto"
      w={"100%"}
      direction={"column"}
      gap={4}
      alignItems={"center"}
    >
      <Box
        w="100%"
        h={isRandom ? "195px" : "208px"}
        borderRadius={isRandom ? "15px" : "20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
      >
        <Image
          src={item.src}
          alt={`PSYC ${index + 1}`}
          fill
          objectFit="cover"
        />
        {isOriginal && isSold && !isRandom && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg={"#00000066"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold">
              Sold
            </Text>
          </Box>
        )}
        <NFTPrice price={item.price} />
      </Box>
      {isOriginal && (
        <Flex justifyContent="center" w="100%">
          <MintButton
            customStyle={{
              width: "100%",
              opacity: isButtonDisabled || modalNeeded ? 0.5 : 1,
              cursor: modalNeeded ? "help" : "default"
            }}
            onClick={modalNeeded ? () => setConnectModalOpen(true) : handleMint}
            isRandom={isRandom}
            isDisabled={isButtonDisabled}
          >
            {isMinting ? (
              <>
                <Spinner size="sm" mr={2} />
                Minting
              </>
            ) : (
              "Mint"
            )}
          </MintButton>
        </Flex>
      )}
      {!isOriginal && (
        <Flex justifyContent="center" w="100%">
          <MintButton
            customStyle={{ width: "100%", opacity: isButtonDisabled ? 0.5 : 1 }}
            onClick={
              modalNeeded
                ? () => setConnectModalOpen((prev) => !prev)
                : handleMint
            }
            isDisabled={isButtonDisabled}
            isRandom={isRandom}
          >
            {isMinting ? (
              <>
                <Spinner size="sm" mr={2} />
                Minting
              </>
            ) : (
              "Mint"
            )}
          </MintButton>
        </Flex>
      )}
      <ConnectWalletModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen((prev) => !prev)}
      />
    </Flex>
  );
};

export default PsycItem;
