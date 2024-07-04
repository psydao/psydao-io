import React, { useEffect, useState, useRef, useMemo } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import { type GetAllSalesWithTokensData } from "@/services/types";
import NFTItem from "../psyc-item";
import useRandomImage from "@/hooks/useRandomImage";

interface MintSectionProps {
  isRandom: boolean;
}

export interface TokenItem {
  src: string;
  price: string;
  isSold: boolean;
  batchId: string;
  tokenId: string;
}

const images = ["/psyc1.png", "/psyc2.png", "/psyc3.png", "/psyc4.png"];

const MintSection = ({ isRandom }: MintSectionProps) => {
  const { loading, error, data } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const currentImageIndex = useRandomImage(isRandom, images);
  const tokensRef = useRef<TokenItem[]>([]);
  const [randomToken, setRandomToken] = useState<TokenItem | null>(null);

  useEffect(() => {
    if (isRandom && tokensRef.current.length > 0) {
      setRandomToken(
        tokensRef.current[currentImageIndex % tokensRef.current.length] ?? null
      );
    }
  }, [currentImageIndex, isRandom]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const tokens = useMemo(
    () =>
      data?.sales.flatMap((sale) =>
        sale.tokensOnSale.map((token) => ({
          src: images[currentImageIndex % images.length] ?? "",
          price: `${parseFloat(sale.ceilingPrice) / 10 ** 18} ETH`,
          isSold: false,
          batchId: sale.batchID,
          tokenId: token.tokenID
        }))
      ) ?? [],
    [data, currentImageIndex]
  );

  tokensRef.current = tokens;

  if (isRandom && randomToken) {
    return (
      <Box textAlign="center" py={4}>
        <Flex justifyContent="center">
          <NFTItem
            item={randomToken}
            index={currentImageIndex}
            isRandom={true}
            isPrivateSale={false}
          />
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box textAlign="center" py={4} px={4}>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(auto-fit, minmax(130px, 1fr))"
          }}
          gap={6}
        >
          {data?.sales.map((sale, saleIndex) =>
            sale.tokensOnSale.map((token) => (
              <NFTItem
                isPrivateSale={false}
                key={token.id}
                item={{
                  src: images[saleIndex % images.length] ?? "",
                  price: `${parseFloat(sale.ceilingPrice) / 10 ** 18} ETH`,
                  isSold: false,
                  batchId: sale.batchID,
                  tokenId: token.tokenID
                }}
                index={parseInt(token.id, 10)}
                isRandom={false}
              />
            ))
          )}
        </Grid>
      </Box>
    );
  }
};

export default MintSection;
