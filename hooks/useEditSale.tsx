import { useAccount, useWriteContract } from "wagmi";
import { useCustomToasts } from "./useCustomToasts";
import { useState } from "react";
import { uploadAddresses } from "@/lib/server-utils";
import { getMerkleRoot } from "@/utils/saleUtils";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { isAddress } from "viem";

const getNewAddresses = (
  addressesToRemove: string[],
  newAddresses: string[],
  existingAddresses: string[]
): `0x${string}`[] => {
  const filteredAddresses = existingAddresses.filter(
    (address) => !addressesToRemove.includes(address)
  );
  filteredAddresses.push(...newAddresses);
  filteredAddresses.forEach((address) => {
    if (address.length > 0 && !isAddress(address)) {
      console.error("Invalid address was input");
      throw new Error("Invalid address");
    }
    return;
  });
  console.log(filteredAddresses);
  return filteredAddresses as `0x${string}`[];
};

export const useEditSale = () => {
  const { isConnected } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending,
    error,
    isSuccess
  } = useWriteContract();
  const { showErrorToast, showSuccessToast, showDefaultErrorToast } =
    useCustomToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleEditSale = async (
    e: React.FormEvent<HTMLFormElement>,
    batchID: string,
    addressesToRemove: string[],
    newAddresses: string[],
    existingAddresses: string[]
  ) => {
    e.preventDefault();
    if (!isConnected) {
      showDefaultErrorToast("Please connect your wallet first");
      return;
    }
    const addressesToSubmit = getNewAddresses(
      addressesToRemove,
      newAddresses,
      existingAddresses
    );

    const ipfsHash = await uploadAddresses(addressesToSubmit);
    const merkleRoot = getMerkleRoot(addressesToSubmit);

    try {
      const args = [batchID, merkleRoot, ipfsHash];
      writeContract({
        ...psycSaleContractConfig,
        functionName: "updateMerkleRoot",
        args
      });
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      console.error(message);
    }
  };

  return { handleEditSale };
};
