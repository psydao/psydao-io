import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  uploadArrayToIpfs,
  getIpfsHash,
  pinClaimsListToIpfs,
  type Balance
} from "./ipfs";
import axios from "axios";
import { PinataSDK } from "pinata";
import { env } from "@/config/env.mjs";
import { Address } from "viem";

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
vi.mock("axios");
vi.mock("pinata");

describe("IPFS Service", () => {
  const mockBalances: Balance[] = [
    { address: "0x123" as Address, tokens: "100" },
    { address: "0x456" as Address, tokens: "200" }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("uploadArrayToIpfs", () => {
    it("should successfully upload array to IPFS", async () => {
      vi.mocked(axios.post).mockResolvedValue({
        data: { IpfsHash: "QmTestHash123" }
      });

      const result = await uploadArrayToIpfs(mockBalances);

      expect(result).toBe("QmTestHash123");
      expect(axios.post).toHaveBeenCalledWith(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        expect.any(FormData),
        expect.any(Object)
      );
    });

    it("should handle upload errors", async () => {
      vi.mocked(axios.post).mockRejectedValue(new Error("Upload failed"));
      const consoleSpy = vi.spyOn(console, "error");

      const result = await uploadArrayToIpfs(mockBalances);

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe("getIpfsHash", () => {
    it("should fetch data from IPFS", async () => {
      const mockData = { some: "data" };
      vi.mocked(axios.get).mockResolvedValue({ data: mockData });

      const result = await getIpfsHash("QmTestHash123");

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(
        `${env.NEXT_PUBLIC_PINATA_BASE_URL}/ipfs/QmTestHash123`
      );
    });

    it("should handle fetch errors", async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error("Fetch failed"));

      await expect(getIpfsHash("QmTestHash123")).rejects.toThrow(
        "Fetch failed"
      );
    });
  });

  describe("pinClaimsListToIpfs", () => {
    const mockPinata = {
      upload: {
        json: vi.fn()
      }
    };

    beforeEach(() => {
      vi.mocked(PinataSDK).mockImplementation(() => mockPinata as any);
    });

    it("should successfully pin claims list to IPFS", async () => {
      mockPinata.upload.json.mockResolvedValue({
        IpfsHash: "QmTestHash123",
        isDuplicate: false
      });

      const result = await pinClaimsListToIpfs(mockBalances);

      expect(result).toBe("QmTestHash123");
      expect(mockPinata.upload.json).toHaveBeenCalledWith(
        mockBalances,
        expect.objectContaining({
          cidVersion: 0,
          metadata: expect.any(Object),
          groupId: expect.any(String)
        })
      );
    });

    it("should handle duplicate pins", async () => {
      mockPinata.upload.json.mockResolvedValue({
        IpfsHash: "QmTestHash123",
        isDuplicate: true
      });

      const consoleSpy = vi.spyOn(console, "log");
      const result = await pinClaimsListToIpfs(mockBalances);

      expect(result).toBe("QmTestHash123");
      expect(consoleSpy).toHaveBeenCalledWith(
        "Duplicate pin detected: ",
        "QmTestHash123"
      );
    });

    it("should handle pinning errors", async () => {
      mockPinata.upload.json.mockRejectedValue(new Error("Pinning failed"));
      const consoleSpy = vi.spyOn(console, "error");

      await expect(pinClaimsListToIpfs(mockBalances)).rejects.toThrow(
        "Pinning failed"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "IPFS upload error: ",
        expect.any(Error)
      );
    });

    it("should use correct Pinata configuration", async () => {
      mockPinata.upload.json.mockResolvedValue({
        IpfsHash: "QmTestHash123",
        isDuplicate: false
      });

      await pinClaimsListToIpfs(mockBalances);

      expect(PinataSDK).toHaveBeenCalledWith({
        pinataJwt: process.env.PINATA_ADMIN_JWT,
        pinataGateway: "red-literary-tiglon-645.mypinata.cloud"
      });
    });
  });
});
