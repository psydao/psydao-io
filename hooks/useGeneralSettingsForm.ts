import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { type GeneralSettings } from "@/lib/types";
import { useUpdateRevenueSplits } from "@/hooks/useUpdateRevenueSplits";

export const useGeneralSettingsForm = (address: string | undefined) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revenue = "12,000";
  const [buyLimit, setBuyLimit] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [treasury, setTreasury] = useState("");
  const [ownerPercentage, setOwnerPercentage] = useState("");
  const [openPublicSale, setOpenPublicSale] = useState(false);

  const { updateRevenueSplits, isSubmitting: isUpdating } =
    useUpdateRevenueSplits();

  useEffect(() => {
    const storedSetting = localStorage.getItem("generalSettings");
    if (storedSetting) {
      try {
        const parsedSettings = JSON.parse(storedSetting) as GeneralSettings;
        setRoyalties(parsedSettings.royalties);
        setTreasury(parsedSettings.treasury);
        setBuyLimit(parsedSettings.buyLimit);
        setOwnerPercentage(parsedSettings.ownerPercentage);
        setOpenPublicSale(parsedSettings.openPublicSale);
      } catch (error) {
        console.error("Failed to parse settings from localStorage:", error);
      }
    }
  }, []);

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      toast({
        title: "Please connect your wallet first",
        position: "top-right",
        status: "error",
        isClosable: true
      });
      return;
    }
    setIsSubmitting(true);

    const updatedSettings: GeneralSettings = {
      revenue,
      buyLimit,
      treasury,
      royalties,
      ownerPercentage,
      openPublicSale
    };

    const updateSuccess = await updateRevenueSplits(
      parseFloat(royalties),
      parseFloat(ownerPercentage),
      parseFloat(treasury)
    );

    if (updateSuccess) {
      localStorage.setItem("generalSettings", JSON.stringify(updatedSettings));
      console.log("Success! Your settings have been saved.");
    }

    setIsSubmitting(false);
  };

  return {
    revenue,
    buyLimit,
    setBuyLimit,
    royalties,
    setRoyalties,
    treasury,
    setTreasury,
    ownerPercentage,
    setOwnerPercentage,
    openPublicSale,
    setOpenPublicSale,
    handleSaveSettings,
    isSubmitting: isSubmitting || isUpdating
  };
};
