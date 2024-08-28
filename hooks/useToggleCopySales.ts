import { useCallback, useEffect } from "react";
import { useWriteContract } from "wagmi";

import ERC1155Abi from "../abis/ERC1155Abi.json";
import ERC1155AbiSepolia from "../abis/ERC115AbiSepolia.json";
import { ERC1155Mainnet, ERC1155Sepolia } from "../constants/contracts";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";

const useToggleCopySales = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { width } = useResize();
  const { showCustomErrorToast, showSuccessToast } = useCustomToasts();

  const toggleSaleStatus = useCallback(
    async (tokenIds: number[]) => {
      writeContract({
        address:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? ERC1155Mainnet
            : ERC1155Sepolia,
        abi:
          process.env.NEXT_PUBLIC_CHAIN_ID === "1"
            ? ERC1155Abi
            : ERC1155AbiSepolia,
        functionName: "switchSaleStatus",
        args: [tokenIds]
      });
    },
    [writeContract]
  );

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast("Success! Sale status has been toggled.", width);
    } else if (error) {
      const message = (error as Error).message || "An error occurred";
      showCustomErrorToast(message, width);
    }
  }, [isSuccess, error, width]);

  return {
    toggleSaleStatus,
    isPending,
    isSuccess,
    error
  };
};

export default useToggleCopySales;
