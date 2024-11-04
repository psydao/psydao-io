import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sortOutData, getMerkleProof, type Claim } from './merkle'
import { getIpfsHash } from './ipfs'
import { Address } from 'viem'

// Mock env before any other imports
vi.mock('@/config/env.mjs', () => ({
  env: {
    // Add only the env variables used in the test
    SNAPSHOT_GRAPHQL_URL: 'https://hub.snapshot.org/graphql',
    TEST_ENV: true,
    NEXT_PUBLIC_SUBGRAPH_URL: 'https://api.studio.thegraph.com/query/83978/psydao-sepolia/version/latest',
    NEXT_PUBLIC_MAINNET_SUBGRAPH_URL: 'https://api.studio.thegraph.com/query/83978/psydao-mainnet/version/latest',
    NEXT_PUBLIC_CHAIN_ID: 1,
    PINATA_JWT: 'test-jwt',
    PINATA_API_KEY: 'test-key',
    PINATA_SECRET_API_KEY: 'test-secret'
  }
}))

// Mock dependencies
vi.mock('./ipfs', () => ({
  getIpfsHash: vi.fn()
}))

describe('Merkle Service', () => {
  const mockIpfsData = [
    {
      "address": "0xc3ac5ef1a15c40241233c722fe322d83b010e445",
      "tokens": "47969.1350000000"
    },
    {
      "address": "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9",
      "tokens": "0.0000000000"
    }
  ]

  const mockClaim: Claim = {
    id: '1',
    claims: [],
    ipfsHash: 'bafkreih6yg4is22v2ur3mgdcpx6m5cz7rz2ua5alijuuqlhgmu2m7htzpa',
    merkleRoot: '0x123',
    amount: '100',
    claimed: false,
    deadline: (Math.floor(Date.now() / 1000) + 3600).toString(), // 1 hour from now
    batchId: '1',
    reason: '',
    buttonDisabled: false,
    merkleProof: []
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMerkleProof', () => {
    it('should generate valid merkle proof for eligible address', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result = await getMerkleProof(
        'testHash',
        '0xc3ac5ef1a15c40241233c722fe322d83b010e445',
        1
      )

      expect(result.amount).toBe('47969.1350000000')
      expect(result.proof).toBeDefined()
      expect(result.verified).toBe(true)
      expect(Array.isArray(result.proof)).toBe(true)
    })

    it('should return empty proof for non-eligible address', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result = await getMerkleProof(
        'testHash',
        '0x1234567890123456789012345678901234567890',
        1
      )

      expect(result).toEqual({
        proof: [],
        root: '',
        amount: 0
      })
    })

    it('should handle zero token balance addresses', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result = await getMerkleProof(
        'testHash',
        '0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9',
        1
      )

      expect(result.amount).toBe('0.0000000000')
      expect(result.proof).toBeDefined()
      expect(result.verified).toBe(true)
    })
  })

  describe('sortOutData', () => {
    it('should return empty array for invalid inputs', async () => {
      expect(await sortOutData([], '0x123')).toEqual([])
      expect(await sortOutData([mockClaim], '')).toEqual([])
      expect(await sortOutData(undefined as any, '0x123')).toEqual([])
    })

    it('should process claimed status correctly', async () => {
      const claimedClaim = { ...mockClaim, claimed: true }

      const result = await sortOutData([claimedClaim], '0x123')

      expect(result[0]?.buttonDisabled).toBe(true)
      expect(result[0]?.reason).toBe('Claimed')
    })

    it('should process expired claims correctly', async () => {
      const expiredClaim = {
        ...mockClaim,
        deadline: (Math.floor(Date.now() / 1000) - 3600).toString() // 1 hour ago
      }

      const result = await sortOutData([expiredClaim], '0x123')

      expect(result[0]?.buttonDisabled).toBe(false)
      expect(result[0]?.reason).toBe('Expired')
    })

    it('should process eligible claims correctly', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result = await sortOutData(
        [mockClaim],
        '0xc3ac5ef1a15c40241233c722fe322d83b010e445'
      )

      expect(result[0]?.buttonDisabled).toBe(false)
      expect(result[0]?.amount).toBe('47969.1350000000')
      expect(result[0]?.merkleProof).toBeDefined()
      expect(Array.isArray(result[0]?.merkleProof)).toBe(true)
    })

    it('should process non-eligible claims correctly', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result = await sortOutData(
        [mockClaim],
        '0x1234567890123456789012345678901234567890'
      )

      expect(result[0]?.buttonDisabled).toBe(true)
      expect(result[0]?.reason).toBe('Not eligible')
      expect(result[0]?.amount).toBe('0')
    })

    it('should handle batch processing correctly', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      // Create array of 75 claims (more than batchSize of 50)
      const claims = Array(75).fill(mockClaim)

      const result = await sortOutData(
        claims,
        '0xc3ac5ef1a15c40241233c722fe322d83b010e445'
      )

      expect(result.length).toBe(75)
      expect(result[0]).toHaveProperty('merkleProof')
      expect(result[74]).toHaveProperty('merkleProof')
    })
  })

  describe('Merkle Tree Verification', () => {
    it('should generate consistent merkle root', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result1 = await getMerkleProof(
        'testHash',
        '0xc3ac5ef1a15c40241233c722fe322d83b010e445',
        1
      )

      const result2 = await getMerkleProof(
        'testHash',
        '0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9',
        1
      )

      expect(result1.root).toBe(result2.root)
    })

    it('should verify proofs correctly', async () => {
      vi.mocked(getIpfsHash).mockResolvedValue(mockIpfsData)

      const result = await getMerkleProof(
        'testHash',
        '0xc3ac5ef1a15c40241233c722fe322d83b010e445',
        1
      )

      expect(result.verified).toBe(true)
    })
  })
})