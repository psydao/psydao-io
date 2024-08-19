import { useState, useCallback, useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";
import { coreContractConfig } from "@/lib/core-contract-config";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";

export const useSaveGeneralSettings = () => {
  const { isConnected } = useAccount();
  const { showErrorToast, showSuccessToast, showDefaultErrorToast } =
    useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useResize();

  const { data: hash, writeContract, error } = useWriteContract();
  const { isSuccess: transactionSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const handleSaveSettings = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      royalties: number,
      ownerPercentage: number,
      treasury: number
    ) => {
      e.preventDefault();
      if (!isConnected) {
        showDefaultErrorToast("Please connect your wallet first");
        return;
      }

      if (royalties + ownerPercentage + treasury !== 100) {
        showErrorToast("The total percentage must equal 100", width);
        return;
      }
      setIsSubmitting(true);
      try {
        const args = [royalties, ownerPercentage, treasury];

        writeContract({
          ...coreContractConfig,
          functionName: "updateRevenueSplits",
          args
        });
      } catch (error) {
        const message = (error as Error).message || "An error occurred";
        showErrorToast(message, width);
        setIsSubmitting(false);
      }
    },
    [isConnected, showDefaultErrorToast, showErrorToast, writeContract, width]
  );

  useEffect(() => {
    if (error) {
      if (error.message.includes("User rejected")) {
        showErrorToast("User rejected", width);
      } else {
        showErrorToast(error.message, width);
      }
      setIsSubmitting(false);
    } else if (transactionSuccess) {
      showSuccessToast("Success! Your settings have been saved.", width);
      setIsSubmitting(false);
    }
  }, [error, transactionSuccess, width]);

  return { handleSaveSettings, isSubmitting };
};
