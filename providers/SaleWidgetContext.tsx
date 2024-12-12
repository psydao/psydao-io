import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { getAllSalesWithTokens } from "@/services/graph";
import type { Sale, GetAllSalesWithTokensData } from "@/lib/types";
import { useWindowManager } from "@/components/ui/window-manager";

interface SaleWidgetContextType {
  isOriginal: boolean;
  isLoading: boolean;
  error: unknown;
  isWrongNetwork: boolean;
  fullScreenWindow: boolean;
  allSalesData: GetAllSalesWithTokensData | undefined;
}

const SaleWidgetContext = createContext<SaleWidgetContextType | undefined>(
  undefined
);

interface SaleWidgetProviderProps {
  children: ReactNode;
  updateTrigger: number;
}

const SaleWidgetProvider: React.FC<SaleWidgetProviderProps> = ({
  children,
  updateTrigger
}) => {
  const { chainId } = useAccount();
  const isOriginal = true;

  const {
    data: allSalesData,
    loading: allSalesLoading,
    error,
    refetch
  } = useQuery<GetAllSalesWithTokensData>(getAllSalesWithTokens);

  const CHAINID = process.env.NEXT_PUBLIC_CHAIN_ID ?? 1;
  const isWrongNetwork = chainId !== Number(CHAINID);

  useEffect(() => {
    const refetchData = async () => {
      if (updateTrigger) {
        await refetch();
      }
    };
    refetchData().catch(console.error);
  }, [updateTrigger, refetch]);

  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    return state.fullScreen === "nft-sale";
  }, [state]);

  const isLoading = allSalesLoading;

  return (
    <SaleWidgetContext.Provider
      value={{
        allSalesData,
        isOriginal,
        isLoading,
        error,
        isWrongNetwork,
        fullScreenWindow
      }}
    >
      {children}
    </SaleWidgetContext.Provider>
  );
};

export const useSaleWidget = (): SaleWidgetContextType => {
  const context = useContext(SaleWidgetContext);
  if (!context) {
    throw new Error("useSaleWidget must be used within a SaleWidgetProvider");
  }
  return context;
};

export default SaleWidgetProvider;
