import { getAddress } from "viem";

const shortenAddress = (address: string, chars = 6) => {
  const formatted = getAddress(address);

  return `${formatted.slice(0, chars)}...${formatted.slice(-chars)}`;
};

export { shortenAddress };
