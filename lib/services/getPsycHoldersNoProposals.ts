import { getPsycHoldersBeforeTimestamp } from "./getPsycHolders";
import { keccak256, encodePacked, parseUnits, Address } from "viem";
import { MerkleTree } from "merkletreejs";
import { Balance, pinClaimsListToIpfs } from "./ipfs";

export const psycHoldersNoProposals = async (
  endTimeStamp: number,
  totalAmountOfTokens: number,
  batchId: number
) => {
  let balances: Balance[] = [];
  const sgData = await getPsycHoldersBeforeTimestamp(endTimeStamp);

  const psycHolders = sgData.map(
    (psycHolder) => psycHolder.owner.toLowerCase() as Address
  );
  const tokenPerHolder = totalAmountOfTokens / psycHolders.length;

  // Calculate the amount of tokens each psyc holder gets based on the percentage of votes they have
  balances = psycHolders.map((psycHolder) => {
    return {
      address: psycHolder as Address,
      tokens: tokenPerHolder.toString()
    };
  });

  const leaves = balances.map((holder) =>
    keccak256(
      encodePacked(
        ["uint256", "uint256", "address"],
        [
          BigInt(batchId),
          parseUnits(holder.tokens, 18),
          holder.address as Address
        ]
      )
    )
  );

  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const merkleRoot = tree.getHexRoot();

  // const ipfsHash = await uploadArrayToIpfs(balances);
  const ipfsHash = await pinClaimsListToIpfs(balances);
  console.log("no proposal IPFS is ", ipfsHash);
  return { balances, merkleRoot, ipfsHash };
};
