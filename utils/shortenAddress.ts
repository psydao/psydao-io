import { type Address, getAddress } from "viem";

const shortenAddress = (address: Address, chars = 4) => {
  const formatted = getAddress(address);

  return `${formatted.slice(0, chars)}...${formatted.slice(-chars)}`;
};

export { shortenAddress };
