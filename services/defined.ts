import { Codex } from "@codex-data/sdk";
import { env } from "@/config/env.mjs";

export const codexSDK = new Codex(env.NEXT_PUBLIC_CODEX_API_KEY!);

// Type for token price response
export interface TokenPriceResponse {
  getTokenPrices: {
    address: string;
    confidence: number;
    networkId: number;
    priceUsd: number;
    poolAddress: string;
    timestamp: number;
  }[];
}

export function createTokenPricesQuery(psyAddress: string, bioAddress: string) {
  return `
    query {
      getTokenPrices(
        inputs: [
          { address: "${psyAddress}", networkId: 1 }
          { address: "${bioAddress}", networkId: 1 }
        ]
      ) {
        address
        confidence
        networkId
        priceUsd
        poolAddress
        timestamp
      }
    }
  `;
}
