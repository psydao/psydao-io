import { useBuyRandomPsycPrivate } from "@/services/web3/useBuyRandomPsycPrivate";
import { useToast } from "@chakra-ui/react";

import { useAccount } from "wagmi";

const useBuyRandomNftPrivate = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { buyRandomPsycPrivate, isConfirmed, isConfirming, isPending, error } =
    useBuyRandomPsycPrivate();

  const buyRandomPrivate = async (
    buyRandomFromBatch: string,
    batchId: number,
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
      await buyRandomPsycPrivate(buyRandomFromBatch, batchId, proof);
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
    buyRandomPrivate,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};

export default useBuyRandomNftPrivate;
