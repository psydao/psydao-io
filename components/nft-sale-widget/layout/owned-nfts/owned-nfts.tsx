import { Box, Grid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { countNumberOfCopies } from "@/utils/countNumberOfCopies";
import { OwnedNFTItem } from "./owned-nft-item";
import { type GetTokensByOwnerData } from "@/lib/types";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const images = ["/psyc1.png", "/psyc2.png", "/psyc3.png", "/psyc4.png"];
  const { address } = useAccount();
  console.log(props.nftData, "nftData");
  const numberOfCopies = countNumberOfCopies(props.nftData ?? { tokens: [] });

  // TODO: Add check to see if sale is private and re-add price and mint button if public
  return (
    <Box textAlign="left" py={4} px={4} maxWidth="170px">
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
            // TODO: Add public and private sale checks
            isPrivateSale={false}
            isOwned={token.owner === address}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default OwnedNfts;
