import { describe, it, expect, vi, beforeEach } from 'vitest'
import { psycHoldersNoProposals } from './getPsycHoldersNoProposals'
import { getPsycHoldersBeforeTimestamp, PsycHolder } from './getPsycHolders'
import { pinClaimsListToIpfs } from './ipfs'
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
vi.mock('./getPsycHolders', () => ({
  getPsycHoldersBeforeTimestamp: vi.fn()
}))

vi.mock('./ipfs', () => ({
  pinClaimsListToIpfs: vi.fn()
}))

describe('psycHoldersNoProposals', () => {
  const mockEndTimestamp = 1234567890
  const mockTotalTokens = 1000
  const mockBatchId = 1

  const mockHolders: PsycHolder[] = [
    { owner: '0x7c6d212e46e38f7c1a9c12d1664ce90b202715a4' },
    { owner: '0x8754a4c886f8cb77a1d2f38470c653ddb4727f21' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should distribute tokens equally among holders', async () => {
    vi.mocked(getPsycHoldersBeforeTimestamp).mockResolvedValue(mockHolders)
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue('QmTestHash123')

    const result = await psycHoldersNoProposals(
      mockEndTimestamp,
      mockTotalTokens,
      mockBatchId
    )

    expect(result.balances).toHaveLength(2)
    expect(result.balances[0]?.tokens).toBe('500')
    expect(result.balances[1]?.tokens).toBe('500')
    expect(result.ipfsHash).toBe('QmTestHash123')
    expect(result.merkleRoot).toBeDefined()
  })

  it('should handle empty holders list', async () => {
    vi.mocked(getPsycHoldersBeforeTimestamp).mockResolvedValue([])
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue('QmEmptyHash')

    const result = await psycHoldersNoProposals(
      mockEndTimestamp,
      mockTotalTokens,
      mockBatchId
    )

    expect(result.balances).toHaveLength(0)
    expect(result.ipfsHash).toBe('QmEmptyHash')
    expect(result.merkleRoot).toBe('0x')
  })

  it('should handle IPFS upload failure', async () => {
    vi.mocked(getPsycHoldersBeforeTimestamp).mockResolvedValue(mockHolders as PsycHolder[])
    vi.mocked(pinClaimsListToIpfs).mockRejectedValue(new Error('IPFS Error'))

    await expect(psycHoldersNoProposals(
      mockEndTimestamp,
      mockTotalTokens,
      mockBatchId
    )).rejects.toThrow('IPFS Error')
  })

  it('should handle getPsycHolders failure', async () => {
    vi.mocked(getPsycHoldersBeforeTimestamp).mockRejectedValue(new Error('Fetch Error'))

    await expect(psycHoldersNoProposals(
      mockEndTimestamp,
      mockTotalTokens,
      mockBatchId
    )).rejects.toThrow('Fetch Error')
  })

  it('should correctly lowercase addresses', async () => {
    const mixedCaseHolders = [
      { owner: '0x7C6D212E46E38F7C1A9C12D1664CE90B202715A4' },
      { owner: '0x8754A4C886F8CB77A1D2F38470C653DDB4727F21' }
    ]

    vi.mocked(getPsycHoldersBeforeTimestamp).mockResolvedValue(mixedCaseHolders as PsycHolder[])
    vi.mocked(pinClaimsListToIpfs).mockResolvedValue('QmTestHash123')

    const result = await psycHoldersNoProposals(
      mockEndTimestamp,
      mockTotalTokens,
      mockBatchId
    )

    expect(result.balances[0]?.address).toBe(
      '0x7c6d212e46e38f7c1a9c12d1664ce90b202715a4' as Address
    )
    expect(result.balances[1]?.address).toBe(
      '0x8754a4c886f8cb77a1d2f38470c653ddb4727f21' as Address
    )
  })
})