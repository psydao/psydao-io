import { useGlobalContext } from "@/contexts/globalContext";
import RevenueSplitSection from "./revenue-split-section";
import { useGeneralSettingsForm } from "@/hooks/useGeneralSettingsForm";
import { useAccount } from "wagmi";

const NftOwnersSection = () => {
  const { setUpdateNftSaleTrigger } = useGlobalContext() as {
    setUpdateNftSaleTrigger: React.Dispatch<React.SetStateAction<number>>;
  };

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  const { address } = useAccount();
  const { ownerPercentage, setOwnerPercentage } = useGeneralSettingsForm(
    address,
    triggerNftSaleUpdate
  );

  return (
    <RevenueSplitSection
      label="Owner percentage"
      value={ownerPercentage}
      setValue={setOwnerPercentage}
    />
  );
};

export default NftOwnersSection;
