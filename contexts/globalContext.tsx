import {
  createContext,
  useContext,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction
} from "react";
import { useQuery } from "@apollo/client";
import { getAllSalesWithTokens } from "@/services/graph";
import { type Sale, type GetAllSalesWithTokensData } from "@/lib/types";

type GlobalContextType = {
  openCreateSale: boolean;
  setOpenCreateSale: Dispatch<SetStateAction<boolean>>;
  openEditSale: boolean;
  setOpenEditSale: Dispatch<SetStateAction<boolean>>;
  selectedSale?: Sale;
  setSelectedSale: Dispatch<SetStateAction<Sale | undefined>>;
  data?: GetAllSalesWithTokensData;
  loading: boolean;
  refetchSalesData: () => void;
  updateNftSaleTrigger: number;
  setUpdateNftSaleTrigger: (value: number) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export const GlobalContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [openCreateSale, setOpenCreateSale] = useState(false);
  const [openEditSale, setOpenEditSale] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | undefined>(undefined);
  const { data, loading, refetch } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const [updateNftSaleTrigger, setUpdateNftSaleTrigger] = useState(0);

  const value = useMemo(
    () => ({
      openCreateSale,
      setOpenCreateSale,
      openEditSale,
      setOpenEditSale,
      selectedSale,
      setSelectedSale,
      data,
      loading,
      refetchSalesData: refetch,
      updateNftSaleTrigger,
      setUpdateNftSaleTrigger
    }),
    [openCreateSale, openEditSale, selectedSale, data, loading, refetch]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
