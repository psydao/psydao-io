import { Flex, Grid, Box, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { countNumberOfCopies } from "@/utils/countNumberOfCopies";
import { OwnedNFTItem } from "./owned-nft-item";
import { type GetTokensByOwnerData, type Sale } from "@/lib/types";
import { fetchUserCopyBalances } from "@/utils/fetchUserCopyBalances";
import {
  type ApolloClient,
  type NormalizedCacheObject,
  useApolloClient
} from "@apollo/client";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
  activeSale: Sale | undefined;
  isOriginal: boolean;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const images = ["/psyc1.webp", "/psyc2.webp", "/psyc3.webp", "/psyc4.webp"];
  const { address } = useAccount();
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [copyBalances, setCopyBalances] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    if (address && props.activeSale && !props.isOriginal) {
      fetchUserCopyBalances(client, props.activeSale, address)
        .then((balances) => {
          setCopyBalances(balances);
        })
        .catch((error) => {
          console.error("Error fetching user copy balances:", error);
        });
    }
  }, [address, props.activeSale, props.isOriginal, client]);

  const numberOfCopies = countNumberOfCopies(props.nftData ?? { tokens: [] });

  if (!address) {
    return null;
  }

  return (
    <Flex justifyContent={"center"} py={4} px={4}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(auto-fit, minmax(240px, 1fr))"
        }}
        gap={6}
        justifyContent="center"
        alignItems="center"
        maxW="1000px"
      >
        {props.isOriginal
          ? props.nftData?.tokens.map((token, index) => (
              <OwnedNFTItem
                key={index}
                item={{
                  src: images[index % images.length] ?? "",
                  owner: token.owner,
                  tokenId: token.tokenId
                }}
                copiesOwned={numberOfCopies[token.tokenId] ?? 0}
                src={images[index % images.length] ?? ""}
                index={index}
                isPrivateSale={false}
                isOwned={token.owner === address}
                isOriginal={props.isOriginal}
              />
            ))
          : props.activeSale?.tokensOnSale
              .filter(
                (token) => parseInt(copyBalances[token.tokenID] ?? "0", 10) > 0
              )
              .map((token, index) => (
                <OwnedNFTItem
                  key={index}
                  item={{
                    src: images[index % images.length] ?? "",
                    owner: address ?? "",
                    tokenId: token.tokenID
                  }}
                  copiesOwned={parseInt(copyBalances[token.tokenID] ?? "0", 10)}
                  src={images[index % images.length] ?? ""}
                  index={index}
                  isPrivateSale={false}
                  isOwned={copyBalances[token.tokenID] !== "0"}
                  isOriginal={props.isOriginal}
                />
              ))}

        {!props.isOriginal &&
          (props.activeSale?.tokensOnSale?.length ?? 0) > 0 &&
          Object.values(copyBalances).every(
            (balance) => parseInt(balance, 10) === 0
          ) && (
            <Box>
              <Text>No copies owned in this batch.</Text>
            </Box>
          )}
      </Grid>
    </Flex>
  );
};

export default OwnedNfts;
