import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { env } from "./env.mjs";

const graphClient = new ApolloClient({
  uri: env.NEXT_PUBLIC_SUBGRAPH_URL,
  cache: new InMemoryCache()
});

const freebaseGraphClient = new ApolloClient({
  uri: env.NEXT_PUBLIC_FREEBASE_SUBGRAPH_URL,
  cache: new InMemoryCache()
});

const httpLink = createHttpLink({
  uri: "/api/shopify-proxy"
});

const shopifyClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export { graphClient, freebaseGraphClient, shopifyClient };
