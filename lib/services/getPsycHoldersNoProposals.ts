import { getPsycHoldersBeforeTimestamp } from "./getPsycHolders";
import {
  keccak256,
  encodePacked,
  parseUnits,
  Address,
  formatUnits
} from "viem";
import { MerkleTree } from "merkletreejs";
import { Balance, pinClaimsListToIpfs } from "./ipfs";
import { userTestMapping, TEST_ENV } from "../testMapping";
import BigNumber from "bignumber.js";

export const psycHoldersNoProposals = async (
  endTimeStamp: number,
  totalAmountOfTokens: string,
  batchId: number
) => {
  let balances: Balance[] = [];
  const sgData = await getPsycHoldersBeforeTimestamp(endTimeStamp);

  const psycHolders = sgData.map((psycHolder) =>
    TEST_ENV
      ? (userTestMapping[psycHolder.owner] ??
        (psycHolder.owner.toLowerCase() as Address))
      : (psycHolder.owner.toLowerCase() as Address)
  );
  const totalAmount = new BigNumber(totalAmountOfTokens);
  const numberOfHolders = new BigNumber(psycHolders.length);
  const tokenPerHolder = totalAmount.dividedBy(numberOfHolders).toString();

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
