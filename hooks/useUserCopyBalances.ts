import { useState, useEffect, useCallback } from "react";
import {
  useApolloClient,
  type ApolloClient,
  type NormalizedCacheObject
} from "@apollo/client";
import { getUserCopyBalance } from "@/services/graph";
import { type Sale } from "@/lib/types";

interface UseUserCopyBalancesResult {
  balances: { [key: string]: string };
  refetchBalances: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useUserCopyBalances = (
  activeSale: Sale | undefined,
  address: string | undefined
): UseUserCopyBalancesResult => {
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const fetchBalances = useCallback(async () => {
    if (!activeSale || !address) return;

    setLoading(true);
    setError(null);

    try {
      const balancesPromises = activeSale.tokensOnSale.map(async (token) => {
        const concatenatedId = `${address.toLowerCase()}-${token.tokenID}`;
        const { data }: { data: { userCopyBalance?: { balance: string } } } =
          await client.query({
            query: getUserCopyBalance,
            variables: { id: concatenatedId },
            fetchPolicy: "network-only"
          });

        return {
          tokenId: token.tokenID,
          balance: data.userCopyBalance?.balance ?? "0"
        };
      });

      const balancesData = await Promise.all(balancesPromises);
      const balancesMap = balancesData.reduce(
        (acc, { tokenId, balance }) => {
          acc[tokenId] = balance;
          return acc;
        },
        {} as { [key: string]: string }
      );

      setBalances(balancesMap);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [client, activeSale, address]);

  const refetchAllBalances = async () => {
    await fetchBalances();
  };
  useEffect(() => {
    refetchAllBalances().catch(console.error);
  }, [refetchAllBalances]);

  return { balances, refetchBalances: refetchAllBalances, loading, error };
};

export default useUserCopyBalances;
