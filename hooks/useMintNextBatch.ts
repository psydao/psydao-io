import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { coreContractConfig } from "@/lib/core-contract-config";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "@/hooks/useResize";

export const useMintNextBatch = () => {
  const { showErrorToast, showSuccessToast } = useCustomToasts();
  const { width } = useResize();
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const {
    data: mintHash,
    writeContract: mintContract,
    error: mintError
  } = useWriteContract();
  const { isSuccess: mintTransactionSuccess } = useWaitForTransactionReceipt({
    hash: mintHash
  });

  const mintNextBatch = async () => {
    setIsMinting(true);
    try {
      mintContract({
        ...coreContractConfig,
        functionName: "mintNextBatch"
      });
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      showErrorToast(message, width);
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (mintError) {
      showErrorToast(mintError.message, width);
      setIsMinting(false);
    } else if (mintTransactionSuccess) {
      showSuccessToast("Minting next batch was successful!", width);
      setMintSuccess(true);
      setIsMinting(false);
    }
  }, [
    mintError,
    mintTransactionSuccess,
    showErrorToast,
    showSuccessToast,
    width
  ]);

  return { mintNextBatch, isMinting, mintSuccess };
};
