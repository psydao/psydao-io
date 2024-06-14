import { useBuySpecificPsycPrivate } from "@/services/web3/useBuySpecificPsycPrivate";
import { useToast } from "@chakra-ui/react";

import { useAccount } from "wagmi";

const useBuySpecificNftPrivate = () => {
  const { address } = useAccount();
  const toast = useToast();
  const {
    buySpecificPsycPrivate,
    isConfirmed,
    isConfirming,
    isPending,
    error
  } = useBuySpecificPsycPrivate();

  const buySpecificPrivate = async (
    buyFromBatch: string,
    batchId: number,
    tokenId: number,
    proof: string
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
      await buySpecificPsycPrivate(buyFromBatch, batchId, tokenId, proof);
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
    buySpecificPrivate,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};

export default useBuySpecificNftPrivate;
