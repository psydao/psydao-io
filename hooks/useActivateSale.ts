import { useState, useCallback } from "react";
import { useWriteContract } from "wagmi";

import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";

const useActivateSale = () => {
  const [isSalesActive, setIsSalesActive] = useState(false);
  const { writeContract } = useWriteContract();

  const activateSale = useCallback(
    async (tokenIds: number[], onError: (error: unknown) => void) => {
      try {
        setIsSalesActive(false);
        writeContract({
          address: psycSaleSepolia,
          abi: psycSaleAbiSepolia,
          functionName: "setSalesActive",
          args: [tokenIds]
        });
        setIsSalesActive(true);
        console.log("Sales activated", tokenIds);
      } catch (error: unknown) {
        onError(error);
      }
    },
    [writeContract]
  );

  return {
    isSalesActive,
    activateSale
  };
};

export default useActivateSale;
