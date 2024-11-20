import { encodePacked, formatUnits, keccak256, parseUnits } from "viem";
import { Balance, getIpfsHash } from "./ipfs";
import MerkleTree from "merkletreejs";
import { ClaimDetail } from "../types";

export type Claim = {
  id: string;
  claims: ClaimDetail[];
  ipfsHash: string;
  merkleRoot: string;
  amount: string;
  claimed: boolean;
  deadline: string;
  batchId: string;
  reason: string;
  buttonDisabled: boolean;
  merkleProof: string[];
};

export const sortOutData = async (data: Claim[], address: string) => {
  if (data === undefined || data.length === 0 || !address) {
    return [];
  }
  const batchSize = 50; // Adjust this value based on your needs
  const batches = [];

  for (let i = 0; i < data.length; i += 50) {
    const batch = data.slice(i, i + batchSize);
    const processedBatch = await Promise.all(
      batch.map((claim) => processClaim(claim, address))
    );
    batches.push(...processedBatch);
  }

  return batches;
};

const processClaim = async (claim: Claim, address: string) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
  const deadlineTimestamp = parseInt(claim.deadline);
  const updatedClaim = { ...claim };

  if (claim.claimed) {
    updatedClaim.buttonDisabled = true;
    updatedClaim.reason = "Claimed";
  } else if (deadlineTimestamp <= currentTimestamp) {
    updatedClaim.buttonDisabled = claim.claimed;
    updatedClaim.reason = claim.claimed ? "Claimed" : "Expired";
  } else if (
    address &&
    claim.claims.some((c) => c.account.toLowerCase() === address.toLowerCase())
  ) {
    updatedClaim.buttonDisabled = true;
    updatedClaim.reason = "Claimed";
  } else {
    const merkleProof = await getMerkleProof(
      claim.ipfsHash,
      address,
      Number(claim.batchId)
    );
    if (
      merkleProof &&
      merkleProof.proof.length > 0 &&
      merkleProof.amount !== "0"
    ) {
      updatedClaim.merkleProof = merkleProof.proof;
      updatedClaim.amount = merkleProof.amount.toString();
      updatedClaim.buttonDisabled = false;
    } else {
      updatedClaim.buttonDisabled = true;
      updatedClaim.reason = "Not eligible";
      updatedClaim.amount = "0";
    }
  }
  return updatedClaim;
};

export const getMerkleProof = async (
  ipfsHash: string,
  address: string,
  batchId: number
) => {
  const balances: Balance[] = await getIpfsHash(ipfsHash);
  const addressBalance = balances.find(
    (holder: any) => holder.address === address.toLowerCase()
  );
  if (!addressBalance) {
    return { proof: [], root: "", amount: 0 };
  }
  const leaves = balances.map((holder) =>
    keccak256(
      encodePacked(
        ["uint256", "uint256", "address"],
        [
          BigInt(batchId),
          parseUnits(holder.tokens, 18),
          holder.address as `0x${string}`
        ]
      )
    )
  );
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const leaf = keccak256(
    encodePacked(
      ["uint256", "uint256", "address"],
      [
        BigInt(batchId),
        parseUnits(addressBalance.tokens, 18),
        address as `0x${string}`
      ]
    )
  );
  const proof = tree.getHexProof(leaf);
  const root = tree.getHexRoot();
  const verified = tree.verify(proof, leaf, root);
  return { proof, root, amount: addressBalance.tokens, verified };
};
