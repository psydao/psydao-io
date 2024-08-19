import { Flex, Grid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { type GetTokensByOwnerData, type Sale } from "@/lib/types";
import useUserCopyBalances from "@/hooks/useUserCopyBalances";
import { formatUnits } from "viem";
import OwnedNftsEmptyState from "./owned-nfts-empty-state";
import useImageData from "@/hooks/useImageData";
import { useAddAssetToWallet } from "@/hooks/useAddAsset";
import MintButton from "@/components/ui/mint-button";
import SubmitButtonContainer from "@/components/commons/submit-button-container";
import SkeletonLayout from "../../commons/skeleton-card";
import OwnedNftItem from "./owned-nft-item";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
  activeSale: Sale | undefined;
  isOriginal: boolean;
  isLoading: boolean;
  isFullScreen: boolean;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const imageIds = props.nftData?.tokens.map((token) => token.tokenId) ?? [];
  const { imageUris } = useImageData(imageIds);

  const { address } = useAccount();
  const { balances: copyBalances, refetchBalances } = useUserCopyBalances(
    props.activeSale,
    address
  );

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

  const { addAssetToWallet, isAdding } = useAddAssetToWallet();

  const handleAddToWallet = async () => {
    try {
      if (props.nftData?.tokens) {
        for (const token of props.nftData?.tokens) {
          await addAssetToWallet("ERC721", {
            address: token.tokenAddress,
            tokenId: token.tokenId
          });
        }
      }
    } catch (error) {
      console.error("Error adding asset to wallet:", error);
    }
  };

  if (props.isLoading) {
    return <SkeletonLayout isRandom={false} />;
  }
  const showEmptyState = !props.isOriginal && filteredCopyTokens.length === 0;

  return (
    <Flex
      justifyContent={"center"}
      pt={4}
      pb={props.isOriginal ? 12 : 4}
      px={4}
    >
      <Grid
        templateColumns={{
          base: "1fr",
          sm: props.isFullScreen
            ? "repeat(auto-fit, minmax(300px, 1fr))"
            : "1fr"
        }}
        gap={6}
        justifyItems={"center"}
        w={props.isFullScreen ? "auto" : "100%"}
        maxW={"100%"}
      >
        {props.isOriginal
          ? props.nftData?.tokens.map((token, index) => (
              <OwnedNftItem
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
              />
            ))
          : filteredCopyTokens.map((token, index) => (
              <OwnedNftItem
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
              />
            ))}

        {showEmptyState && <OwnedNftsEmptyState text={EmptyStateText} />}

        {props.isOriginal && (
          <SubmitButtonContainer>
            <MintButton
              onClick={handleAddToWallet}
              isDisabled={!props.activeSale || isAdding}
              customStyle={{
                width: "100%",
                opacity: isAdding ? 0.5 : 1,
                cursor: isAdding ? "not-allowed" : "pointer",
                backgroundColor: isAdding ? "#b0b0b0" : "#4a90e2",
                color: "#FFFFFF",
                textAlign: "center",
                padding: "12px 0",
                borderRadius: "6px"
              }}
            >
              {isAdding
                ? "Adding to Wallet..."
                : "Add PSYC NFTs to your wallet"}
            </MintButton>
          </SubmitButtonContainer>
        )}
      </Grid>
    </Flex>
  );
};

export default OwnedNfts;
