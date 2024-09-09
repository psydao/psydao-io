import useSWR from "swr";
import type { Address } from "viem";

const usePoapData = (address: Address | undefined) => {
  if (!address) return null;
  const { data, error } = useSWR(address ? `/api/poap/${address}` : null);
  return {
    data,
    error
  };
};

export default usePoapData;
