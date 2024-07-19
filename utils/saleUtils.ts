import MerkleTree from "merkletreejs";
import { isAddress, keccak256, parseUnits } from "viem";
import { type AdminSale } from "@/lib/types";

export const getMerkleRoot = (values: `0x${string}`[]): string => {
  const leaves = values.map((item) => keccak256(item));

  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return merkleTree.getHexRoot();
};

export const toUnixTimestamp = (date: string, time: string): number => {
  const dateTime = new Date(`${date}T${time}:00Z`);
  return Math.floor(dateTime.getTime() / 1000);
};

export const toWei = (value: string): bigint => {
  return parseUnits(value, 18);
};

export const getLastTokenId = (sales: AdminSale[]): number => {
  if (sales.length === 0) return 0;
  const lastSale = sales[sales.length - 1];
  return lastSale?.tokenIds[lastSale.tokenIds.length - 1] ?? 0;
};

export const getNewAddresses = (
  addressesToRemove: string[],
  newAddresses: string[],
  existingAddresses: string[]
): `0x${string}`[] => {
  const filteredAddresses = existingAddresses.filter(
    (address) => !addressesToRemove.includes(address)
  );
  filteredAddresses.push(...newAddresses);
  filteredAddresses.forEach((address) => {
    if (address.length > 0 && !isAddress(address)) {
      console.error("Invalid address was input");
      throw new Error("Invalid address");
    }
    return;
  });
  return filteredAddresses as `0x${string}`[];
};
