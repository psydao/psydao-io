import { getPsycHolders } from "./getPsycHolders";
import { keccak256, encodePacked, parseUnits } from "viem";
import { MerkleTree } from "merkletreejs";
import { Balance, uploadArrayToIpfs } from "./ipfs";

export const firstProposals = async (
  endTimeStamp: number,
  totalAmountOfTokens: number,
  batchId: number
) => {
  let psycHolderTokenDistribution: Balance[] = [];
  const sgData = await getPsycHolders(endTimeStamp);
  const psycHolders = sgData.map((psycHolder: any) => psycHolder.owner);

  // Calculate exact token amount per holder with full precision
  const tokenPerHolder = (totalAmountOfTokens / psycHolders.length)
    .toLocaleString('fullwide', {
      useGrouping: false,
      minimumFractionDigits: 11,
      maximumFractionDigits: 11
    });

  // Calculate the amount of tokens each psyc holder gets based on the percentage of votes they have
  psycHolderTokenDistribution = psycHolders.map((psycHolder) => {
    return {
      address: psycHolder as `0x${string}`,
      tokens: tokenPerHolder
    };
  });

  // Verify total equals input amount
  const totalDistributed = psycHolderTokenDistribution
    .reduce((sum, holder) => sum + Number(holder.tokens), 0)
    .toLocaleString('fullwide', {
      useGrouping: false,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  const leaves = psycHolderTokenDistribution.map((holder) => {
    // const tokenAmount = Number(holder.tokens)
    //   .toLocaleString('fullwide', {
    //     useGrouping: false,
    //     minimumFractionDigits: 0,
    //     maximumFractionDigits: 18
    //   });
    const tokenAmount = holder.tokens
      .replace(/\.?0+$/, ''); // Remove trailing zeros but keep decimal precision

    return keccak256(
      encodePacked(
        ["uint256", "uint256", "address"],
        [
          BigInt(batchId),
          parseUnits(tokenAmount, 18),
          holder.address as `0x${string}`
        ]
      )
    )
  });

  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const merkleRoot = tree.getHexRoot();

  const ipfsHash = await uploadArrayToIpfs(psycHolderTokenDistribution);

  return { psycHolderTokenDistribution, merkleRoot, ipfsHash };
};
