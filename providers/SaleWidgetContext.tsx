import React, {
  createContext,
  useState,
  type ReactNode,
  useContext
} from "react";

interface SaleWidgetContextType {
  updateNftSaleTrigger: number;
  triggerNftSaleUpdate: () => void;
}

const SaleWidgetContext = createContext<SaleWidgetContextType | undefined>(
  undefined
);

interface SaleWidgetProviderProps {
  children: ReactNode;
}

const SaleWidgetProvider: React.FC<SaleWidgetProviderProps> = ({
  children
}) => {
  const [updateNftSaleTrigger, setUpdateNftSaleTrigger] = useState(0);

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  return (
    <SaleWidgetContext.Provider
      value={{ updateNftSaleTrigger, triggerNftSaleUpdate }}
    >
      {children}
    </SaleWidgetContext.Provider>
  );
};

export const useSaleWidgetContext = (): SaleWidgetContextType => {
  const context = useContext(SaleWidgetContext);
  if (!context) {
    throw new Error(
      "useSaleWidgetContext must be used within a SaleWidgetProvider"
    );
  }
  return context;
};

export default SaleWidgetProvider;
