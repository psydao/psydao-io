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

  const { data: hash, writeContract, isPending, error } = useWriteContract();
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
        console.log("Calling writeContract with args:", args);
        writeContract({
          ...psycSaleContractConfig,
          functionName: "withdrawRoyalties",
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
    [isConnected, showDefaultErrorToast, showErrorToast, writeContract]
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
    } else if (isPending) {
      showSuccessToast(
        "Your transaction is processing. Please wait for confirmation.",
        width
      );
    } else if (transactionSuccess) {
      showSuccessToast("Success! Royalties have been withdrawn.", width);
      setIsSubmitting(false);
    }
  }, [error, transactionSuccess, isPending, showErrorToast, showSuccessToast]);

  return { withdrawRoyalties, isSubmitting };
};
