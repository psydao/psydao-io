import { GraphQLClient } from "graphql-request";
import { Codex } from "@codex-data/sdk";

export const codexSDK = new Codex(process.env.NEXT_PUBLIC_CODEX_API_KEY!);

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
