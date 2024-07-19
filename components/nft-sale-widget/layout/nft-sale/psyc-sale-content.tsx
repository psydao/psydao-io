import { Divider } from "@chakra-ui/react";
import MintRandomPsycHeader from "./mint-random-psyc-header";
import MintSection from "./mint-section";
import MintSpecificPsycHeader from "./mint-specific-psyc-header";
import { Sale } from "@/lib/types";

type PsycSaleContentProps = {
  isFullScreen: boolean;
  activeSale: Sale | undefined;
  loading: boolean;
};

const PsycSaleContent = (props: PsycSaleContentProps) => {
  return (
    <>
      <MintRandomPsycHeader isFullScreen={props.isFullScreen} />
      <MintSection
        isRandom
        activeSale={props.activeSale}
        loading={props.loading}
      />
      <Divider
        h={"1px"}
        border={"none"}
        bg={"#E9BDBD"}
        width={"100%"}
        display={{ base: "none", sm: "block" }}
      />
      <MintSpecificPsycHeader isFullScreen={props.isFullScreen} />
      <MintSection
        isRandom={false}
        activeSale={props.activeSale}
        loading={props.loading}
      />
    </>
  );
};

export default PsycSaleContent;
