import { Box, Flex, Grid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { countNumberOfCopies } from "@/utils/countNumberOfCopies";
import { OwnedNFTItem } from "./owned-nft-item";
import { type GetTokensByOwnerData } from "@/lib/types";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const images = ["/psyc1.webp", "/psyc2.webp", "/psyc3.webp", "/psyc4.webp"];
  const { address } = useAccount();
  const numberOfCopies = countNumberOfCopies(props.nftData ?? { tokens: [] });

  if (!address) {
    return null;
  }

  return (
    <Flex justifyContent={"center"} py={4} px={4}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(auto-fit, minmax(170px, 1fr))"
        }}
        gap={6}
        justifyContent="left"
      >
        {props.nftData?.tokens.map((token, index) => (
          <OwnedNFTItem
            key={index}
            item={{
              src: images[index % images.length] ?? "",
              owner: token.owner,
              tokenId: token.tokenId
            }}
            copiesOwned={numberOfCopies[token.tokenId] ?? 0}
            src={images[index % images.length] ?? ""}
            index={index}
            isPrivateSale={false}
            isOwned={token.owner === address}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default OwnedNfts;
