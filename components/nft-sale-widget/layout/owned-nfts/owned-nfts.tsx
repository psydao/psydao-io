import { Flex, Grid, Box, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { type GetTokensByOwnerData, type Sale } from "@/lib/types";
import PsycItem from "../../psyc-item";
import useUserCopyBalances from "@/hooks/useUserCopyBalances";
import { formatUnits } from "viem";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
  activeSale: Sale | undefined;
  isOriginal: boolean;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const images = ["/psyc1.webp", "/psyc2.webp", "/psyc3.webp", "/psyc4.webp"];
  const { address } = useAccount();
  const {
    balances: copyBalances,
    loading: balancesLoading,
    refetchBalances
  } = useUserCopyBalances(props.activeSale, address);

  if (!address) return null;

  const filteredCopyTokens =
    props.activeSale?.tokensOnSale.filter(
      (token) => parseInt(copyBalances[token.tokenID] ?? "0", 10) > 0
    ) ?? [];

  const showEmptyState = !props.isOriginal && filteredCopyTokens.length === 0;

  return (
    <Flex justifyContent={"center"} py={4} px={4}>
      <Grid
        templateColumns={{
          base: "minmax(170px, 1fr)",
          sm: "repeat(auto-fit, minmax(170px, 1fr))"
        }}
        gap={6}
        justifyItems={"center"}
        maxW={"100%"}
      >
        {props.isOriginal
          ? props.nftData?.tokens.map((token, index) => (
              <PsycItem
                key={index}
                item={{
                  src: images[index % images.length] ?? "",
                  tokenId: token.tokenId,
                  whitelist: [],
                  balance: "0",
                  batchId: props.activeSale?.batchID ?? "",
                  price: "0",
                  isSold: false,
                  ipfsHash: ""
                }}
                index={index}
                isPrivateSale={false}
                isOwnedView={true}
                isOriginal={props.isOriginal}
                refetchBalances={refetchBalances}
                isRandom={false}
                loading={false}
                isAddressesLoading={false}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                handleModal={() => {}}
              />
            ))
          : filteredCopyTokens.map((token, index) => (
              <PsycItem
                key={index}
                item={{
                  src: images[index % images.length] ?? "",
                  tokenId: token.tokenID,
                  whitelist: [],
                  balance: copyBalances[token.tokenID] ?? "0",
                  batchId: props.activeSale?.batchID ?? "",
                  price: `${formatUnits(BigInt(props?.activeSale?.ceilingPrice ?? 0), 18)}`,
                  isSold: false,
                  ipfsHash: ""
                }}
                index={index}
                isPrivateSale={false}
                isOwnedView={true}
                isOriginal={props.isOriginal}
                refetchBalances={refetchBalances}
                isRandom={false}
                loading={balancesLoading}
                isAddressesLoading={false}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                handleModal={() => {}}
              />
            ))}

        {showEmptyState && (
          <Box>
            <Text>No copies owned in this batch.</Text>
          </Box>
        )}
      </Grid>
    </Flex>
  );
};

export default OwnedNfts;
