import RevenueSplitSection from "./revenue-split-section";

type TreasurySectionProps = {
  treasury: string;
  setTreasury: React.Dispatch<React.SetStateAction<string>>;
};

const TreasurySection = ({ treasury, setTreasury }: TreasurySectionProps) => {
  return (
    <RevenueSplitSection
      label="Treasury"
      value={treasury}
      setValue={setTreasury}
    />
  );
};

export default TreasurySection;
