import { useState, useCallback, useEffect } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useResize } from "./useResize";

export const useWithdrawRoyalties = () => {
  const { isConnected } = useAccount();
  const { showErrorToast, showSuccessToast, showDefaultErrorToast } =
    useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: hash, writeContract, error } = useWriteContract();
  const { isSuccess: transactionSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const { width } = useResize();

  const withdrawRoyalties = useCallback(
    async (receiverAddress: string) => {
      if (!isConnected) {
        showDefaultErrorToast("Please connect your wallet first");
        return false;
      }

      setIsSubmitting(true);
      try {
        const args = [receiverAddress];

        writeContract({
          ...psycSaleContractConfig,
          functionName: "withdrawRoyalties",
          args
        });

        return true;
      } catch (error) {
        const message = (error as Error).message || "An error occurred";
        showErrorToast(message, width);
        setIsSubmitting(false);
        return false;
      }
    },
    [isConnected, showDefaultErrorToast, showErrorToast, writeContract]
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
      showSuccessToast("Success! Royalties have been withdrawn.", width);
      setIsSubmitting(false);
    }
  }, [error, transactionSuccess]);

  return { withdrawRoyalties, isSubmitting, transactionSuccess };
};
