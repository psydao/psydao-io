import type { SaleTokensMetadata } from "@/lib/types";
import { getTokensMetadataForASale } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const useImageData = (tokenIds: string[]) => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const { data, loading, error } = useQuery<SaleTokensMetadata>(
    getTokensMetadataForASale,
    {
      variables: {
        ids: tokenIds
      }
    }
  );

  console.log(tokenIds);

  useEffect(() => {
    if (data && data.tokens.length > 0) {
      setImageUris(data.tokens.map((token) => token.uri));
    }
  }, [data]);

  console.log(data, error?.message);

  return { imageUris, loading, error };
};

export default useImageData;
