import { useCreatePsycSale } from "@/services/web3/useCreatePsycSale";
import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";

export const useCreateSale = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { createSale, error, isConfirmed, isConfirming, isPending } =
    useCreatePsycSale();

  if (!address) {
    toast({
      title: "Please connect your wallet first",
      position: "top-right",
      status: "error",
      isClosable: true
    });
    return;
  }

  const createSaleBatch = async (
    tokenIds: number[],
    saleStartTime: number,
    floorPrice: string,
    ceilingPrice: string,
    merkleRoot: string,
    ipfsHash: string
  ) => {
    try {
      await createSale(
        tokenIds,
        saleStartTime,
        floorPrice,
        ceilingPrice,
        merkleRoot,
        ipfsHash
      );
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
    createSaleBatch,
    error,
    isConfirmed,
    isConfirming,
    isPending
  };
};
