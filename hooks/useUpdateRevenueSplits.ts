import { useState, useEffect, useCallback } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";

export const useUpdateRevenueSplits = () => {
  const { isConnected } = useAccount();
  const { showErrorToast, showSuccessToast, showDefaultErrorToast } =
    useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useResize();

  const { data: hash, writeContract, error } = useWriteContract();
  const { isSuccess: transactionSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const updateRevenueSplits = useCallback(
    async (royalties: number, ownerPercentage: number, treasury: number) => {
      if (!isConnected) {
        showDefaultErrorToast("Please connect your wallet first");
        return false;
      }
      console.log({
        royalties,
        ownerPercentage,
        treasury
      });

      if (royalties + ownerPercentage + treasury !== 100) {
        showErrorToast("The total percentage must equal 100", width);
        return false;
      }

      setIsSubmitting(true);
      try {
        const scaledRoyalties = BigInt(royalties * 100);
        const scaledOwnerPercentage = BigInt(ownerPercentage * 100);
        const scaledTreasury = BigInt(treasury * 100);

        const args = [scaledRoyalties, scaledOwnerPercentage, scaledTreasury];
        console.log("Calling writeContract with args:", args);
        writeContract({
          ...psycSaleContractConfig,
          functionName: "updateRevenueSplits",
          args
        });
        console.log("writeContract called");
        return true;
      } catch (error) {
        const message = (error as Error).message || "An error occurred";
        showErrorToast(message, width);
        setIsSubmitting(false);
        return false;
      }
    },
    [isConnected, showDefaultErrorToast, showErrorToast, width, writeContract]
  );

  useEffect(() => {
    if (error) {
      if (error.message.includes("User rejected")) {
        showErrorToast("User rejected", width);
      } else {
        showErrorToast(error.message, width);
        console.log("Transaction error:", error.message);
      }
      setIsSubmitting(false);
    } else if (transactionSuccess) {
      showSuccessToast("Success! Your settings have been saved.", width);
      setIsSubmitting(false);
    }
  }, [error, transactionSuccess, width]);

  return { updateRevenueSplits, isSubmitting };
};
