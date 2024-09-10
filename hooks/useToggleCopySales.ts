import { useCallback, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import ERC1155Abi from "../abis/ERC1155Abi.json";
import ERC1155AbiSepolia from "../abis/ERC115AbiSepolia.json";
import { ERC1155Mainnet, ERC1155Sepolia } from "../constants/contracts";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";
import { env } from "@/config/env.mjs";

interface ToggleCopySalesProps {
  refetchSaleStatus: () => void;
}

const useToggleCopySales = ({ refetchSaleStatus }: ToggleCopySalesProps) => {
  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash
  });
  const { width } = useResize();
  const { showCustomErrorToast, showSuccessToast } = useCustomToasts();

  const toggleSaleStatus = useCallback(
    async (tokenIds: number[]) => {
      writeContract({
        address: env.NEXT_PUBLIC_IS_MAINNET ? ERC1155Mainnet : ERC1155Sepolia,
        abi: env.NEXT_PUBLIC_IS_MAINNET ? ERC1155Abi : ERC1155AbiSepolia,
        functionName: "switchSaleStatus",
        args: [tokenIds]
      });
    },
    [writeContract]
  );

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast("Success! Sale status has been toggled.", width);
      refetchSaleStatus();
    } else if (error) {
      const message = (error as Error).message || "An error occurred";
      showCustomErrorToast(message, width);
    }
  }, [isSuccess, error, width]);

  return {
    toggleSaleStatus,
    isPending: isPending || isWaiting,
    isSuccess,
    error
  };
};

export default useToggleCopySales;
