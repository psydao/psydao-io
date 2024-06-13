import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { tokenSaleContractSepolia } from "@/constants/contracts";
import tokenSaleAbiSepolia from "@/abis/tokenSaleAbiSepolia.json";

export const useCreatePsycSale = () => {
  const { data, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data
    });

  const createSale = useCallback(
    async (
      tokenIds: number[],
      saleStartTime: number,
      floorPrice: number,
      ceilingPrice: number,
      merkleRoot: string,
      ipfsHash: string
    ) => {
      return writeContract({
        address: tokenSaleContractSepolia,
        functionName: "createSaleBatch",
        abi: tokenSaleAbiSepolia,
        args: [
          tokenIds,
          saleStartTime,
          floorPrice,
          ceilingPrice,
          merkleRoot,
          ipfsHash
        ]
      });
    },
    [writeContract]
  );

  return {
    createSale,
    isConfirmed,
    isConfirming,
    isPending,
    error
  };
};
