import { isAddress } from "viem";

export const splitAndValidateAddresses = (
  addresses: string,
  onError: (message: string) => void
): string[] => {
  const splitAddresses = addresses.length > 0 ? addresses.split(", ") : [];
  const invalidAddresses = splitAddresses.filter(
    (address) => !isAddress(address)
  );

  if (invalidAddresses.length > 0) {
    onError("Invalid address");
    return [];
  }

  return splitAddresses;
};
