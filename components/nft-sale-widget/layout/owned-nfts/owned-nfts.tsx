import { Flex, Grid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { type GetTokensByOwnerData, type Sale } from "@/lib/types";
import PsycItem from "../../psyc-item";
import useUserCopyBalances from "@/hooks/useUserCopyBalances";
import { formatUnits } from "viem";
import OwnedNftsEmptyState from "./owned-nfts-empty-state";
import useImageData from "@/hooks/useImageData";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
  activeSale: Sale | undefined;
  isOriginal: boolean;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const imageIds =
    props.activeSale?.tokensOnSale.map((token) => token.tokenID) ?? [];
  const { imageUris } = useImageData(imageIds);

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

  const EmptyStateText = (
    <>
      You don't own copies in this <br /> batch yet
    </>
  );

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
                  src: imageUris[index % imageUris.length] ?? "",
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
                  src: imageUris[index % imageUris.length] ?? "",
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

        {showEmptyState && <OwnedNftsEmptyState text={EmptyStateText} />}
      </Grid>
    </Flex>
  );
};

export default OwnedNfts;
