import { Box, Grid } from "@chakra-ui/react";
import OwnedNftsEmptyState from "./owned-nfts-empty-state";

import OwnedNfts from "./owned-nfts";

import { useTokenContext } from "@/providers/TokenContext";

type OwnedNftsContentProps = {
  isFullScreen: boolean;
};

const OwnedNftsContent = ({ isFullScreen }: OwnedNftsContentProps) => {
  const { data, loading, error, tokenCount } = useTokenContext();

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;

  return (
    <>
      {tokenCount > 0 ? (
        <OwnedNfts nftData={data} />
      ) : (
        <Grid
          minH={"100%"}
          h={"100%"}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateRows={{
            base: "30% 100%",
            md: isFullScreen ? "75% 100%" : "15% 100%"
          }}
        >
          <OwnedNftsEmptyState />
        </Grid>
      )}
    </>
  );
};

export default OwnedNftsContent;
