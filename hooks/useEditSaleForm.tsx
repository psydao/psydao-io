import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import { parseUnits } from "viem";
import { getAddresses, uploadAddresses } from "@/lib/server-utils";
import { getMerkleRoot, getNewAddresses } from "@/utils/saleUtils";
import { useGetCurrentSaleValues } from "./useGetCurrentSaleValues";

export const useEditSaleForm = (
  address: string | undefined,
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  const toast = useToast();
  const { width } = useResize();
  const {
    ceilingPrice: currentCeilingPrice,
    floorPrice: currentFloorPrice,
    ipfsHash: currentIpfsHash
  } = useGetCurrentSaleValues(id, width);
  const { showErrorToast, showCustomErrorToast, showSuccessToast } =
    useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState<
    "ceiling" | "floor" | "whitelist" | undefined
  >(undefined);
  const [isError, setIsError] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [floorPriceHash, setFloorPriceHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [ceilingPriceHash, setCeilingPriceHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [whitelistHash, setWhitelistHash] = useState<`0x${string}` | undefined>(
    undefined
  );
  const { isSuccess: floorPriceSuccess, error: floorPriceError } =
    useWaitForTransactionReceipt({ hash: floorPriceHash });
  const { isSuccess: ceilingPriceSuccess, error: ceilingPriceError } =
    useWaitForTransactionReceipt({
      hash: ceilingPriceHash
    });
  const { isSuccess: whitelistSuccess, error: whitelistError } =
    useWaitForTransactionReceipt({
      hash: whitelistHash
    });

  const handleEditSale = async (
    e: React.FormEvent<HTMLFormElement>,
    batchID: string,
    addressesToRemove: string[],
    newAddresses: string[],
    existingAddresses: string[],
    newFloorPrice: string,
    newCeilingPrice: string,
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
      const currentAddresses = await getAddresses(currentIpfsHash);
      if (
        parseUnits(newCeilingPrice, 18).toString() === currentCeilingPrice &&
        parseUnits(newFloorPrice, 18).toString() === currentFloorPrice &&
        JSON.stringify(addressesToSubmit.sort()) ===
          JSON.stringify(currentAddresses.sort())
      ) {
        showErrorToast("No changes to submit!", width);
        setIsSubmitting(false);
        return;
      }

      if (
        JSON.stringify(addressesToSubmit.sort()) !==
        JSON.stringify(currentAddresses.sort())
      ) {
        const newIpfsHash = await uploadAddresses(addressesToSubmit);
        const newMerkleRoot = getMerkleRoot(addressesToSubmit);
        // promise.all these contract calls
        const merklerootResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "updateMerkleRoot",
          args: [batchID, newMerkleRoot, newIpfsHash]
        });
        setWhitelistHash(merklerootResponse);
      }
      if (parseUnits(newFloorPrice, 18).toString() !== currentFloorPrice) {
        const floorPriceResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "changeFloorPriceOfBatch",
          args: [batchID, parseUnits(newFloorPrice, 18)]
        });
        setFloorPriceHash(floorPriceResponse);
      }
      if (parseUnits(newCeilingPrice, 18).toString() !== currentCeilingPrice) {
        const ceilingPriceResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "changeCeilingPriceOfBatch",
          args: [batchID, parseUnits(newCeilingPrice, 18)]
        });
        setCeilingPriceHash(ceilingPriceResponse);
      }

      // TODO: need to redeploy SG, change these to correct function names later
      // if (isPausedLocal !== isPausedContract) {
      // writeContract({
      //   ...psycSaleContractConfig,
      //   functionName: "switchBatchStatus"
      // });
      // }
      if (isSuccess) {
        console.log("yay");
        showSuccessToast("Success! Your sale has been edited!", width);
      }
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      setIsSubmitting(false);
      setCeilingPriceHash(undefined);
      setFloorPriceHash(undefined);
      setWhitelistHash(undefined);
      console.log(message);
      console.error(message, "error");
      showCustomErrorToast(message, width);

    }
  };

  useEffect(() => {
    if (ceilingPriceError) {
      setIsError(true);
      return;
    } else if (floorPriceError) {
      setIsError(true);
    } else if (whitelistError) {
      setIsError(true);
    }

    if (ceilingPriceSuccess) {
      setIsSuccess("ceiling");
    }

    if (floorPriceSuccess) {
      setIsSuccess("floor");
    }

    if (whitelistSuccess) {
      setIsSuccess("whitelist");
  }, [
    floorPriceError,
    floorPriceSuccess,
    ceilingPriceError,
    ceilingPriceSuccess,
    whitelistError,
    whitelistSuccess,
    isSuccess,
    isError,
    setOpenEditSale
  ]);

  useEffect(() => {
    if (isSuccess) {
      setIsSubmitting(false);
      setOpenEditSale(false);
      setCeilingPriceHash(undefined);
      setFloorPriceHash(undefined);
      setWhitelistHash(undefined);
      setIsSuccess(undefined);
      setIsError(false);
      showSuccessToast("Your sale has been edited!", width);
      return;
    }
    if (isError) {
      showErrorToast("An error has occurred. Please try again later", width);
      setIsSubmitting(false);
      setOpenEditSale(false);
      setCeilingPriceHash(undefined);
      setFloorPriceHash(undefined);
      setWhitelistHash(undefined);
      setIsSuccess(undefined);
      setIsError(false);
    }
  }, [isSuccess, isError, setOpenEditSale]);

  return {
    handleEditSale,
    isSubmitting
  };
};
