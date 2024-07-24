import { useQuery } from "@apollo/client";
import { getTokensOwners } from "@/services/graph";
import type { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";

interface TokenOwnerData {
  tokens: { id: string; owner: string }[];
}

interface TokenOwnerVars {
  ids: string[];
}

interface UseFetchTokenOwnerResult {
  owners: { id: string; owner: string }[];
  loading: boolean;
  error: ApolloError | undefined;
}

const useFetchTokenOwners = (tokenIds: string[]): UseFetchTokenOwnerResult => {
  const { data, loading, error } = useQuery<TokenOwnerData, TokenOwnerVars>(
    getTokensOwners,
    {
      variables: { ids: tokenIds }
    }
  );

  const [owners, setOwners] = useState<{ id: string; owner: string }[]>([]);

  useEffect(() => {
    if (data?.tokens) {
      setOwners(data.tokens);
    }
  }, [data]);

  return { owners, loading, error };
};

export default useFetchTokenOwners;
