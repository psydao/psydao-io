import {
  Image,
  useMediaQuery,
  TabPanel,
  TabPanels,
  Tabs,
  Grid
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { Window } from "@/components/ui/window";
import MintPsycHeader from "./layout/nft-sale/mint-psyc-header";
import PsycSaleContent from "./layout/nft-sale/psyc-sale-content";
import OwnedNftsContent from "./layout/owned-nfts/owned-nfts-section";
import NFTSaleWidgetEmptyState from "./layout/nft-sale-widget-empty";

import { InterimState } from "../common/interim-state";
import WrongNetworkWindow from "../common/wrong-network";

import { TokenProvider } from "@/providers/TokenContext";
import SaleWidgetProvider, {
  useSaleWidget
} from "@/providers/SaleWidgetContext";

export const NftSaleWidget = ({ updateTrigger }: { updateTrigger: number }) => {
  return (
    <SaleWidgetProvider updateTrigger={updateTrigger}>
      <NftSaleWidgetContent />
    </SaleWidgetProvider>
  );
};

const NftSaleWidgetContent = () => {
  const { isWrongNetwork, isLoading, error, fullScreenWindow } =
    useSaleWidget();
  const { address } = useAccount();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  return (
    <Window
      id="nft-sale"
      height={fullScreenWindow ? "100%" : isLargerThanMd ? "680px" : "80%"}
      width={fullScreenWindow ? "100%" : isLargerThanMd ? "600px" : "95%"}
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
      <Window.Content py={2} px={0} height="100%" width="100%">
        <TokenProvider>
          {address && isWrongNetwork ? (
            <WrongNetworkWindow />
          ) : (
            <Tabs variant="unstyled">
              <MintPsycHeader />
              {address ? (
                isLoading ? (
                  <InterimState type="loading" />
                ) : error ? (
                  <InterimState type="error" />
                ) : (
                  <TabPanels>
                    <TabPanel px={0}>
                      <PsycSaleContent />
                    </TabPanel>
                    <TabPanel h="100%" w="100%" py={2.5}>
                      <OwnedNftsContent />
                    </TabPanel>
                  </TabPanels>
                )
              ) : (
                <Grid h="100%" w="100%" gridTemplateRows="30% 1fr">
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
