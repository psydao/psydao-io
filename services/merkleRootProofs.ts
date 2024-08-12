import { MerkleTree } from "merkletreejs";

import { keccak256 } from "ethers";

export const getMerkleProof = (
  address: `0x${string}` | null | undefined,
  whitelist?: `0x${string}`[]
): string[] => {
  if (!whitelist || !address) {
    console.error("Invalid whitelist or address:", { whitelist, address });
    return [];
  }
  try {
    const leaves = whitelist.map((item) => keccak256(item));
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const proof = merkleTree.getHexProof(keccak256(address));
    return proof;
  } catch (error) {
    console.error("Error generating Merkle proof:", error);
    return [];
  }
};
