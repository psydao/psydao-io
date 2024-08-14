import { useState, useCallback, useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";

import { getMerkleRoot, toUnixTimestamp, toWei } from "@/utils/saleUtils";
import { coreContractConfig } from "@/lib/core-contract-config";
import { splitAndValidateAddresses } from "@/utils/splitAndValidateAddresses";

import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "@/hooks/useResize";
import { uploadAddresses } from "@/lib/server-utils";

export const useCreateSale = (
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>,
  tokenIds: number[],
  whitelistedArray: string[],
  triggerNftSaleUpdate: () => void,
  refetchSalesData: () => void
) => {
  const { isConnected } = useAccount();
  const {
    showErrorToast,
    showCustomErrorToast,
    showSuccessToast,
    showDefaultErrorToast
  } = useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useResize();

  const { data: hash, writeContract, error } = useWriteContract();
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
      setIsSubmitting(true);

      const splitNewWhitelistedAddresses = splitAndValidateAddresses(
        newWhitelistedAddresses,
        (message) => {
          setIsSubmitting(false);
          showErrorToast(message, width);
        }
      );

      if (splitNewWhitelistedAddresses.length < 2) {
        showErrorToast(
          "Please enter at least two addresses to whitelist",
          width
        );
        setIsSubmitting(false);
        return;
      }

      if (parseFloat(floorPrice) > parseFloat(ceilingPrice)) {
        setIsSubmitting(false);
        showErrorToast(
          "Please make sure the floor price is less than or equal to the ceiling price",
          width
        );
        return;
      }

      const saleStartTime = toUnixTimestamp(startDate, startTime);
      if (saleStartTime < Math.floor(Date.now() / 1000)) {
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

      try {
        const args = [
          tokenIds,
          saleStartTime,
          floorPriceWei,
          ceilingPriceWei,
          merkleRoot,
          ipfsHash
        ];

        writeContract({
          ...coreContractConfig,
          functionName: "createSaleBatchPsycSale",
          args
        });
      } catch (error) {
        const message = (error as Error).message || "An error occurred";
        showCustomErrorToast(message, width);
        setIsSubmitting(false);
      }
    },
    [
      isConnected,
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
    } else if (transactionSuccess) {
      refetchSalesData();
      showSuccessToast("Success! Your sale has been created.", width);
      triggerNftSaleUpdate();
      setOpenCreateSale(false);
      setIsSubmitting(false);
    }
  }, [error, transactionSuccess, width]);

  return { handleCreateSale, isSubmitting };
};
