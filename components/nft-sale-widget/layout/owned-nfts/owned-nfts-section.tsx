import { Box, Grid } from "@chakra-ui/react";
import OwnedNftsEmptyState from "./owned-nfts-empty-state";
import OwnedNfts from "./owned-nfts";
import { useTokenContext } from "@/providers/TokenContext";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { type Sale } from "@/lib/types";

type OwnedNftsContentProps = {
  isFullScreen: boolean;
  isOriginal: boolean;
  activeSale: Sale | undefined;
};

const OwnedNftsContent = ({
  isFullScreen,
  isOriginal,
  activeSale
}: OwnedNftsContentProps) => {
  const { data, loading, error, tokenCount, setTokenCount } = useTokenContext();
  const { address } = useAccount();

  useEffect(() => {
    if (address && data) {
      setTokenCount(data?.tokens.length ?? 0);
    }
  }, [address, data, setTokenCount]);

  const EmptyStateText = (
    <>
      You don't own any <br /> PSYCs yet
    </>
  );

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;

  return (
    <>
      {tokenCount > 0 ? (
        <OwnedNfts
          nftData={data}
          isOriginal={isOriginal}
          activeSale={activeSale}
          isFullScreen={isFullScreen}
        />
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
          <OwnedNftsEmptyState text={EmptyStateText} />
        </Grid>
      )}
    </>
  );
};

export default OwnedNftsContent;
