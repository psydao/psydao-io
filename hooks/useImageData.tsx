import type { SaleTokensMetadata } from "@/lib/types";
import { getTokensMetadataForASale } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

const FALLBACK_IMAGE = "/psyc3.webp";

/**
 * Custom hook to fetch and manage image URIs for given token IDs.
 * 
 * @param {string[]} tokenIds - An array of token IDs to fetch metadata for.
 * @returns {{
*   imageUris: string[],
*   loading: boolean,
*   error: ApolloError | undefined
* }} An object containing image URIs, loading state, and any error.
*/
const useImageData = (tokenIds: string[]) => {
  const { data, loading, error } = useQuery<SaleTokensMetadata>(
    getTokensMetadataForASale,
    {
      variables: { tokenIds },
      skip: tokenIds.length === 0,
    }
  );

  const imageUris: string[] = useMemo(() => {
    if (data?.tokens.length) {
      return data.tokens.map((token) => token.metadata?.imageURI || FALLBACK_IMAGE);
    }
    return tokenIds.map(() => FALLBACK_IMAGE);
  }, [data, tokenIds]);

  return { imageUris, loading, error };
};

export default useImageData;
