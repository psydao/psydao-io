import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from "./env.mjs";

const graphClient = new ApolloClient({
  uri: env.NEXT_PUBLIC_SUBGRAPH_URL,
  cache: new InMemoryCache()
});

export default graphClient;
