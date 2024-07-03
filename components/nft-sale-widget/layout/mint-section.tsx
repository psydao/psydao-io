import React, { useEffect, useState } from "react";
import { Box, Grid, Flex } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import { type GetAllSalesWithTokensData } from "@/services/types";
import NFTItem from "../commons/nft-item";
import { MintRandomSection } from "./mint-random-section";

interface MintSectionProps {
  isRandom: boolean;
}

const images = ["/psyc1.png", "/psyc2.png", "/psyc3.png", "/psyc4.png"];

const MintSection = ({ isRandom }: MintSectionProps) => {
  const { loading, error, data } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isRandom) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRandom]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const tokens = data?.sales.flatMap((sale) =>
    sale.tokensOnSale.map((token) => ({
      src: images[currentImageIndex % images.length] ?? "",
      price: `${parseFloat(sale.ceilingPrice) / 10 ** 18} ETH`,
      isSold: false,
      batchId: sale.batchID,
      tokenId: token.tokenID
    }))
  );

  if (isRandom && tokens) {
    return (
      <MintRandomSection
        tokens={tokens}
        currentImageIndex={currentImageIndex}
      />
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
