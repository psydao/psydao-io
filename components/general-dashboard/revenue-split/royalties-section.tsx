import RevenueSplitSection from "./revenue-split-section";

type RoyaltiesSectionProps = {
  royalties: string;
  setRoyalties: React.Dispatch<React.SetStateAction<string>>;
};

const RoyaltiesSection = ({
  royalties,
  setRoyalties
}: RoyaltiesSectionProps) => {
  return (
    <RevenueSplitSection
      label="Royalties"
      value={royalties}
      setValue={setRoyalties}
    />
  );
};

export default RoyaltiesSection;
