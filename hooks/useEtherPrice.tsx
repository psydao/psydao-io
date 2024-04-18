import useSWR from "swr";

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
};

export const swrOptions = {
  refreshWhenHidden: false,
  refreshInterval: 20_000, // 20 seconds
  revalidateOnFocus: false,
};

export interface PricingResponse {
  ETH: number;
  WSTETH: number;
  CBETH: number;
  SFRXETH: number;
  RETH: number;
}

export const useEthPrice = () => {
  const { data } = useSWR<PricingResponse>(
    "https://ksyyaj4s1m.execute-api.ap-southeast-1.amazonaws.com/prod/pricing",
    fetcher,
    swrOptions
  );
  return data && data.ETH;
};
