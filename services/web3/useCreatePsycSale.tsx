import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { psycSaleMainnet, psycSaleSepolia } from "@/constants/contracts";
import psycSaleAbi from "@/abis/psycSaleAbi.json";
import psycSaleAbiSepolia from "@/abis/psycSaleAbiSepolia.json";
import { parseUnits } from "viem";
import { env } from "@/config/env.mjs";

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
      floorPrice: string,
      ceilingPrice: string,
      merkleRoot: string,
      ipfsHash: string
    ) => {
      const floorPriceGwei = parseUnits(floorPrice, 18);
      const ceilingPriceGwei = parseUnits(ceilingPrice, 18);
      return writeContract({
        address: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleMainnet : psycSaleSepolia,
        functionName: "createSaleBatch",
        abi: env.NEXT_PUBLIC_IS_MAINNET ? psycSaleAbi : psycSaleAbiSepolia,
        args: [
          tokenIds,
          saleStartTime,
          floorPriceGwei,
          ceilingPriceGwei,
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
