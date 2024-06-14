import { useBuySpecificPsycCopy } from "@/services/web3/useBuySpecificPsycCopy";
import { useToast } from "@chakra-ui/react";

import { useAccount } from "wagmi";

const useBuySpecificNftCopy = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { buySpecificPsycCopy, isConfirmed, isConfirming, isPending, error } =
    useBuySpecificPsycCopy();

  const buySpecificCopy = async (
    buyNftCopyFromBatch: string,
    batchId: number,
    erc721TokenId: number
  ) => {
    try {
      if (!address) {
        toast({
          title: "Please connect your wallet first",
          position: "top-right",
          status: "error",
          isClosable: true
        });
        return;
      }
      await buySpecificPsycCopy(buyNftCopyFromBatch, batchId, erc721TokenId);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        isClosable: true
      });
    }
  };

  return {
    buySpecificCopy,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};

export default useBuySpecificNftCopy;
