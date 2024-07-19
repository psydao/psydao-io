import { useState, useCallback } from "react";
import { useWriteContract } from "wagmi";

import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";

const useActivateSale = () => {
  const [isSalesActive, setIsSalesActive] = useState(false);
  const { writeContract } = useWriteContract();

  const activateSale = useCallback(
    async (tokenId: number[], onError: (error: unknown) => void) => {
      try {
        setIsSalesActive(false);
        writeContract({
          address: psycSaleSepolia,
          abi: psycSaleAbiSepolia,
          functionName: "setSalesActive",
          args: [tokenId]
        });
        setIsSalesActive(true);
        console.log("Sales activated", tokenId);
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
