import React, { useEffect, useState, useRef, useMemo } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import type { TokenItem, GetAllSalesWithTokensData, Sale } from "@/lib/types";
import { formatUnits } from "viem";
import PsycItem from "../../psyc-item";
import useRandomImage from "@/hooks/useRandomImage";

interface MintSectionProps {
  isRandom: boolean;
  activeSale: Sale | undefined;
}

const images = ["/psyc1.webp", "/psyc2.webp", "/psyc3.webp", "/psyc4.webp"];

const MintSection = (props: MintSectionProps) => {
  const { loading, error, data } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const currentImageIndex = useRandomImage(props.isRandom, images);
  const tokensRef = useRef<TokenItem[]>([]);
  const [randomToken, setRandomToken] = useState<TokenItem | null>(null);

  const tokens = useMemo(() => {
    return (
      data?.sales.flatMap((sale) =>
        sale.tokensOnSale.map((token) => ({
          src: images[currentImageIndex % images.length] ?? "",
          price: `${formatUnits(BigInt(sale.floorPrice), 18)}`,
          isSold: false,
          batchId: sale.batchID,
          tokenId: token.tokenID
        }))
      ) ?? []
    );
  }, [data, currentImageIndex]);

  useEffect(() => {
    if (props.isRandom && tokens.length > 0) {
      tokensRef.current = tokens;
      setRandomToken(tokens[currentImageIndex % tokens.length] ?? null);
    }
  }, [tokens, currentImageIndex, props.isRandom]);

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;
  const tokenIdsForActivation = props.activeSale
    ? props.activeSale.tokensOnSale.map((token) => parseInt(token.tokenID))
    : [];

  if (props.isRandom && randomToken) {
    const tokenIdsForActivation = tokensRef.current.map((token) =>
      parseInt(token.tokenId)
    );

    return (
      <Box textAlign="center" py={4}>
        <Flex justifyContent="center">
          <PsycItem
            item={randomToken}
            index={currentImageIndex}
            isRandom={true}
            isPrivateSale={false}
            loading={loading}
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
          {props.activeSale?.tokensOnSale.map((token, index) => (
            <PsycItem
              isPrivateSale={true}
              key={token.id}
              item={{
                src: images[index % images.length] ?? "",
                price: `${formatUnits(BigInt(props.activeSale ? props.activeSale.ceilingPrice : "0"), 18)}`,
                isSold: false,
                batchId: props.activeSale ? props.activeSale.batchID : "1",
                tokenId: token.tokenID
              }}
              index={parseInt(token.id, 10)}
              isRandom={props.isRandom}
              loading={loading}
            />
          ))}
        </Grid>
      </Box>
    );
  }
};

export default MintSection;
