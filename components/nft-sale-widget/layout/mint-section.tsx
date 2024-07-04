import React, { useEffect, useState, useRef, useMemo } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import { type GetAllSalesWithTokensData } from "@/services/types";
import PsycItem from "../psyc-item";
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

  const tokens = useMemo(() => {
    return (
      data?.sales.flatMap((sale) =>
        sale.tokensOnSale.map((token) => ({
          src: images[currentImageIndex % images.length] ?? "",
          price: `${parseFloat(sale.floorPrice) / 10 ** 18} ETH`,
          isSold: false,
          batchId: sale.batchID,
          tokenId: token.tokenID
        }))
      ) ?? []
    );
  }, [data, currentImageIndex]);

  useEffect(() => {
    if (isRandom && tokens.length > 0) {
      tokensRef.current = tokens;
      setRandomToken(tokens[currentImageIndex % tokens.length] ?? null);
    }
  }, [tokens, currentImageIndex, isRandom]);

  useEffect(() => {
    console.log(data, "data");
  }, [data]);

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;

  if (isRandom && randomToken) {
    return (
      <Box textAlign="center" py={4}>
        <Flex justifyContent="center">
          <PsycItem
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
            sm: "repeat(auto-fit, minmax(170px, 1fr))"
          }}
          gap={6}
        >
          {data?.sales.map((sale, saleIndex) =>
            sale.tokensOnSale.map((token) => (
              <PsycItem
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
