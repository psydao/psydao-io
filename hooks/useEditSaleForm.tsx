import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import { isAddress, parseUnits } from "viem";
import { uploadAddresses } from "@/lib/server-utils";
import { getMerkleRoot, getNewAddresses } from "@/utils/saleUtils";

export const useEditSaleForm = (
  address: string | undefined,
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const toast = useToast();
  const { showErrorToast, showSuccessToast } = useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useResize();
  const { writeContractAsync } = useWriteContract();
  const { isSuccess: floorPriceSuccess, error: floorPriceError } =
    useWaitForTransactionReceipt();
  const { isSuccess: ceilingPriceSuccess, error: ceilingPriceError } =
    useWaitForTransactionReceipt();
  const { isSuccess: whitelistSuccess, error: whitelistError } =
    useWaitForTransactionReceipt();

  const { data: isPaused } = useReadContract({
    ...psycSaleContractConfig,
    functionName: "paused"
  });

  const handleEditSale = async (
    e: React.FormEvent<HTMLFormElement>,
    batchID: string,
    addressesToRemove: string[],
    newAddresses: string[],
    existingAddresses: string[],
    floorPrice: string,
    ceilingPrice: string,
    saleStatus: "active" | "complete" | "paused",
    width: number
  ) => {
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

    const addressesToSubmit = getNewAddresses(
      addressesToRemove,
      newAddresses,
      existingAddresses
    );

    try {
      const ipfsHash = await uploadAddresses(addressesToSubmit);
      const merkleRoot = getMerkleRoot(addressesToSubmit);
      await writeContractAsync({
        ...psycSaleContractConfig,
        functionName: "updateMerkleRoot",
        args: [batchID, merkleRoot, ipfsHash]
      });
      await writeContractAsync({
        ...psycSaleContractConfig,
        functionName: "changeFloorPriceOfBatch",
        args: [batchID, parseUnits(floorPrice, 18)]
      });
      await writeContractAsync({
        ...psycSaleContractConfig,
        functionName: "changeCeilingPriceOfBatch",
        args: [batchID, parseUnits(ceilingPrice, 18)]
      });
      // TODO: contracts are being redeployed, change these to correct function names later
      if (!isPaused && saleStatus === "paused") {
        // writeContract({
        //   ...psycSaleContractConfig,
        //   functionName: "pause"
        // });
        console.log("pause sale");
      } else if (isPaused && saleStatus === "active") {
        // writeContract({
        //   ...psycSaleContractConfig,
        //   functionName: "unpause"
        // });
        console.log("unpause sale");
      }
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      console.error(message, "error");
      showErrorToast(message, width);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (ceilingPriceError ?? floorPriceError ?? whitelistError) {
      console.log("error!");
      const errorMessage =
        ceilingPriceError?.message ??
        floorPriceError?.message ??
        whitelistError?.message ??
        "An error occurred";
      showErrorToast(errorMessage, width);
      console.error(errorMessage, "error");
      setIsSubmitting(false);
    }

    if (ceilingPriceSuccess || floorPriceSuccess || whitelistSuccess) {
      showSuccessToast("Success! This sale has been edited.", width);
      setIsSubmitting(false);
      setOpenEditSale(false);
    }
  }, [
    floorPriceError,
    floorPriceSuccess,
    ceilingPriceError,
    ceilingPriceSuccess,
    whitelistError,
    whitelistSuccess,
    width,
    showErrorToast,
    showSuccessToast,
    setOpenEditSale
  ]);

  return {
    handleEditSale,
    isSubmitting
  };
};
