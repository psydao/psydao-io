import React, { useEffect, useState, useMemo } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import type { TokenItem, GetAllSalesWithTokensData, Sale } from "@/lib/types";
import { formatUnits } from "viem";
import PsycItem from "../../psyc-item";
import useRandomImage from "@/hooks/useRandomImage";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import usePrivateSale from "@/hooks/usePrivateSale";
import { useAccount } from "wagmi";
import ConnectWalletModal from "../../commons/connect-wallet-modal";
import useGetOnlyWhitelistedSales from "@/hooks/useGetOnlyWhitelistedSales";

interface MintSectionProps {
  isRandom: boolean;
  activeSale: Sale | undefined;
  isFullscreen?: boolean;
  isOriginal: boolean;
}

interface WhitelistedTokenItem extends TokenItem {
  whitelist: string[];
  balance: string;
}

const MintSection = ({
  isRandom,
  activeSale,
  isOriginal
}: MintSectionProps) => {
  const { loading, error, data } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const { address } = useAccount();
  const [randomToken, setRandomToken] = useState<WhitelistedTokenItem | null>(
    null
  );
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});
  const { isLoading, isPrivateSale } = usePrivateSale();
  const { isLoading: isAddressesLoading, getAddresses } = useGetAddresses();

  useGetOnlyWhitelistedSales(address);

  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const images = useMemo(() => {
    if (!activeSale) return [];
    return activeSale.tokensOnSale.map(
      (_, index) => `/psyc${(index % 3) + 1}.webp`
    );
  }, [activeSale]);

  const currentImageIndex = useRandomImage(isRandom, images);

  const activeTokens = useMemo(() => {
    if (!activeSale) return [];
    return activeSale.tokensOnSale.map((token, index) => ({
      src: images[index] ?? "",
      price: `${formatUnits(BigInt(activeSale.floorPrice), 18)}`,
      isSold: false,
      batchId: activeSale.batchID,
      tokenId: token.tokenID,
      ipfsHash: activeSale.ipfsHash,
      whitelist: whitelist[activeSale.ipfsHash] ?? [],
      balance: "0" // Default balance for mint section
    }));
  }, [activeSale, images, whitelist]);

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
    }
  }, [activeTokens, currentImageIndex, isRandom]);

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;

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
            loading={loading}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            refetchBalances={() => {}}
            handleModal={handleModal}
            isAddressesLoading={isAddressesLoading}
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
                src: `/psyc${(index % 3) + 1}.webp`,
                price: `${formatUnits(BigInt(activeSale.ceilingPrice), 18)}`,
                isSold: false,
                batchId: activeSale.batchID,
                tokenId: token.tokenID,
                ipfsHash: activeSale.ipfsHash,
                whitelist: whitelist[activeSale.ipfsHash] ?? [],
                balance: "0" // Default balance for mint section
              }}
              index={parseInt(token.id, 10)}
              isRandom={isRandom}
              isPrivateSale={privateSaleStatus}
              isOriginal={isOriginal}
              loading={loading}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              refetchBalances={() => {}}
              handleModal={handleModal}
              isAddressesLoading={isAddressesLoading}
            />
          ))}
        </Grid>
      )}
      <ConnectWalletModal isOpen={isOpen} onClose={handleModal} />
    </Flex>
  );
};

export default MintSection;
