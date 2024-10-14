import { type ClaimCardProps } from "./claim-card";

export const dummyData: Partial<ClaimCardProps>[] = [
  {
    amount: "978.88",
    claimStatus: "claimable",
    batchNumber: 1,
    expiry: "2025-01-12",
    totalClaimable: "120000000"
  },
  {
    amount: "436.94",
    claimStatus: "claimable",
    batchNumber: 2,
    expiry: "2024-11-30",
    totalClaimable: "1600000"
  },
  {
    amount: "764.46",
    claimStatus: "claimed",
    batchNumber: 3,
    expiry: "2025-01-07",
    totalClaimable: "60000"
  },
  {
    amount: "843.63",
    claimStatus: "claimed",
    batchNumber: 4,
    expiry: "2024-12-17",
    totalClaimable: "2780000"
  },
  {
    amount: "982.99",
    claimStatus: "expired",
    batchNumber: 5,
    expiry: "2024-12-21",
    totalClaimable: "50000000"
  },
  {
    amount: "629.50",
    claimStatus: "expired",
    batchNumber: 6,
    expiry: "2024-07-24",
    totalClaimable: "100000"
  }
];

export const dummyClaims: Partial<ClaimCardProps>[] = [
  {
    batchNumber: 1,
    expiry: "2025-01-12",
    totalClaimable: "120000000"
  },
  {
    batchNumber: 2,
    expiry: "2024-11-30",
    totalClaimable: "1600000"
  },
  {
    batchNumber: 3,
    expiry: "2025-01-07",
    totalClaimable: "60000"
  }
];
