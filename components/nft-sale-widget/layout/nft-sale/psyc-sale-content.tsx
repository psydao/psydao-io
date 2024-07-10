import MintRandomPsycHeader from "./mint-random-psyc-header";
import MintSection from "./mint-section";
import MintSpecificPsycHeader from "./mint-specific-psyc-header";

const PsycSaleContent = () => {
  return (
    <>
      <MintRandomPsycHeader />
      <MintSection isRandom />
      <MintSpecificPsycHeader />
      <MintSection isRandom={false} />
    </>
  );
};

export default PsycSaleContent;
