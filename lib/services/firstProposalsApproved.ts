import { getPsycHolders } from "./getPsycHolders";
import { keccak256, encodePacked, parseUnits } from "viem";
import { MerkleTree } from "merkletreejs";
import { Balance, uploadArrayToIpfs } from "./ipfs";
import { userTestMapping } from "./config/test-mapping";
import { TEST_ENV } from "@/constants/claims";

export const firstProposals = async (
  endTimeStamp: number,
  totalAmountOfTokens: number,
  batchId: number
) => {
  let psycHolderTokenDistribution: Balance[] = [];
  const sgData = await getPsycHolders(endTimeStamp);
  const psycHolders = sgData.map((psycHolder: any) => psycHolder.owner);
  const tokenPerHolder = totalAmountOfTokens / psycHolders.length;
  // Calculate the amount of tokens each psyc holder gets based on the percentage of votes they have
  psycHolderTokenDistribution = psycHolders.map((psycHolder) => {
    return {
      address: TEST_ENV
        ? ((userTestMapping[psycHolder] as `0x${string}`) ??
          (psycHolder as `0x${string}`))
        : (psycHolder as `0x${string}`),
      tokens: tokenPerHolder.toString()
    };
  });
  const leaves = psycHolderTokenDistribution.map((holder) =>
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
  const tree = new MerkleTree(leaves);
  const merkleRoot = tree.getHexRoot();

  const ipfsHash = await uploadArrayToIpfs(psycHolderTokenDistribution);

  return { psycHolderTokenDistribution, merkleRoot, ipfsHash };
};
