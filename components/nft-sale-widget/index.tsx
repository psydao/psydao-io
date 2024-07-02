import { useMemo } from "react";

import { Image, useMediaQuery } from "@chakra-ui/react";
import { Window } from "@/components/window";

import { useWindowManager } from "@/components/window-manager";
import { MintPsycHeader } from "./layout/mint-psyc-header";
import { MintRandomPSYCHeader } from "./layout/mint-random-psyc-header";
import { MintRandomSection } from "./layout/mint-random-section";
import { MintSpecificPsycHeader } from "./layout/mint-specific-psyc-header";
import MintSpecificSection from "./layout/mint-specific-section";

export const NftSaleWidget = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "nft-sale") {
      return true;
    }

    return false;
  }, [state]);

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
    >
      <Window.TitleBar />
      <Window.Content py={2}>
        <MintPsycHeader />
        <MintRandomPSYCHeader />
        <MintRandomSection />
        <MintSpecificPsycHeader />
        <MintSpecificSection />
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
