import {
  NEXT_PUBLIC_SUBGRAPH_URL,
  NEXT_PUBLIC_MAINNET_SUBGRAPH_URL,
  SNAPSHOT_GRAPHQL_URL
} from "@/constants/claims";
import { GraphQLClient } from "graphql-request";

export const snapshotGraphQLClient = new GraphQLClient(
  SNAPSHOT_GRAPHQL_URL as string
);
export const psycGraphQLClient = new GraphQLClient(
  NEXT_PUBLIC_SUBGRAPH_URL as string
);

export const psycMainnetGraphQLClient = new GraphQLClient(
  NEXT_PUBLIC_MAINNET_SUBGRAPH_URL as string
);
