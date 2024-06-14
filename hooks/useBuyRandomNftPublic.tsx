import { useBuyRandomPsycPublic } from "@/services/web3/useBuyRandomPsycPublic";
import { useToast } from "@chakra-ui/react";

import { useAccount } from "wagmi";

const useBuyRandomNftPublic = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { buyRandomPsycPublic, isConfirmed, isConfirming, isPending, error } =
    useBuyRandomPsycPublic();

  const buyRandomPublic = async (
    buyRandomNftCopyFromBatch: string,
    batchId: number
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
      await buyRandomPsycPublic(buyRandomNftCopyFromBatch, batchId);
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
    buyRandomPublic,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};

export default useBuyRandomNftPublic;
