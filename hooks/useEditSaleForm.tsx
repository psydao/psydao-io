import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import { type Address, parseUnits } from "viem";
import { getMerkleRoot, getNewAddresses } from "@/utils/saleUtils";
import { useGetCurrentSaleValues } from "./useGetCurrentSaleValues";
import type { Sale } from "@/lib/types";
import { pinWhitelistToIpfs } from "@/lib/services/ipfs";

export const useEditSaleForm = (
  address: string | undefined,
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>,
  id: string,
  triggerNftSaleUpdate: () => void,
  refetchSalesData: () => void,
  getAddresses: (ipfsHash: string) => Promise<string[]>,
  setAddressesToRemove: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const toast = useToast();
  const { width } = useResize();
  const {
    ceilingPrice: currentCeilingPrice,
    floorPrice: currentFloorPrice,
    ipfsHash: currentIpfsHash,
    isPaused: currentIsPaused
  } = useGetCurrentSaleValues(id, width);
  const { showErrorToast, showCustomErrorToast, showSuccessToast } =
    useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [floorAndCeilingPriceHash, setFloorAndCeilingPriceHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [merkleRootHash, setMerkleRootHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [switchSaleStatusHash, setSwitchSaleStatusHash] = useState<
    Address | undefined
  >(undefined);
  const {
    isSuccess: floorAndCeilingPriceSuccess,
    error: floorAndCeilingPriceError
  } = useWaitForTransactionReceipt({ hash: floorAndCeilingPriceHash });

  const { isSuccess: merkleRootSuccess, error: merkleRootError } =
    useWaitForTransactionReceipt({
      hash: merkleRootHash
    });

  const { isSuccess: switchSaleStatusSuccess, error: switchSaleStatusError } =
    useWaitForTransactionReceipt({
      hash: switchSaleStatusHash
    });

  const handleEditSale = async (
    e: React.FormEvent<HTMLFormElement>,
    batchID: string,
    addressesToRemove: string[],
    newAddresses: string[],
    existingAddresses: string[],
    newFloorPrice: string,
    newCeilingPrice: string,
    isPausedLocal: boolean,

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

    const currentAddresses = await getAddresses(currentIpfsHash);

    const ceilingPriceHasChanged =
      parseUnits(newCeilingPrice, 18).toString() !== currentCeilingPrice;
    const floorPriceHasChanged =
      parseUnits(newFloorPrice, 18).toString() !== currentFloorPrice;
    const saleStatusMustChange = isPausedLocal !== currentIsPaused;

    const addressesToSubmit = getNewAddresses(
      addressesToRemove,
      newAddresses,
      existingAddresses,
      () => {
        setIsSubmitting(false);
        setIsSuccess(false);
        setIsError(true);
      }
    );

    try {
      if (
        !ceilingPriceHasChanged &&
        !floorPriceHasChanged &&
        JSON.stringify(addressesToSubmit.sort()) ===
          JSON.stringify(currentAddresses.sort()) &&
        !saleStatusMustChange
      ) {
        showErrorToast("No changes to submit!", width);
        setIsSubmitting(false);
        return;
      }

      if (
        JSON.stringify(addressesToSubmit.sort()) !==
          JSON.stringify(currentAddresses.sort()) &&
        addressesToSubmit.length >= 2
      ) {
        const newIpfsHash = await pinWhitelistToIpfs(addressesToSubmit);
        const newMerkleRoot = getMerkleRoot(addressesToSubmit);
        const merklerootResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "updateMerkleRoot",
          args: [batchID, newMerkleRoot, newIpfsHash]
        });
        setMerkleRootHash(merklerootResponse);
      } else if (
        JSON.stringify(addressesToSubmit.sort()) !==
          JSON.stringify(currentAddresses.sort()) &&
        addressesToSubmit.length < 2
      ) {
        showErrorToast(
          "The whitelist must always contain two or more addresses",
          width
        );
        setIsSubmitting(false);
        return;
      }

      if (ceilingPriceHasChanged && floorPriceHasChanged) {
        const floorAndCeilingPriceResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "changeFloorAndCeilingPriceOfBatch",
          args: [
            batchID,
            parseUnits(newFloorPrice, 18),
            parseUnits(newCeilingPrice, 18)
          ]
        });
        setFloorAndCeilingPriceHash(floorAndCeilingPriceResponse);
      } else if (ceilingPriceHasChanged && !floorPriceHasChanged) {
        const floorAndCeilingPriceResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "changeFloorAndCeilingPriceOfBatch",
          args: [batchID, currentFloorPrice, parseUnits(newCeilingPrice, 18)]
        });
        setFloorAndCeilingPriceHash(floorAndCeilingPriceResponse);
      } else if (!ceilingPriceHasChanged && floorPriceHasChanged) {
        const floorAndCeilingPriceResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "changeFloorAndCeilingPriceOfBatch",
          args: [batchID, parseUnits(newFloorPrice, 18), currentCeilingPrice]
        });
        setFloorAndCeilingPriceHash(floorAndCeilingPriceResponse);
      }

      if (isPausedLocal !== currentIsPaused) {
        const switchSaleStatusResponse = await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: "switchBatchStatus",
          args: [batchID]
        });
        setSwitchSaleStatusHash(switchSaleStatusResponse);
      }
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      setIsSubmitting(false);
      setFloorAndCeilingPriceHash(undefined);
      setMerkleRootHash(undefined);
      console.error(message, "error");
      showCustomErrorToast(message, width);
    }
  };

  useEffect(() => {
    if (
      floorAndCeilingPriceSuccess ||
      merkleRootSuccess ||
      switchSaleStatusSuccess
    ) {
      setIsSuccess(true);
    }

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (floorAndCeilingPriceError || merkleRootError || switchSaleStatusError) {
      setIsError(true);
    }
  }, [
    floorAndCeilingPriceError,
    floorAndCeilingPriceSuccess,
    merkleRootError,
    merkleRootSuccess,
    switchSaleStatusSuccess,
    switchSaleStatusError
  ]);

  useEffect(() => {
    if (isSuccess) {
      triggerNftSaleUpdate();
      refetchSalesData();
      setIsSubmitting(false);
      setOpenEditSale(false);
      setSelectedSale(undefined);
      setFloorAndCeilingPriceHash(undefined);
      setMerkleRootHash(undefined);
      setSwitchSaleStatusHash(undefined);
      setIsSuccess(false);
      setIsError(false);
      setAddressesToRemove([]);
      showSuccessToast("Your sale has been edited!", width);
      return;
    }

    if (isError) {
      setIsSubmitting(false);
      setFloorAndCeilingPriceHash(undefined);
      setMerkleRootHash(undefined);
      setSwitchSaleStatusHash(undefined);
      setIsSuccess(false);
      setIsError(false);
      setAddressesToRemove([]);
    }
  }, [isSuccess, isError]);

  return {
    handleEditSale,
    isSubmitting
  };
};
