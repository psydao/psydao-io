import { useCallback, useEffect } from "react";
import { useWriteContract } from "wagmi";

import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";

const useActivateSale = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { width } = useResize();
  const { showCustomErrorToast, showSuccessToast } = useCustomToasts();

  const activateSale = useCallback(
    async (tokenIds: number[]) => {
      writeContract({
        address: psycSaleSepolia,
        abi: psycSaleAbiSepolia,
        functionName: "setSalesActive",
        args: [tokenIds]
      });
    },
    [writeContract]
  );

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast("Success! Your sales have been activated.", width);
    } else if (error) {
      const message = (error as Error).message || "An error occurred";
      showCustomErrorToast(message, width);
    }
  }, [isSuccess, error, width]);

  return {
    activateSale,
    isPending,
    isSuccess,
    error
  };
};

export default useActivateSale;
