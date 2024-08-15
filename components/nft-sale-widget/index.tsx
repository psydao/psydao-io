import { useEffect, useMemo, useState } from "react";
import {
  Image,
  useMediaQuery,
  TabPanel,
  TabPanels,
  Tabs,
  Grid
} from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import MintPsycHeader from "./layout/nft-sale/mint-psyc-header";
import PsycSaleContent from "./layout/nft-sale/psyc-sale-content";
import OwnedNftsContent from "./layout/owned-nfts/owned-nfts-section";
import { TokenProvider } from "@/providers/TokenContext";
import type { Sale, GetSaleByIdData } from "@/lib/types";
import { useQuery } from "@apollo/client";
import { getSaleById } from "@/services/graph";
import { InterimState } from "../commons/interim-state";
import NFTSaleWidgetEmptyState from "./layout/nft-sale-widget-empty";
import useGetOnlyWhitelistedSales from "@/hooks/useGetOnlyWhitelistedSales";
import { useAccount } from "wagmi";
import WrongNetworkWindow from "../commons/wrong-network";

export const NftSaleWidget = ({ updateTrigger }: { updateTrigger: number }) => {
  const { address, chainId } = useAccount();
  const { whitelistedSales, loading: whitelistedSalesLoading } =
    useGetOnlyWhitelistedSales(address);
  const [activeSale, setActiveSale] = useState<Sale>();
  const [isOriginal, setIsOriginal] = useState<boolean>(false);
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { data, loading, error, refetch } = useQuery<GetSaleByIdData>(
    getSaleById,
    {
      variables: { id: activeSale ? activeSale.id : whitelistedSales[0]?.id },
      skip:
        !activeSale &&
        (whitelistedSalesLoading || whitelistedSales.length === 0)
    }
  );

  const CHAINID = process.env.NEXT_PUBLIC_CHAIN_ID ?? 1;
  const isWrongNetwork = chainId !== Number(CHAINID);

  useEffect(() => {
    if (
      !whitelistedSalesLoading &&
      whitelistedSales.length > 0 &&
      !activeSale
    ) {
      setActiveSale(whitelistedSales[0]);
    }
  }, [whitelistedSalesLoading, whitelistedSales, activeSale]);

  useEffect(() => {
    const refetchData = async () => {
      if (updateTrigger) {
        await refetch();
        console.log("Refetching data");
      }
    };
    refetchData().catch(console.error);
  }, [updateTrigger, refetch, activeSale]);

  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    return state.fullScreen === "nft-sale";
  }, [state]);

  const isLoading = loading;

  return (
    <Window
      id="nft-sale"
      height={fullScreenWindow ? "100%" : isLargerThanMd ? "500px" : "80%"}
      width={fullScreenWindow ? "100%" : isLargerThanMd ? "655px" : "95%"}
      top={{
        base: fullScreenWindow ? "0" : "60%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "56%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content py={2} px={0} height={"100%"} width={"100%"}>
        <TokenProvider>
          {address && isWrongNetwork ? (
            <WrongNetworkWindow />
          ) : (
            <Tabs variant={"unstyled"}>
              <MintPsycHeader
                activeSale={activeSale}
                setActiveSale={setActiveSale}
                isOriginal={isOriginal}
                setIsOriginal={setIsOriginal}
              />
              {address ? (
                isLoading ? (
                  <InterimState type="loading" />
                ) : error ? (
                  <InterimState type="error" />
                ) : data ? (
                  <TabPanels>
                    <TabPanel px={0}>
                      <PsycSaleContent
                        isFullScreen={fullScreenWindow}
                        activeSale={activeSale}
                        isOriginal={isOriginal}
                      />
                    </TabPanel>
                    <TabPanel h="100%" w="100%">
                      <OwnedNftsContent
                        isFullScreen={fullScreenWindow}
                        isOriginal={isOriginal}
                        activeSale={activeSale}
                      />
                    </TabPanel>
                  </TabPanels>
                ) : (
                  <Grid h={"100%"} w={"100%"} gridTemplateRows={"30% 1fr"}>
                    <NFTSaleWidgetEmptyState address={address} />
                  </Grid>
                )
              ) : (
                <Grid h={"100%"} w={"100%"} gridTemplateRows={"20% 1fr"}>
                  <NFTSaleWidgetEmptyState address={address} />
                </Grid>
              )}
            </Tabs>
          )}
        </TokenProvider>
        <Image
          src="/windows/alchemist/clouds.png"
          alt=""
          position="absolute"
          right="0"
          bottom="0"
          zIndex="-1"
          filter="blur(12px)"
        />
      </Window.Content>
    </Window>
  );
};
