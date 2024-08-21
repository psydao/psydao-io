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
import { getAllSalesWithTokens, getSaleById } from "@/services/graph";
import type {
  Sale,
  GetSaleByIdData,
  GetAllSalesWithTokensData
} from "@/lib/types";
import { useWindowManager } from "@/components/ui/window-manager";

interface SaleWidgetContextType {
  activeSale: Sale | undefined;
  setActiveSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;
  isOriginal: boolean;
  setIsOriginal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: unknown;
  isWrongNetwork: boolean;
  fullScreenWindow: boolean;
  allSalesData?: GetAllSalesWithTokensData;
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
  const [activeSale, setActiveSale] = useState<Sale>();
  const [isOriginal, setIsOriginal] = useState<boolean>(false);

  const { data: allSalesData, loading: allSalesLoading } =
    useQuery<GetAllSalesWithTokensData>(getAllSalesWithTokens);
  const { data, loading, error, refetch } = useQuery<GetSaleByIdData>(
    getSaleById,
    {
      variables: {
        id: activeSale ? activeSale.id : allSalesData?.sales[0]?.id ?? "1"
      },
      skip: !activeSale && (allSalesLoading || allSalesData?.sales.length === 0)
    }
  );

  const CHAINID = process.env.NEXT_PUBLIC_CHAIN_ID ?? 1;
  const isWrongNetwork = chainId !== Number(CHAINID);

  useEffect(() => {
    if (
      !allSalesLoading &&
      allSalesData &&
      allSalesData.sales.length > 0 &&
      !activeSale
    ) {
      setActiveSale(allSalesData.sales[0]);
    }
  }, [allSalesLoading, allSalesData, activeSale]);

  useEffect(() => {
    const refetchData = async () => {
      if (updateTrigger) {
        await refetch();
      }
    };
    refetchData().catch(console.error);
  }, [updateTrigger, refetch, activeSale]);

  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    return state.fullScreen === "nft-sale";
  }, [state]);

  const isLoading = loading || allSalesLoading;

  return (
    <SaleWidgetContext.Provider
      value={{
        activeSale,
        setActiveSale,
        allSalesData,
        isOriginal,
        setIsOriginal,
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
