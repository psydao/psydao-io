import { type ApolloClient, type NormalizedCacheObject } from "@apollo/client";
import { getUserCopyBalance } from "@/services/graph";
import { type Sale } from "@/lib/types";

export const fetchUserCopyBalances = async (
  client: ApolloClient<NormalizedCacheObject>,
  activeSale: Sale,
  address: string
): Promise<{ [key: string]: string }> => {
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
  return balancesMap;
};
