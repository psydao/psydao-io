import { snapshotGraphQLClient } from "../../config/graphqlClients";
import { getProposals, getVotesOnProposal } from "@/services/graph";

export interface Proposal {
  start: number;
  end: number;
  id: string;
  snapshot: string;
}
export interface Vote {
  id: string;
  voter: string;
  created: number;
}

export const getSnapshotProposals = async (
  startTimeStamp: number,
  endTimeStamp: number
) => {
  try {
    const data = await snapshotGraphQLClient.request<{ proposals: Proposal[] }>(
      getProposals,
      { startTimeStamp, endTimeStamp }
    );
    return data.proposals;
  } catch (err) {}
};

export const getVotesOnProposalById = async (proposalId: string) => {
  try {
    const data = await snapshotGraphQLClient.request<{ votes: Vote[] }>(
      getVotesOnProposal,
      { proposalId }
    );
    return data.votes;
  } catch (err) {}
};
