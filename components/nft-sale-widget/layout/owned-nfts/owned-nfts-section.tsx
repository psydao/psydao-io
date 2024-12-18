import { Grid } from "@chakra-ui/react";
import OwnedNftsEmptyState from "./owned-nfts-empty-state";
import OwnedNfts from "./owned-nfts";
import { useTokenContext } from "@/providers/TokenContext";
import { useSaleWidget } from "@/providers/SaleWidgetContext";

const OwnedNftsContent = () => {
  const { data, tokenCount } = useTokenContext();

  const {
    allSalesData,
    isOriginal,
    isLoading,
    fullScreenWindow: isFullScreen
  } = useSaleWidget();

  const EmptyStateText = (
    <>
      You don't own any <br /> PSYCs yet
    </>
  );

  return (
    <>
      {tokenCount > 0 ? (
        <OwnedNfts
          nftData={data}
          isOriginal={isOriginal}
          allSales={allSalesData?.sales ?? []}
          isLoading={isLoading}
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
