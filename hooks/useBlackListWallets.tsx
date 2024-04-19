import { SanctionIdentificationResponse } from "pages/api/blacklist/[address]";
import useSWR from "swr";

export const fetcher: (
  url: string
) => Promise<SanctionIdentificationResponse> = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as Promise<SanctionIdentificationResponse>;
};

export const useBlackListWallets = (address: string) => {
  const { data, error } = useSWR<SanctionIdentificationResponse>(
    address ? `/api/blacklist/${address}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !data && !error
  };
};
