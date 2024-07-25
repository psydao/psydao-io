import { useState, useCallback, useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";
import { type AdminSale } from "@/lib/types";

import { generateNftIds } from "@/services/generateNftIds";
import {
  getLastTokenId,
  getMerkleRoot,
  toUnixTimestamp,
  toWei
} from "@/utils/saleUtils";
import { coreContractConfig } from "@/lib/core-contract-config";
import { splitAndValidateAddresses } from "@/utils/splitAndValidateAddresses";

import { useCustomToasts } from "./useCustomToasts";
import { useSaleLocalStorage } from "./useSaleLocalStorage";
import { useResize } from "@/hooks/useResize";
import { uploadAddresses } from "@/lib/server-utils";

export const useCreateSale = (
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>,
  tokenIds: number[],
  whitelistedArray: string[],
  triggerNftSaleUpdate: () => void
) => {
  const { isConnected } = useAccount();
  const {
    showErrorToast,
    showCustomErrorToast,
    showSuccessToast,
    showDefaultErrorToast
  } = useCustomToasts();
  const { getSales, saveSales, saveWhitelistedAddresses } =
    useSaleLocalStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSale, setNewSale] = useState<AdminSale | null>(null);
  const { width } = useResize();

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isSuccess: transactionSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const handleCreateSale = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      newWhitelistedAddresses: string,
      startDate: string,
      startTime: string,
      floorPrice: string,
      ceilingPrice: string
    ) => {
      e.preventDefault();
      if (!isConnected) {
        showDefaultErrorToast("Please connect your wallet first");
        return;
      }
      if (!newWhitelistedAddresses) {
        showErrorToast("Please enter at least one whitelisted address", width);
        return;
      }
      setIsSubmitting(true);
      let isSuccess = true;
      const mySales: AdminSale[] = getSales();
      const lastTokenId = getLastTokenId(mySales);

      const newSale: AdminSale = {
        startDate,
        startTime,
        floorPrice,
        ceilingPrice,
        tokenIds:
          tokenIds.length > 0 ? tokenIds : generateNftIds(1, lastTokenId)
      };
      setNewSale(newSale);

      const splitNewWhitelistedAddresses = splitAndValidateAddresses(
        newWhitelistedAddresses,
        (message) => {
          setIsSubmitting(false);
          isSuccess = false;
          showErrorToast(message, width);
        }
      );

      if (!isSuccess) return;

      if (parseFloat(floorPrice) > parseFloat(ceilingPrice)) {
        isSuccess = false;
        setIsSubmitting(false);
        showErrorToast(
          "Please make sure the floor price is less than or equal to the ceiling price",
          width
        );
        return;
      }

      const saleStartTime = toUnixTimestamp(startDate, startTime);
      if (saleStartTime < Math.floor(Date.now() / 1000)) {
        isSuccess = false;
        setIsSubmitting(false);
        showErrorToast(
          "The date cannot be in the past. Please select a valid date.",
          width
        );
        return;
      }

      const formattedAddresses: `0x${string}`[] =
        splitNewWhitelistedAddresses.map((address) => address as `0x${string}`);
      const merkleRoot = getMerkleRoot(formattedAddresses);
      const floorPriceWei = toWei(floorPrice);
      const ceilingPriceWei = toWei(ceilingPrice);
      const ipfsHash = await uploadAddresses(splitNewWhitelistedAddresses);

      {
        try {
          const args = [
            tokenIds,
            saleStartTime,
            floorPriceWei,
            ceilingPriceWei,
            merkleRoot,
            ipfsHash
          ];
          console.log("Calling writeContract with args:", args);
          writeContract({
            ...coreContractConfig,
            functionName: "createSaleBatchPsycSale",
            args
          });
          console.log("writeContract called");
        } catch (error) {
          const message = (error as Error).message || "An error occurred";
          showCustomErrorToast(message, width);
          setIsSubmitting(false);
        }
      }
    },
    [
      isConnected,
      getSales,
      saveSales,
      saveWhitelistedAddresses,
      setOpenCreateSale,
      showDefaultErrorToast,
      showErrorToast,
      showCustomErrorToast,
      showSuccessToast,
      tokenIds,
      whitelistedArray,
      writeContract,
      width
    ]
  );

  useEffect(() => {
    if (error) {
      showCustomErrorToast(error.message, width);
      setIsSubmitting(false);
    } else if (isPending) {
      showSuccessToast(
        "Your transaction is processing. Please wait for confirmation.",
        width
      );
    } else if (transactionSuccess && newSale) {
      const mySales = getSales();
      saveSales([...mySales, newSale]);
      console.log("Sale created:", newSale);
      showSuccessToast("Success! Your sale has been created.", width);
      triggerNftSaleUpdate();
      setOpenCreateSale(false);
      setIsSubmitting(false);
    }
  }, [
    error,
    transactionSuccess,
    isPending,
    width,
    getSales,
    saveSales,
    setOpenCreateSale,
    showDefaultErrorToast,
    showSuccessToast,
    newSale,
    whitelistedArray,
    saveWhitelistedAddresses,
    splitAndValidateAddresses
  ]);

  return { handleCreateSale, isSubmitting };
};
