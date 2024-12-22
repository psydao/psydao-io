import MerkleTree from "merkletreejs";
import { isAddress, keccak256, parseUnits } from "viem";
import { parseISO } from "date-fns";
export const getMerkleRoot = (values: `0x${string}`[]): string => {
  const leaves = values.map((item) => keccak256(item));

  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return merkleTree.getHexRoot();
};

export const toUnixTimestamp = (
  startDate: string,
  startTime: string
): number => {
  const isoString = `${startDate}T${startTime}:00`;
  const date = parseISO(isoString);
  return Math.floor(date.getTime() / 1000);
};

export const toWei = (value: string): bigint => {
  return parseUnits(value, 18);
};

export const getNewAddresses = (
  addressesToRemove: string[],
  newAddresses: string[],
  existingAddresses: string[],
  onError: () => void
): `0x${string}`[] => {
  const filteredAddresses = existingAddresses.filter(
    (address) => !addressesToRemove.includes(address)
  );
  filteredAddresses.push(...newAddresses);
  const invalidAddresses = filteredAddresses.filter(
    (address) => !isAddress(address)
  );

  if (invalidAddresses.length > 0) {
    onError();
    return [];
  }
  return filteredAddresses.map(address => address.toLowerCase()) as `0x${string}`[];
};
