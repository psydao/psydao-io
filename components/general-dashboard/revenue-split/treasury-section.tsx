import { useGlobalContext } from "@/contexts/globalContext";
import RevenueSplitSection from "./revenue-split-section";
import { useAccount } from "wagmi";
import { useGeneralSettingsForm } from "@/hooks/useGeneralSettingsForm";

const TreasurySection = () => {
  const { setUpdateNftSaleTrigger } = useGlobalContext() as {
    setUpdateNftSaleTrigger: React.Dispatch<React.SetStateAction<number>>;
  };

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  const { address } = useAccount();
  const { treasury, setTreasury } = useGeneralSettingsForm(
    address,
    triggerNftSaleUpdate
  );

  return (
    <RevenueSplitSection
      label="Treasury"
      value={treasury}
      setValue={setTreasury}
    />
  );
};

export default TreasurySection;
