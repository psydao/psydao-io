import { Divider } from "@chakra-ui/react";
import MintRandomPsycHeader from "./mint-random-psyc-header";
import MintSection from "./mint-section";
import MintSpecificPsycHeader from "./mint-specific-psyc-header";

type PsycSaleContentProps = {
  isFullScreen: boolean;
};

const PsycSaleContent = (props: PsycSaleContentProps) => {
  return (
    <>
      <MintRandomPsycHeader isFullScreen={props.isFullScreen} />
      <MintSection isRandom />
      <Divider
        h={"1px"}
        border={"none"}
        bg={"#E9BDBD"}
        width={"100%"}
        display={{ base: "none", sm: "block" }}
      />
      <MintSpecificPsycHeader isFullScreen={props.isFullScreen} />
      <MintSection isRandom={false} />
    </>
  );
};

export default PsycSaleContent;
