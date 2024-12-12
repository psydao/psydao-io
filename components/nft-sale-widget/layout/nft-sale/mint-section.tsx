import React from "react";
import { Flex, Grid } from "@chakra-ui/react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import PsycItem from "../../psyc-item";
import SkeletonLayout from "../../common/skeleton-card";
import ConnectWalletModal from "../../common/connect-wallet-modal";

import useUserCopyBalances from "@/hooks/useUserCopyBalances";

import type { Sale, TokenItem, TokenOnSale } from "@/lib/types";
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
    allSales,
    isOriginal,
    randomToken,
    imageUris,
    imageUrisLoading,
    privateSaleStatus,
    whitelist,
    currentImageIndex
  } = useMintSection(isRandom);

  const { address } = useAccount();
  const { refetchBalances } = useUserCopyBalances(allSales, address);

  if (imageUrisLoading || (isRandom && !randomToken)) {
    return <SkeletonLayout isRandom={isRandom} />;
  }

  const tokensOnSale = allSales?.flatMap((sale) => sale.tokensOnSale);

  return (
    <Flex textAlign="center" pb={4} px={4} justifyContent="center">
      {isRandom && randomToken ? (
        <RandomPsycItem
          token={randomToken}
          index={currentImageIndex}
          privateSaleStatus={privateSaleStatus}
          isOriginal={isOriginal}
          handleModal={handleModal}
          refetchBalances={refetchBalances}
        />
      ) : allSales ? (
        <SpecificPsycItems
          tokens={tokensOnSale ?? []}
          imageUris={imageUris}
          activeSales={allSales}
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
  refetchBalances: () => void;
}> = ({
  token,
  index,
  privateSaleStatus,
  isOriginal,
  handleModal,
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
      refetchBalances={refetchBalances}
    />
  </Flex>
);

const SpecificPsycItems: React.FC<{
  tokens: TokenOnSale[];
  imageUris: string[];
  activeSales: Sale[] | undefined;
  whitelist: { [key: string]: string[] };
  privateSaleStatus: boolean;
  isOriginal: boolean;
  handleModal: () => void;
  refetchBalances: () => void;
}> = ({
  tokens,
  imageUris,
  whitelist,
  privateSaleStatus,
  isOriginal,
  handleModal,
  refetchBalances
}) => {
  console.log("tokens", tokens, "imageUris", imageUris);
  return (
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
            price: formatUnits(BigInt(token.sale.ceilingPrice), 18),
            isSold: false,
            batchId: token.sale.batchID,
            tokenId: token.tokenID,
            ipfsHash: token.sale.ipfsHash,
            whitelist: whitelist[token.sale.ipfsHash] ?? [],
            balance: "0"
          }}
          index={parseInt(token.id, 10)}
          isRandom={false}
          isPrivateSale={privateSaleStatus}
          isOriginal={isOriginal}
          handleModal={handleModal}
          refetchBalances={refetchBalances}
        />
      ))}
    </Grid>
  );
};

export default MintSection;
