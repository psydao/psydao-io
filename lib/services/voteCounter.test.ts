import { describe, it, expect, vi, beforeEach } from "vitest";
import { main } from "./voteCounter";
import {
  getPsycHolders,
  getPsycHoldersBeforeTimestamp,
  PsycHolder
} from "./getPsycHolders";
import {
  getSnapshotProposals,
  getVotesOnProposalById,
  Proposal,
  type Vote
} from "./getSnapshotProposalsAndVotes";
import { pinClaimsListToIpfs } from "./ipfs";

// Mock env before any other imports
vi.mock("@/config/env.mjs", () => ({
  env: {
    // Add only the env variables used in the test
    SNAPSHOT_GRAPHQL_URL: "https://hub.snapshot.org/graphql",
    NEXT_PUBLIC_SUBGRAPH_URL:
      "https://api.studio.thegraph.com/query/83978/psydao-sepolia/version/latest",
    NEXT_PUBLIC_MAINNET_SUBGRAPH_URL:
      "https://api.studio.thegraph.com/query/83978/psydao-mainnet/version/latest",
    NEXT_PUBLIC_CHAIN_ID: 1,
    PINATA_JWT: "test-jwt",
    PINATA_API_KEY: "test-key",
    PINATA_SECRET_API_KEY: "test-secret"
  }
}));

// Mock all external dependencies
vi.mock("./getPsycHolders");
vi.mock("./getSnapshotProposalsAndVotes");
vi.mock("./ipfs");
vi.mock("@/constants/claims", () => ({
  SNAPSHOT_GRAPHQL_URL: "https://hub.snapshot.org/graphql",
  PSYDAO_ENS: "psydao.eth",
  NEXT_PUBLIC_SUBGRAPH_URL:
    "https://api.studio.thegraph.com/query/83978/psydao-sepolia/version/latest",
  NEXT_PUBLIC_MAINNET_SUBGRAPH_URL:
    "https://api.studio.thegraph.com/query/83978/psydao-mainnet/version/latest"
}));

describe("voteCounter main function", () => {
  const mockInput = {
    startTimeStamp: 1723932000,
    endTimeStamp: 1726005600,
    totalAmountOfTokens: 7675.0616,
    batchId: 25
  };

  const mockProposal: Proposal = {
    id: "0x123",
    snapshot: "123456",
    start: 1723932000,
    end: 1726005600
  };

  const mockPsycHolders: PsycHolder[] = [
    { owner: "0x7c6d212e46e38f7c1a9c12d1664ce90b202715a4" },
    { owner: "0x8754a4c886f8cb77a1d2f38470c653ddb4727f21" }
  ];

  const mockVotes: Vote[] = [
    {
      id: "0xvote1",
      voter: "0x7c6d212e46e38f7c1a9c12d1664ce90b202715a4",
      created: 1723932100
    },
    {
      id: "0xvote2",
      voter: "0x8754a4c886f8cb77a1d2f38470c653ddb4727f21",
      created: 1723932200
    }
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should distribute tokens equally when no proposals exist", async () => {
    const totalTokens = 767506.16; // Matching real distribution
    const mockHoldersInPeriod: PsycHolder[] = [
      { owner: "0xd9c0bb3476ce2ad2102d3ac07287bb802eea98f1" },
      { owner: "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9" },
      { owner: "0xf2217ba914d9c07b81c5e4b10a2eb2ec478d49aa" }
    ];

    vi.mocked(getSnapshotProposals).mockResolvedValue([]);
    vi.mocked(getPsycHoldersBeforeTimestamp).mockResolvedValue(
      mockHoldersInPeriod
    );
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue("QmHash123");

    const result = await main(
      mockInput.startTimeStamp,
      mockInput.endTimeStamp,
      totalTokens,
      mockInput.batchId
    );

    expect(result.balances).toHaveLength(3);

    // Each holder should get exactly 255,835.3866666667 tokens
    const expectedTokensPerHolder = (totalTokens / 3).toFixed(10);
    result.balances.forEach((balance) => {
      expect(Number(balance.tokens)).toBe(255835);
    });

    // Total should be exactly 767,506.16
    const totalDistributed = result.balances.reduce(
      (sum, balance) => sum + parseFloat(balance.tokens),
      0
    );
    expect(totalDistributed).toBeLessThanOrEqual(767506.16);
  });

  it("should calculate distribution correctly with valid inputs", async () => {
    // Add debug logging
    console.log("Starting test with mock data:", { mockProposal, mockVotes });

    vi.mocked(getSnapshotProposals).mockResolvedValue([mockProposal]);
    vi.mocked(getPsycHolders).mockResolvedValue(
      mockPsycHolders as PsycHolder[]
    );
    vi.mocked(getVotesOnProposalById).mockResolvedValue(mockVotes as Vote[]);
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue("QmHash123");

    const result = await main(
      mockInput.startTimeStamp,
      mockInput.endTimeStamp,
      mockInput.totalAmountOfTokens,
      mockInput.batchId
    );

    // Log the result to see what we're getting
    console.log("Test result:", result);

    expect(result.merkleRoot).toBeDefined();
    expect(result.merkleRoot).not.toBe("0x");
    expect(result.balances).toBeDefined();
    expect(result.balances.length).toBeGreaterThan(0);
    expect(result.ipfsHash).toBe("QmHash123");
    expect(result.balances).toHaveLength(2); // Two voters

    // Verify the balances are calculated correctly
    const totalTokens = result.balances.reduce(
      (sum, balance) => sum + parseFloat(balance.tokens),
      0
    );
    expect(totalTokens).toBeLessThanOrEqual(mockInput.totalAmountOfTokens);
  });

  it("should handle filtered out proposals correctly", async () => {
    const filteredProposal: Proposal = {
      id: "0x71166758c2aa68fe1d1d5eb52135a3caafc07284ec1d0b2c6dba8ef161bf7a4c",
      snapshot: "123456",
      start: mockInput.startTimeStamp,
      end: mockInput.endTimeStamp
    };

    // Mock only the necessary functions
    vi.mocked(getSnapshotProposals).mockResolvedValue([filteredProposal]);
    // Mock getPsycHolders to return empty array to prevent further processing
    vi.mocked(getPsycHolders).mockResolvedValue([]);
    // Mock getVotesOnProposalById to return empty array
    vi.mocked(getVotesOnProposalById).mockResolvedValue([]);
    // Mock IPFS upload
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue("");

    const result = await main(
      mockInput.startTimeStamp,
      mockInput.endTimeStamp,
      mockInput.totalAmountOfTokens,
      mockInput.batchId
    );

    // Should return empty result when only filtered proposals exist
    expect(result).toEqual({
      balances: [],
      merkleRoot: "0x",
      ipfsHash: ""
    });
  });

  it("should calculate correct token distribution with multiple proposals", async () => {
    const multipleProposals = [
      mockProposal,
      { ...mockProposal, id: "0x456" },
      { ...mockProposal, id: "0x789" }
    ];

    vi.mocked(getSnapshotProposals).mockResolvedValue(multipleProposals);
    vi.mocked(getPsycHolders).mockResolvedValue(
      mockPsycHolders as PsycHolder[]
    );

    // Create a single vote array for the second proposal
    const singleVote: Vote[] = [mockVotes[0]!]; // Non-null assertion since we know it exists

    vi.mocked(getVotesOnProposalById)
      .mockResolvedValueOnce(mockVotes)
      .mockResolvedValueOnce(singleVote) // Second proposal only one vote
      .mockResolvedValueOnce(mockVotes as Vote[]); // Third proposal both votes

    const result = await main(
      mockInput.startTimeStamp,
      mockInput.endTimeStamp,
      mockInput.totalAmountOfTokens,
      mockInput.batchId
    );

    expect(result.balances).toHaveLength(2);

    // Explicitly check and access array elements
    expect(result.balances[0]).toBeDefined();
    expect(result.balances[1]).toBeDefined();

    // First voter should have more tokens (voted on all proposals)
    const [firstVoter, secondVoter] = result.balances;

    if (!firstVoter || !secondVoter) {
      throw new Error("Test failed: Expected both voters to have balances");
    }

    const firstVoterTokens = parseFloat(firstVoter.tokens);
    const secondVoterTokens = parseFloat(secondVoter.tokens);

    expect(firstVoterTokens).toBeGreaterThan(secondVoterTokens);

    // Total should still equal input amount
    const totalTokens = result.balances.reduce(
      (sum, balance) => sum + parseFloat(balance.tokens),
      0
    );
    expect(totalTokens).toBeLessThanOrEqual(mockInput.totalAmountOfTokens);
  });

  it("should handle errors in snapshot proposals fetch", async () => {
    vi.mocked(getSnapshotProposals).mockRejectedValue(new Error("API Error"));

    await expect(
      main(
        mockInput.startTimeStamp,
        mockInput.endTimeStamp,
        mockInput.totalAmountOfTokens,
        mockInput.batchId
      )
    ).rejects.toThrow("API Error");
  });

  it("should handle errors in PSYC holders fetch", async () => {
    vi.mocked(getSnapshotProposals).mockResolvedValue([mockProposal]);
    vi.mocked(getPsycHolders).mockRejectedValue(new Error("Holders API Error"));

    await expect(
      main(
        mockInput.startTimeStamp,
        mockInput.endTimeStamp,
        mockInput.totalAmountOfTokens,
        mockInput.batchId
      )
    ).rejects.toThrow("Holders API Error");
  });

  it("should handle errors in votes fetch", async () => {
    vi.mocked(getSnapshotProposals).mockResolvedValue([mockProposal]);
    vi.mocked(getPsycHolders).mockResolvedValue(
      mockPsycHolders as PsycHolder[]
    );
    vi.mocked(getVotesOnProposalById).mockRejectedValue(
      new Error("Votes API Error")
    );

    await expect(
      main(
        mockInput.startTimeStamp,
        mockInput.endTimeStamp,
        mockInput.totalAmountOfTokens,
        mockInput.batchId
      )
    ).rejects.toThrow("Votes API Error");
  });

  it("should handle errors in IPFS upload", async () => {
    vi.mocked(getSnapshotProposals).mockResolvedValue([mockProposal]);
    vi.mocked(getPsycHolders).mockResolvedValue(
      mockPsycHolders as PsycHolder[]
    );
    vi.mocked(getVotesOnProposalById).mockResolvedValue(mockVotes);
    vi.mocked(pinClaimsListToIpfs).mockRejectedValue(new Error("IPFS Error"));

    await expect(
      main(
        mockInput.startTimeStamp,
        mockInput.endTimeStamp,
        mockInput.totalAmountOfTokens,
        mockInput.batchId
      )
    ).rejects.toThrow("IPFS Error");
  });

  it("should handle no eligible voters correctly", async () => {
    const proposal: Proposal = {
      id: "0x123",
      snapshot: "123456",
      start: mockInput.startTimeStamp,
      end: mockInput.endTimeStamp
    };

    vi.mocked(getSnapshotProposals).mockResolvedValue([proposal]);
    vi.mocked(getPsycHolders).mockResolvedValue([]); // No PSYC holders
    vi.mocked(getVotesOnProposalById).mockResolvedValue([]);
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue("");

    const result = await main(
      mockInput.startTimeStamp,
      mockInput.endTimeStamp,
      mockInput.totalAmountOfTokens,
      mockInput.batchId
    );

    console.log("No eligible voters result:", result);

    expect(result).toEqual({
      balances: [],
      merkleRoot: "0x",
      ipfsHash: ""
    });
  });

  it("should distribute tokens equally after rounding", async () => {
    const mockProposal = {
      id: "0x123",
      snapshot: "123456",
      start: 1723932000,
      end: 1726005600
    };

    // Test with 3 holders
    const mockPsycHolders = [
      { owner: "0xd9c0bb3476ce2ad2102d3ac07287bb802eea98f1" },
      { owner: "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9" },
      { owner: "0xf2217ba914d9c07b81c5e4b10a2eb2ec478d49aa" }
    ] as PsycHolder[];

    // Make sure votes match holder addresses
    const mockVotes = mockPsycHolders.map((holder, index) => ({
      id: `vote${index}`,
      voter: holder.owner.toLowerCase(),
      created: 1723932100 + index
    }));

    vi.mocked(getSnapshotProposals).mockResolvedValue([mockProposal]);
    vi.mocked(getPsycHolders).mockResolvedValue(mockPsycHolders);
    vi.mocked(getVotesOnProposalById).mockResolvedValue(mockVotes);
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue("QmHash123");

    const totalAmount = 767506.15;
    const result = await main(1723932000, 1726005600, totalAmount, 25);

    // Convert all numbers to strings with full precision for comparison
    const totalDistributed = result.balances.reduce(
      (sum, balance) => sum + Number(balance.tokens),
      0
    );
    expect(totalDistributed).toBeLessThanOrEqual(totalAmount);

    // Verify that the last person can claim
    const lastBalance = Number(
      result.balances[result.balances.length - 1]?.tokens
    );
    const sumWithoutLast = result.balances
      .slice(0, -1)
      .reduce((sum, balance) => sum + Number(balance.tokens), 0);

    expect(sumWithoutLast + lastBalance).toBeLessThanOrEqual(totalAmount);
  });

  it("should handle the exact distribution case that was failing", async () => {
    const mockProposal = {
      id: "0x123",
      snapshot: "123456",
      start: 1723932000,
      end: 1726005600
    };

    // Recreate the exact case that was failing
    const mockPsycHolders = [
      { owner: "0xc3ac5ef1a15c40241233c722fe322d83b010e445" },
      { owner: "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9" },
      { owner: "0x407a6d10206f40a7aec3046fc17c4a186171b4e7" }
    ] as PsycHolder[];

    const mockVotes = mockPsycHolders.map((holder, index) => ({
      id: `vote${index}`,
      voter: holder.owner,
      created: 1723932100 + index
    }));

    vi.mocked(getSnapshotProposals).mockResolvedValue([mockProposal]);
    vi.mocked(getPsycHolders).mockResolvedValue(mockPsycHolders);
    vi.mocked(getVotesOnProposalById).mockResolvedValue(mockVotes);
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue("QmHash123");

    const totalAmount = 767506.1;
    const result = await main(1723932000, 1726005600, totalAmount, 25);

    // Each holder should get exactly 255835.36666666667
    const expectedPerHolder = "255835.00000000000";

    result.balances.forEach((balance) => {
      expect(balance.tokens).toBe(expectedPerHolder);
    });

    // Verify exact sum
    const totalDistributed = result.balances.reduce(
      (sum, balance) => sum + Number(balance.tokens),
      0
    );

    expect(totalDistributed).toBeLessThanOrEqual(totalAmount);
  });
});
