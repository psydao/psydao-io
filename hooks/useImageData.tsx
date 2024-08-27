import type { SaleTokensMetadata } from "@/lib/types";
import { getTokensMetadataForASale } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/psyc3.webp";

const useImageData = (tokenIds: string[]) => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const { data, loading, error } = useQuery<SaleTokensMetadata>(
    getTokensMetadataForASale,
    {
      variables: {
        tokenIds: tokenIds
      }
    }
  );

  useEffect(() => {
    if (data && data.tokens.length > 0) {
      setImageUris(
        data.tokens.map((token) => token.metadata?.imageURI || FALLBACK_IMAGE)
      );
    } else {
      setImageUris(Array(tokenIds.length).fill(FALLBACK_IMAGE));
    }
  }, [data]);

  return { imageUris, loading, error };
};

export default useImageData;
