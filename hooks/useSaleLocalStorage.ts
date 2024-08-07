import { type AdminSale } from "@/lib/types";

const safeJsonParse = <T>(value: string | null): T | null => {
  try {
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

export const useSaleLocalStorage = () => {
  const getWhitelistedAddresses = (): string[] => {
    const whitelistedAddresses = localStorage.getItem("whitelistedAddresses");
    return safeJsonParse<string[]>(whitelistedAddresses) ?? [];
  };

  const saveWhitelistedAddresses = (addresses: string[]) => {
    localStorage.setItem("whitelistedAddresses", JSON.stringify(addresses));
  };

  const getSales = (): AdminSale[] => {
    const storedSales = localStorage.getItem("createdSales");
    return safeJsonParse<AdminSale[]>(storedSales) ?? [];
  };

  const saveSales = (sales: AdminSale[]) => {
    localStorage.setItem("createdSales", JSON.stringify(sales));
  };

  return {
    getWhitelistedAddresses,
    saveWhitelistedAddresses,
    getSales,
    saveSales
  };
};
