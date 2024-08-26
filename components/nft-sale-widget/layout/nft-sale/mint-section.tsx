import React from "react";
import { Flex, Grid } from "@chakra-ui/react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import PsycItem from "../../psyc-item";
import SkeletonLayout from "../../common/skeleton-card";
import ConnectWalletModal from "../../common/connect-wallet-modal";

import useUserCopyBalances from "@/hooks/useUserCopyBalances";

import type { Sale, TokenItem } from "@/lib/types";
import { useMintSection } from "../../hooks/useMintSection";
interface MintSectionProps {
  isRandom: boolean;
}
interface WhitelistedTokenItem extends TokenItem {
  whitelist: string[];
  balance: string;
}
const MintSection = ({ isRandom }: MintSectionProps) => {
  const {
    isOpen,
    handleModal,
    activeSale,
    isOriginal,
    randomToken,
    imageUris,
    imageUrisLoading,
    privateSaleStatus,
    isSoldOut,
    whitelist,
    currentImageIndex
  } = useMintSection(isRandom);

  const { address } = useAccount();
  const { refetchBalances } = useUserCopyBalances(activeSale, address);

  if (imageUrisLoading) {
    return <SkeletonLayout isRandom={isRandom} />;
  }

  return (
    <Flex textAlign="center" py={4} px={4} justifyContent="center">
      {isRandom && randomToken ? (
        <RandomPsycItem
          token={randomToken}
          index={currentImageIndex}
          privateSaleStatus={privateSaleStatus}
          isOriginal={isOriginal}
          handleModal={handleModal}
          isSoldOut={isSoldOut}
          refetchBalances={refetchBalances}
        />
      ) : activeSale ? (
        <SpecificPsycItems
          tokens={activeSale?.tokensOnSale ?? []}
          imageUris={imageUris}
          activeSale={activeSale}
          whitelist={whitelist}
          privateSaleStatus={privateSaleStatus}
          isOriginal={isOriginal}
          handleModal={handleModal}
          refetchBalances={refetchBalances}
        />
      ) : null}
      <ConnectWalletModal isOpen={isOpen} onClose={handleModal} />
    </Flex>
  );
};

const RandomPsycItem: React.FC<{
  token: WhitelistedTokenItem;
  index: number;
  privateSaleStatus: boolean;
  isOriginal: boolean;
  handleModal: () => void;
  isSoldOut: boolean;
  refetchBalances: () => void;
}> = ({
  token,
  index,
  privateSaleStatus,
  isOriginal,
  handleModal,
  isSoldOut,
  refetchBalances
}) => (
  <Flex justifyContent="center" w="100%">
    <PsycItem
      item={token}
      index={index}
      isRandom={true}
      isPrivateSale={privateSaleStatus}
      isOriginal={isOriginal}
      handleModal={handleModal}
      soldOut={isSoldOut}
      refetchBalances={refetchBalances}
    />
  </Flex>
);

const SpecificPsycItems: React.FC<{
  tokens: { id: string; tokenID: string }[];
  imageUris: string[];
  activeSale: Sale;
  whitelist: { [key: string]: string[] };
  privateSaleStatus: boolean;
  isOriginal: boolean;
  handleModal: () => void;
  refetchBalances: () => void;
}> = ({
  tokens,
  imageUris,
  activeSale,
  whitelist,
  privateSaleStatus,
  isOriginal,
  handleModal,
  refetchBalances
}) => (
  <Grid
    templateColumns={{
      base: "minmax(170px, 1fr)",
      sm: "repeat(auto-fit, minmax(170px, 1fr))"
    }}
    gap={6}
    justifyItems="center"
    maxW="100%"
  >
    {tokens.map((token, index) => (
      <PsycItem
        key={token.id}
        item={{
          src: imageUris[index] ?? "",
          price: formatUnits(BigInt(activeSale.ceilingPrice), 18),
          isSold: false,
          batchId: activeSale.batchID,
          tokenId: token.tokenID,
          ipfsHash: activeSale.ipfsHash,
          whitelist: whitelist[activeSale.ipfsHash] ?? [],
          balance: "0"
        }}
        index={parseInt(token.id, 10)}
        isRandom={false}
        isPrivateSale={privateSaleStatus}
        isOriginal={isOriginal}
        handleModal={handleModal}
        soldOut={false}
        refetchBalances={refetchBalances}
      />
    ))}
  </Grid>
);

export default MintSection;
