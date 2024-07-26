import { useState, useCallback, useEffect } from "react";
import { useWriteContract } from "wagmi";

import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";

const useActivateSale = () => {
  const [isSalesActive, setIsSalesActive] = useState(false);
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { width } = useResize();
  const { showCustomErrorToast, showSuccessToast } = useCustomToasts();

  const activateSale = useCallback(
    async (tokenIds: number[]) => {
      setIsSalesActive(false);
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
      setIsSalesActive(true);
      showSuccessToast("Success! Your sales have been activated.", width);
    } else if (error) {
      const message = (error as Error).message || "An error occurred";
      showCustomErrorToast(message, width);
      setIsSalesActive(false);
    }
  }, [isSuccess, error, width]);

  return {
    isSalesActive,
    activateSale,
    isPending,
    isSuccess,
    error
  };
};

export default useActivateSale;
