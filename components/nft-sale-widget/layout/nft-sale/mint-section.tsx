import React, { useEffect, useState, useMemo } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import { formatUnits } from "viem";

import type { Sale, TokenItem } from "@/lib/types";

import PsycItem from "../../psyc-item";
import SkeletonLayout from "../../common/skeleton-card";
import ConnectWalletModal from "../../common/connect-wallet-modal";

import useRandomImage from "@/hooks/useRandomImage";
import useImageData from "@/hooks/useImageData";
import usePrivateSale from "@/hooks/usePrivateSale";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import { useBatchSoldOut } from "@/hooks/useBatchSoldOut";

import getAvailableTokenIds from "@/utils/getAvailableTokenIds";
import { useSaleWidget } from "@/providers/SaleWidgetContext";
import useGetRandomCopies from "@/hooks/useGetRandomCopies";
interface MintSectionProps {
  isRandom: boolean;
}
interface WhitelistedTokenItem extends TokenItem {
  whitelist: string[];
  balance: string;
}

const getRandomAndOriginalTokenIds = (
  isOriginal: boolean,
  activeSale: Sale | undefined,
  randomCopies: {
    tokenID: string;
    tokenActive: boolean;
  }[]
) => {
  const specificTokenIds =
    activeSale?.tokensOnSale.map((token) => token.tokenID) ?? [];
  const randomCopiesFull = randomCopies.filter(
    (token) => token.tokenActive === true
  );
  const randomCopiesIds = randomCopiesFull.map((token) => token.tokenID);

  const availableRandomTokenIds = isOriginal
    ? activeSale?.tokensOnSale
        .filter((token) => token.buyer === null)
        .map((token) => token.tokenID) ?? []
    : randomCopiesIds;

  const randomTokenIds =
    availableRandomTokenIds.length === 0
      ? activeSale?.tokensOnSale.map((token) => token.tokenID) ?? []
      : availableRandomTokenIds;

  return {
    specificTokenIds,
    randomTokenIds
  };
};

const MintSection = ({ isRandom }: MintSectionProps) => {
  const { activeSale, isOriginal } = useSaleWidget();
  const [randomToken, setRandomToken] = useState<WhitelistedTokenItem | null>(
    null
  );

  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});
  const { isLoading, isPrivateSale } = usePrivateSale();
  const { isLoading: isAddressesLoading, getAddresses } = useGetAddresses();
  const randomCopiesIds = useGetRandomCopies(activeSale, isRandom, isOriginal);

  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // const imageIds = activeSale?.tokensOnSale.map((token) => token.tokenID) ?? [];
  const { randomTokenIds, specificTokenIds } = getRandomAndOriginalTokenIds(
    isOriginal,
    activeSale,
    randomCopiesIds
  );

  const { imageUris, loading: imageUrisLoading } = useImageData(
    isRandom ? randomTokenIds : specificTokenIds
  );

  const currentImageIndex = useRandomImage(isRandom, imageUris);
  const isSoldOut = useBatchSoldOut(activeSale, isPrivateSale);

  const activeTokens = useMemo(() => {
    if (!activeSale) return [];
    const availableTokens = isRandom ? randomTokenIds : specificTokenIds;
    return availableTokens.map((token, index) => ({
      src: imageUris[index] ?? "",
      price: `${formatUnits(BigInt(activeSale.floorPrice), 18)}`,
      isSold: false,
      batchId: activeSale.batchID,
      tokenId: token,
      ipfsHash: activeSale.ipfsHash,
      whitelist: whitelist[activeSale.ipfsHash] ?? [],
      balance: "0"
    }));
  }, [activeSale, imageUris, whitelist]);

  const fetchWhitelist = async () => {
    if (activeSale) {
      try {
        const addresses = await getAddresses(activeSale.ipfsHash);
        if (addresses && !isAddressesLoading) {
          setWhitelist((prev) => ({
            ...prev,
            [activeSale.ipfsHash]: addresses
          }));
        }
      } catch (error) {
        console.error("Error fetching whitelist addresses:", error);
      }
    }
  };
  useEffect(() => {
    if (activeSale) {
      fetchWhitelist().catch((error) => {
        console.error("Error fetching whitelist:", error);
      });
    }
  }, [activeSale]);

  useEffect(() => {
    if (isRandom && activeTokens.length > 0) {
      setRandomToken(
        activeTokens[currentImageIndex % activeTokens.length] ?? null
      );
    } else if (isRandom && activeTokens.length === 0 && activeSale) {
      setRandomToken({
        src: imageUris[0] ?? "",
        price: `${formatUnits(BigInt(activeSale.floorPrice), 18)}`,
        isSold: false,
        batchId: activeSale.batchID,
        tokenId: "0",
        ipfsHash: activeSale.ipfsHash,
        whitelist: whitelist[activeSale.ipfsHash] ?? [],
        balance: "0"
      });
    }
  }, [activeTokens, currentImageIndex, isRandom]);

  if (imageUrisLoading) {
    return <SkeletonLayout isRandom={isRandom} />;
  }

  const privateSaleStatus = !isLoading && isPrivateSale;

  return (
    <Flex textAlign="center" py={4} px={4} justifyContent={"center"}>
      {isRandom && randomToken ? (
        <Flex justifyContent="center" w={"100%"}>
          <PsycItem
            item={randomToken}
            index={currentImageIndex}
            isRandom={true}
            isPrivateSale={privateSaleStatus}
            isOriginal={isOriginal}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            refetchBalances={() => {}}
            handleModal={handleModal}
            isAddressesLoading={isAddressesLoading}
            soldOut={isSoldOut}
          />
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "minmax(170px, 1fr)",
            sm: "repeat(auto-fit, minmax(170px, 1fr))"
          }}
          gap={6}
          justifyItems={"center"}
          maxW={"100%"}
        >
          {activeSale?.tokensOnSale.map((token, index) => (
            <PsycItem
              key={token.id}
              item={{
                src: imageUris[index] ?? "",
                price: `${formatUnits(BigInt(activeSale.ceilingPrice), 18)}`,
                isSold: false,
                batchId: activeSale.batchID,
                tokenId: token.tokenID,
                ipfsHash: activeSale.ipfsHash,
                whitelist: whitelist[activeSale.ipfsHash] ?? [],
                balance: "0"
              }}
              index={parseInt(token.id, 10)}
              isRandom={isRandom}
              isPrivateSale={privateSaleStatus}
              isOriginal={isOriginal}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              refetchBalances={() => {}}
              handleModal={handleModal}
              isAddressesLoading={isAddressesLoading}
              soldOut={false}
            />
          ))}
        </Grid>
      )}
      <ConnectWalletModal isOpen={isOpen} onClose={handleModal} />
    </Flex>
  );
};

export default MintSection;
