import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import { useReadGeneralSettings } from "./useReadGeneralSettings";

export const useGeneralSettingsForm = (address: string | undefined) => {
  const toast = useToast();
  const { showErrorToast, showSuccessToast } = useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useResize();

  const {
    buyLimit: contractBuyLimit,
    isPrivateSale,
    royaltiesRevenue,
    revenueSplit,
    loading,
    error
  } = useReadGeneralSettings();

  const [localBuyLimit, setLocalBuyLimit] = useState<string>("");
  const [localTreasury, setLocalTreasury] = useState<string>("");
  const [localRoyalties, setLocalRoyalties] = useState<string>("");
  const [localOwnerPercentage, setLocalOwnerPercentage] = useState<string>("");
  const [localOpenPublicSale, setLocalOpenPublicSale] =
    useState<boolean>(!isPrivateSale);

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: revenueSplitsSuccess, error: revenueSplitsError } =
    useWaitForTransactionReceipt();
  const { isSuccess: saleTypeSuccess, error: saleTypeError } =
    useWaitForTransactionReceipt();
  const { isSuccess: buyLimitSuccess, error: buyLimitError } =
    useWaitForTransactionReceipt();

  useEffect(() => {
    if (!loading) {
      setLocalTreasury(revenueSplit.psycFee);
      setLocalRoyalties(revenueSplit.royalty);
      setLocalOwnerPercentage(revenueSplit.erc721OwnerPortion);
      setLocalOpenPublicSale(!isPrivateSale);
      setLocalBuyLimit(contractBuyLimit);
    }
  }, [loading, revenueSplit, isPrivateSale, contractBuyLimit]);

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

    if (
      parseFloat(localRoyalties) +
        parseFloat(localOwnerPercentage) +
        parseFloat(localTreasury) !==
      100
    ) {
      showErrorToast("The total percentage must equal 100", width);
      setIsSubmitting(false);
      return;
    }

    try {
      const scaledRoyalties = BigInt(parseFloat(localRoyalties) * 100);
      const scaledOwnerPercentage = BigInt(
        parseFloat(localOwnerPercentage) * 100
      );
      const scaledTreasury = BigInt(parseFloat(localTreasury) * 100);
      const scaledBuyLimit = BigInt(parseFloat(localBuyLimit));

      if (
        localRoyalties !== revenueSplit.royalty ||
        localOwnerPercentage !== revenueSplit.erc721OwnerPortion ||
        localTreasury !== revenueSplit.psycFee
      ) {
        await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "updateRevenueSplits",
          args: [scaledRoyalties, scaledOwnerPercentage, scaledTreasury]
        });
        showSuccessToast("Revenue splits updated successfully.", width);
      }

      if (localOpenPublicSale !== !isPrivateSale) {
        await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "switchSaleType",
          args: []
        });
        showSuccessToast("Sale type switched successfully.", width);
      }

      if (localBuyLimit !== contractBuyLimit) {
        await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "changeBuyLimit",
          args: [scaledBuyLimit]
        });
        showSuccessToast("Buy limit updated successfully.", width);
      }

      console.log("Success! Your settings have been saved.");
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      console.error(message, "error");
      showErrorToast(message, width);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (revenueSplitsError ?? saleTypeError ?? buyLimitError) {
      const errorMessage =
        revenueSplitsError?.message ??
        saleTypeError?.message ??
        buyLimitError?.message ??
        "An error occurred";
      showErrorToast(errorMessage, width);
      console.error(errorMessage, "error");
      setIsSubmitting(false);
    }

    if (revenueSplitsSuccess || saleTypeSuccess || buyLimitSuccess) {
      showSuccessToast("Success! Your settings have been saved.", width);
      setIsSubmitting(false);
    }
  }, [
    revenueSplitsError,
    saleTypeError,
    buyLimitError,
    revenueSplitsSuccess,
    saleTypeSuccess,
    buyLimitSuccess,
    width,
    showErrorToast,
    showSuccessToast
  ]);

  return {
    revenue: royaltiesRevenue,
    buyLimit: localBuyLimit,
    setBuyLimit: setLocalBuyLimit,
    royalties: localRoyalties,
    setRoyalties: setLocalRoyalties,
    treasury: localTreasury,
    setTreasury: setLocalTreasury,
    ownerPercentage: localOwnerPercentage,
    setOwnerPercentage: setLocalOwnerPercentage,
    openPublicSale: localOpenPublicSale,
    setOpenPublicSale: setLocalOpenPublicSale,
    handleSaveSettings,
    isSubmitting,
    loading,
    error
  };
};
