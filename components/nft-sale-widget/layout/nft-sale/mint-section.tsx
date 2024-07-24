import React, { useEffect, useState, useMemo } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import type { TokenItem, GetAllSalesWithTokensData, Sale } from "@/lib/types";
import { formatUnits } from "viem";
import PsycItem from "../../psyc-item";
import useRandomImage from "@/hooks/useRandomImage";
import { getAddresses } from "@/lib/server-utils";
import usePrivateSale from "@/hooks/usePrivateSale";

interface MintSectionProps {
  isRandom: boolean;
  activeSale: Sale | undefined;
  isOriginal: boolean;
}

interface WhitelistedTokenItem extends TokenItem {
  whitelist: string[];
}

const MintSection = ({
  isRandom,
  activeSale,
  isOriginal
}: MintSectionProps) => {
  const { loading, error, data } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );

  useEffect(() => {
    console.log(data?.sales, "sales");
  }, [data]);

  const images = useMemo(() => {
    if (!activeSale) return [];
    return activeSale.tokensOnSale.map(
      (_, index) => `/psyc${(index % 3) + 1}.webp`
    );
  }, [activeSale]);

  const currentImageIndex = useRandomImage(isRandom, images);
  const [randomToken, setRandomToken] = useState<WhitelistedTokenItem | null>(
    null
  );
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});

  const { isLoading, isPrivateSale } = usePrivateSale();

  useEffect(() => {
    console.log(!isLoading && isPrivateSale, "isPrivateSale");
  }, [isPrivateSale]);

  useEffect(() => {
    if (activeSale) {
      const fetchWhitelist = async () => {
        try {
          const addresses = await getAddresses(activeSale.ipfsHash);
          setWhitelist((prev) => ({
            ...prev,
            [activeSale.ipfsHash]: addresses
          }));
        } catch (error) {
          console.error("Error fetching whitelist addresses:", error);
        }
      };
      fetchWhitelist().catch((error) => {
        console.error("Error fetching whitelist:", error);
      });
    }
  }, [activeSale]);

  const activeTokens = useMemo(() => {
    if (!activeSale) return [];
    return activeSale.tokensOnSale.map((token, index) => ({
      src: images[index] ?? "",
      price: `${formatUnits(BigInt(activeSale.floorPrice), 18)}`,
      isSold: false,
      batchId: activeSale.batchID,
      tokenId: token.tokenID,
      ipfsHash: activeSale.ipfsHash,
      whitelist: whitelist[activeSale.ipfsHash] ?? []
    }));
  }, [activeSale, images, whitelist]);

  useEffect(() => {
    if (isRandom && activeTokens.length > 0) {
      setRandomToken(
        activeTokens[currentImageIndex % activeTokens.length] ?? null
      );
    }
  }, [activeTokens, currentImageIndex, isRandom]);

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;

  const privateSale = !isLoading && isPrivateSale;

  return (
    <Box textAlign="center" py={4} px={4}>
      {isRandom && randomToken ? (
        <Flex justifyContent="center">
          <PsycItem
            item={randomToken}
            index={currentImageIndex}
            isRandom={true}
            isPrivateSale={privateSale}
            isOriginal={isOriginal}
            loading={loading}
          />
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(auto-fit, minmax(170px, 1fr))"
          }}
          gap={6}
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
                whitelist: whitelist[activeSale.ipfsHash] ?? []
              }}
              index={parseInt(token.id, 10)}
              isRandom={isRandom}
              isPrivateSale={privateSale}
              isOriginal={isOriginal}
              loading={loading}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MintSection;
