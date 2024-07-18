import RevenueSplitSection from "./revenue-split-section";

type NftOwnersSectionProps = {
  ownerPercentage: string;
  setOwnerPercentage: React.Dispatch<React.SetStateAction<string>>;
};

const NftOwnersSection = ({
  ownerPercentage,
  setOwnerPercentage
}: NftOwnersSectionProps) => {
  return (
    <RevenueSplitSection
      label="Owner percentage"
      value={ownerPercentage}
      setValue={setOwnerPercentage}
    />
  );
};

export default NftOwnersSection;
