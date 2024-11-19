import { BatchClaim } from "@/lib/types";
import { getBatchClaims } from "@/services/graph";
import { useApolloClient } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";

export function useGetBatchClaims() {
  const client = useApolloClient();

  const { data: claims } = useQuery({
    queryKey: ["batchClaims"],
    queryFn: async () => {
      const { data } = await client.query({
        query: getBatchClaims,
        fetchPolicy: "network-only"
      });
      return data?.batchClaims ?? [];
    },
    refetchInterval: 20000 // Refetch every 20 seconds
  });
  return claims as BatchClaim[];
}
