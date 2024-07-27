import React, { useEffect, useState, useMemo } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import {
  type ApolloClient,
  type NormalizedCacheObject,
  useApolloClient,
  useQuery
} from "@apollo/client";
import { getAllSalesWithTokens, getUserCopyBalance } from "@/services/graph";
import type { TokenItem, GetAllSalesWithTokensData, Sale } from "@/lib/types";
import { formatUnits } from "viem";
import PsycItem from "../../psyc-item";
import useRandomImage from "@/hooks/useRandomImage";
import { getAddresses } from "@/lib/server-utils";
import usePrivateSale from "@/hooks/usePrivateSale";
import { useAccount } from "wagmi";

interface MintSectionProps {
  isRandom: boolean;
  activeSale: Sale | undefined;
  isFullscreen?: boolean;
  isOriginal: boolean;
}

interface WhitelistedTokenItem extends TokenItem {
  whitelist: string[];
  balance: string;
}

interface UserCopyBalance {
  balance: string;
  id: string;
  originalTokenId: string;
  user: string;
}

const MintSection = ({
  isRandom,
  activeSale,
  isOriginal
}: MintSectionProps) => {
  const { loading, error, data } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { address } = useAccount();
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [randomToken, setRandomToken] = useState<WhitelistedTokenItem | null>(
    null
  );
  const [whitelist, setWhitelist] = useState<{ [key: string]: string[] }>({});
  const { isLoading, isPrivateSale } = usePrivateSale();

  const fetchUserBalance = async (
    client: ApolloClient<NormalizedCacheObject>,
    tokenId: string,
    address: string
  ): Promise<UserCopyBalance | null> => {
    const concatenatedId = `${address.toLowerCase()}-${tokenId}`;
    try {
      const { data } = await client.query<{
        userCopyBalance: UserCopyBalance | null;
      }>({
        query: getUserCopyBalance,
        variables: { id: concatenatedId }
      });
      console.log(data.userCopyBalance, "copyBalance");
      return data.userCopyBalance;
    } catch (error) {
      console.error("Error fetching user balance:", error);
      return null;
    }
  };

  const fetchBalances = async () => {
    if (address && activeSale) {
      try {
        const balancesPromises = activeSale.tokensOnSale.map(async (token) => {
          const userBalance = await fetchUserBalance(
            client,
            token.tokenID,
            address
          );

          return {
            tokenId: token.tokenID,
            balance: userBalance?.balance ?? "0"
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
      } catch (error) {
        console.error("Error fetching user balances:", error);
      }
    }
  };

  const refetchAllBalances = async () => {
    await fetchBalances();
  };

  const images = useMemo(() => {
    if (!activeSale) return [];
    return activeSale.tokensOnSale.map(
      (_, index) => `/psyc${(index % 3) + 1}.webp`
    );
  }, [activeSale]);

  const currentImageIndex = useRandomImage(isRandom, images);

  const activeTokens = useMemo(() => {
    if (!activeSale) return [];
    return activeSale.tokensOnSale.map((token, index) => ({
      src: images[index] ?? "",
      price: `${formatUnits(BigInt(activeSale.floorPrice), 18)}`,
      isSold: false,
      batchId: activeSale.batchID,
      tokenId: token.tokenID,
      ipfsHash: activeSale.ipfsHash,
      whitelist: whitelist[activeSale.ipfsHash] ?? [],
      balance: balances[token.tokenID] ?? "0"
    }));
  }, [activeSale, images, whitelist, balances]);

  const fetchWhitelist = async () => {
    if (activeSale) {
      try {
        const addresses = await getAddresses(activeSale.ipfsHash);
        setWhitelist((prev) => ({
          ...prev,
          [activeSale.ipfsHash]: addresses
        }));
      } catch (error) {
        console.error("Error fetching whitelist addresses:", error);
      }
    }
  };
  useEffect(() => {
    console.log(!isLoading && isPrivateSale, "isPrivateSale");
  }, [isPrivateSale]);

  useEffect(() => {
    console.log(data?.sales, "sales");
  }, [data]);

  useEffect(() => {
    if (address && activeSale) {
      fetchBalances().catch((error) => {
        console.error("Error fetching balances:", error);
      });
    }
  }, [address, activeSale, client]);

  useEffect(() => {
    if (activeSale) {
      fetchWhitelist().catch((error) => {
        console.error("Error fetching whitelist:", error);
      });
    }
  }, [activeSale]);

  useEffect(() => {
    if (isRandom && activeTokens.length > 0) {
      setRandomToken(
        activeTokens[currentImageIndex % activeTokens.length] ?? null
      );
    }
  }, [activeTokens, currentImageIndex, isRandom]);

  if (loading) return <Box textAlign="center">Loading...</Box>;
  if (error) return <Box textAlign="center">Error loading data</Box>;

  const privateSaleStatus = !isLoading && isPrivateSale;

  return (
    <Flex textAlign="center" py={4} px={4} justifyContent={"center"}>
      {isRandom && randomToken ? (
        <Flex justifyContent="center" w={"100%"}>
          <PsycItem
            item={randomToken}
            index={currentImageIndex}
            isRandom={true}
            isPrivateSale={privateSaleStatus}
            isOriginal={isOriginal}
            loading={loading}
            refetchBalances={refetchAllBalances}
          />
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(auto-fit, minmax(170px, 1fr))"
          }}
          gap={6}
          justifyItems={"center"}
          maxW={"100%"}
        >
          {activeSale?.tokensOnSale.map((token, index) => (
            <PsycItem
              key={token.id}
              item={{
                src: `/psyc${(index % 3) + 1}.webp`,
                price: `${formatUnits(BigInt(activeSale.ceilingPrice), 18)}`,
                isSold: false,
                batchId: activeSale.batchID,
                tokenId: token.tokenID,
                ipfsHash: activeSale.ipfsHash,
                whitelist: whitelist[activeSale.ipfsHash] ?? [],
                balance: balances[token.tokenID] ?? "0"
              }}
              index={parseInt(token.id, 10)}
              isRandom={isRandom}
              isPrivateSale={privateSaleStatus}
              isOriginal={isOriginal}
              loading={loading}
              refetchBalances={refetchAllBalances}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default MintSection;
