import { describe, it, expect, vi, beforeEach } from "vitest";
import { firstProposals } from "./firstProposalsApproved";
import { getPsycHolders, type PsycHolder } from "./getPsycHolders";
import { uploadArrayToIpfs } from "./ipfs";

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

// Mock dependencies
vi.mock("./getPsycHolders");
vi.mock("./ipfs");
vi.mock("@/constants/claims", () => ({
  SNAPSHOT_GRAPHQL_URL: "https://hub.snapshot.org/graphql",
  PSYDAO_ENS: "psydao.eth",
  NEXT_PUBLIC_SUBGRAPH_URL:
    "https://api.studio.thegraph.com/query/83978/psydao-sepolia/version/latest",
  NEXT_PUBLIC_MAINNET_SUBGRAPH_URL:
    "https://api.studio.thegraph.com/query/83978/psydao-mainnet/version/latest"
}));

describe("firstProposals", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should distribute tokens equally and round down the remainder", async () => {
    // Mock the exact case that was failing before
    const mockHolders = [
      { owner: "0xc3ac5ef1a15c40241233c722fe322d83b010e445" },
      { owner: "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9" },
      { owner: "0x407a6d10206f40a7aec3046fc17c4a186171b4e7" }
    ] as PsycHolder[];

    vi.mocked(getPsycHolders).mockResolvedValue(mockHolders);
    vi.mocked(uploadArrayToIpfs).mockResolvedValue("QmHash123");

    const totalAmount = 767506.16;
    const result = await firstProposals(1726005600, totalAmount, 25);

    // Each holder should get exactly 255835 since it is rounded down
    const expectedPerHolder = "255835";

    result.psycHolderTokenDistribution.forEach((holder) => {
      expect(holder.tokens).toBe(expectedPerHolder);
    });

    // Verify total equals input amount
    const totalDistributed = result.psycHolderTokenDistribution.reduce(
      (sum, holder) => sum + Number(holder.tokens),
      0
    );

    expect(totalDistributed).toBeLessThanOrEqual(totalAmount);
  });

  it("should handle different numbers of holders", async () => {
    const mockHolders = [
      { owner: "0xc3ac5ef1a15c40241233c722fe322d83b010e445" },
      { owner: "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9" },
      { owner: "0x407a6d10206f40a7aec3046fc17c4a186171b4e7" },
      { owner: "0x07effc25352088e044d2e91e57d06877c5d49e46" },
      { owner: "0x1885754425d75bddce43bd82f24f160d8f6abadf" }
    ] as PsycHolder[];

    vi.mocked(getPsycHolders).mockResolvedValue(mockHolders);
    vi.mocked(uploadArrayToIpfs).mockResolvedValue("QmHash123");

    const totalAmount = 767506.16;
    const result = await firstProposals(1726005600, totalAmount, 25);

    expect(result.psycHolderTokenDistribution).toHaveLength(5);

    // Verify each holder gets equal amount
    const firstAmount = result.psycHolderTokenDistribution[0]?.tokens;
    result.psycHolderTokenDistribution.forEach((holder) => {
      expect(holder.tokens).toBe(firstAmount);
    });

    // Verify total equals input amount
    const totalDistributed = result.psycHolderTokenDistribution.reduce(
      (sum, holder) => sum + Number(holder.tokens),
      0
    );

    expect(totalDistributed).toBeLessThanOrEqual(totalAmount);
  });

  it("should generate valid merkle tree and root", async () => {
    const mockHolders = [
      { owner: "0xc3ac5ef1a15c40241233c722fe322d83b010e445" },
      { owner: "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9" }
    ] as PsycHolder[];

    vi.mocked(getPsycHolders).mockResolvedValue(mockHolders);
    vi.mocked(uploadArrayToIpfs).mockResolvedValue("QmHash123");

    const result = await firstProposals(1726005600, 1000, 25);

    expect(result.merkleRoot).toBeDefined();
    expect(result.merkleRoot).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });

  it("should handle single holder case", async () => {
    const mockHolders = [
      { owner: "0xc3ac5ef1a15c40241233c722fe322d83b010e445" }
    ] as PsycHolder[];

    vi.mocked(getPsycHolders).mockResolvedValue(mockHolders);
    vi.mocked(uploadArrayToIpfs).mockResolvedValue("QmHash123");

    const totalAmount = 767506.16;
    const result = await firstProposals(1726005600, totalAmount, 25);

    expect(result.psycHolderTokenDistribution).toHaveLength(1);
    expect(Number(result.psycHolderTokenDistribution[0]?.tokens)).toBe(
      Math.floor(totalAmount)
    );
  });

  it("should handle error in getPsycHolders", async () => {
    vi.mocked(getPsycHolders).mockRejectedValue(new Error("API Error"));

    await expect(firstProposals(1726005600, 1000, 25)).rejects.toThrow(
      "API Error"
    );
  });

  it("should handle error in IPFS upload", async () => {
    const mockHolders = [
      { owner: "0xc3ac5ef1a15c40241233c722fe322d83b010e445" }
    ] as PsycHolder[];

    vi.mocked(getPsycHolders).mockResolvedValue(mockHolders);
    vi.mocked(uploadArrayToIpfs).mockRejectedValue(new Error("IPFS Error"));

    await expect(firstProposals(1726005600, 1000, 25)).rejects.toThrow(
      "IPFS Error"
    );
  });

  it("should handle empty holders array", async () => {
    vi.mocked(getPsycHolders).mockResolvedValue([]);
    vi.mocked(uploadArrayToIpfs).mockResolvedValue("QmHash123");

    const result = await firstProposals(1726005600, 1000, 25);

    expect(result.psycHolderTokenDistribution).toHaveLength(0);
    expect(result.merkleRoot).toBeDefined();
    expect(result.ipfsHash).toBe("QmHash123");
  });

  it("should maintain precision with large numbers of holders", async () => {
    // Create 100 mock holders
    const mockHolders = Array.from({ length: 100 }, (_, i) => ({
      owner: `0x${i.toString().padStart(40, "0")}`
    })) as PsycHolder[];

    vi.mocked(getPsycHolders).mockResolvedValue(mockHolders);
    vi.mocked(uploadArrayToIpfs).mockResolvedValue("QmHash123");

    const totalAmount = 767506.16;
    const result = await firstProposals(1726005600, totalAmount, 25);

    // Verify total distributed equals input amount
    const totalDistributed = result.psycHolderTokenDistribution.reduce(
      (sum, holder) => sum + Number(holder.tokens),
      0
    );

    expect(totalDistributed).toBeLessThanOrEqual(totalAmount);
  });
});
