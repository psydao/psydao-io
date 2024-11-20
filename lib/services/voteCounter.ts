import { getPsycHolders } from "./getPsycHolders";
import {
  getSnapshotProposals,
  getVotesOnProposalById
} from "./getSnapshotProposalsAndVotes";
import { keccak256, encodePacked, parseUnits, Address } from "viem";
import { MerkleTree } from "merkletreejs";
import { Balance, pinClaimsListToIpfs, uploadArrayToIpfs } from "./ipfs";

import { psycHoldersNoProposals } from "./getPsycHoldersNoProposals";
export const main = async (
  startTimeStamp: number,
  endTimeStamp: number,
  totalAmountOfTokens: number,
  batchId: number
) => {
  const proposals = await getSnapshotProposals(startTimeStamp, endTimeStamp);

  let psycHolders: Address[] = [];
  let psycHolderVotesPercentage: { address: Address; percentage: number }[] =
    [];
  let psycHolderTokenDistribution: {
    address: Address;
    tokens: number;
    leftOver: number;
    percentage: number;
  }[] = [];
  const votesCountMap: { [address: Address]: number } = {};
  let totalVotes: number = 0;

  if (!!proposals && proposals.length > 0) {
    // Exclude random created proposals with ID 0x71166758c2aa68fe1d1d5eb52135a3caafc07284ec1d0b2c6dba8ef161bf7a4c
    const filteredProposals = proposals.filter(
      (proposal: any) =>
        proposal.id !==
        "0x71166758c2aa68fe1d1d5eb52135a3caafc07284ec1d0b2c6dba8ef161bf7a4c"
    );

    const sgData = await getPsycHolders(
      Number(filteredProposals[filteredProposals.length - 1]?.snapshot)
    );

    psycHolders = sgData.map(
      (psycHolder) => psycHolder.owner.toLowerCase() as Address
    );

    const tokenPerHolder = totalAmountOfTokens / psycHolders.length;

    psycHolders.forEach((holder) => {
      votesCountMap[holder.toLowerCase() as Address] = 0;
    });

    for (const proposal of filteredProposals) {
      const votes = (await getVotesOnProposalById(proposal.id)) ?? [];
      votes.forEach((vote) => {
        const voterAddress = vote.voter.toLowerCase() as Address;
        if (psycHolders.includes(voterAddress.toLowerCase() as Address)) {
          if (votesCountMap[voterAddress] !== undefined) {
            votesCountMap[voterAddress]++;
            totalVotes++;
          }
        }
      });
    }
    psycHolderVotesPercentage = Object.entries(votesCountMap).map(
      ([address, count]) => {
        return {
          address: address as Address,
          percentage: Number((count / filteredProposals.length).toFixed(2))
        };
      }
    );

    // Calculate the amount of tokens each psyc holder gets based on the percentage of votes they have
    psycHolderTokenDistribution = psycHolderVotesPercentage.map(
      (psycHolder) => {
        return {
          address: psycHolder.address,
          tokens: Number(psycHolder.percentage.toFixed(2)) * tokenPerHolder,
          percentage: psycHolder.percentage,
          leftOver: tokenPerHolder - psycHolder.percentage * tokenPerHolder
        };
      }
    );
  }

  if (proposals?.length === 0) {
    const emptyProposalsCalculation = await psycHoldersNoProposals(
      endTimeStamp,
      totalAmountOfTokens,
      batchId
    );
    return emptyProposalsCalculation;
  }

  const unAllocatedTokens = psycHolderTokenDistribution.reduce(
    (acc, curr) => acc + curr.leftOver,
    0
  );

  // Upload array to IPFS and get the hash
  const balances: Balance[] = psycHolderTokenDistribution.map((holder) => {
    return {
      address: holder.address,
      tokens: (
        holder.tokens +
        (unAllocatedTokens * (votesCountMap[holder.address] ?? 0)) / totalVotes
      ).toFixed(10)
    };
  });

  const leaves = balances.map((holder) =>
    keccak256(
      encodePacked(
        ["uint256", "uint256", "address"],
        [BigInt(batchId), parseUnits(holder.tokens, 18), holder.address]
      )
    )
  );

  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const merkleRoot = tree.getHexRoot();

  console.log("with proposals ipfs upload");
  const ipfsHash = await pinClaimsListToIpfs(balances);
  return { balances, merkleRoot, ipfsHash };
};
