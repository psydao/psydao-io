import { Divider } from "@chakra-ui/react";
import MintRandomPsycHeader from "./mint-random-psyc-header";
import MintSection from "./mint-section";
import MintSpecificPsycHeader from "./mint-specific-psyc-header";

const PsycSaleContent = () => {
  return (
    <>
      <MintRandomPsycHeader />
      <MintSection isRandom={true} />
      <Divider
        h={"1px"}
        border={"none"}
        bg={"#E9BDBD"}
        width={"100%"}
        display={{ base: "none", sm: "block" }}
      />
      <MintSpecificPsycHeader />
      <MintSection isRandom={false} />
    </>
  );
};

export default PsycSaleContent;
