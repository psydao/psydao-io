import { Divider } from "@chakra-ui/react";
import MintRandomPsycHeader from "./mint-random-psyc-header";
import MintSection from "./mint-section";
import MintSpecificPsycHeader from "./mint-specific-psyc-header";
import type { Sale } from "@/lib/types";

type PsycSaleContentProps = {
  isFullScreen: boolean;
  activeSale: Sale | undefined;
  isOriginal: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
};

const PsycSaleContent = ({
  isFullScreen,
  activeSale,
  isOriginal,
  elementRef
}: PsycSaleContentProps) => {
  return (
    <>
      <MintRandomPsycHeader isFullScreen={isFullScreen} />
      <MintSection
        isRandom={true}
        activeSale={activeSale}
        isOriginal={isOriginal}
        elementRef={elementRef}
      />
      <Divider
        h={"1px"}
        border={"none"}
        bg={"#E9BDBD"}
        width={"100%"}
        display={{ base: "none", sm: "block" }}
      />
      <MintSpecificPsycHeader isFullScreen={isFullScreen} />
      <MintSection
        isRandom={false}
        activeSale={activeSale}
        isOriginal={isOriginal}
        elementRef={elementRef}
      />
    </>
  );
};

export default PsycSaleContent;
