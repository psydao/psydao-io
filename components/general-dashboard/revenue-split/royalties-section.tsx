import { useGlobalContext } from "@/contexts/globalContext";
import RevenueSplitSection from "./revenue-split-section";
import { useAccount } from "wagmi";
import { useGeneralSettingsForm } from "@/hooks/useGeneralSettingsForm";

const RoyaltiesSection = () => {
  const { setUpdateNftSaleTrigger } = useGlobalContext() as {
    setUpdateNftSaleTrigger: React.Dispatch<React.SetStateAction<number>>;
  };

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  const { address } = useAccount();
  const { royalties, setRoyalties } = useGeneralSettingsForm(
    address,
    triggerNftSaleUpdate
  );
  return (
    <RevenueSplitSection
      label="Royalties"
      value={royalties}
      setValue={setRoyalties}
    />
  );
};

export default RoyaltiesSection;
