import { Flex, Grid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { type GetTokensByOwnerData, type Sale } from "@/lib/types";
import useUserCopyBalances from "@/hooks/useUserCopyBalances";
import OwnedNftsEmptyState from "./owned-nfts-empty-state";
import useImageData from "@/hooks/useImageData";
import { useAddAssetToWallet } from "@/hooks/useAddAsset";
import SubmitButtonContainer from "@/components/common/submit-button-container";
import SkeletonLayout from "../../common/skeleton-card";
import OwnedNftItem from "./owned-nft-item";
import PsyButton from "@/components/ui/psy-button";
import { useEffect, useState } from "react";

type OwnedNftsProps = {
  nftData: GetTokensByOwnerData | undefined;
  allSales: Sale[] | undefined;
  isOriginal: boolean;
  isLoading: boolean;
  isFullScreen: boolean;
};

const OwnedNfts = (props: OwnedNftsProps) => {
  const sortedTokens = [...(props.nftData?.tokens ?? [])].sort(
    (a, b) => parseInt(a.tokenId) - parseInt(b.tokenId)
  );

  const imageIds = sortedTokens.map((token) => token.tokenId);
  const { imageUris, loading: imageUrisLoading } = useImageData(imageIds);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reversedImageUris = [...imageUris].reverse();

  const triggerReload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    refetchBalances().catch(console.error);
  }, [reloadTrigger]);

  const { address } = useAccount();
  const {
    balances: copyBalances,
    refetchBalances,
    loading: copyBalancesLoading
  } = useUserCopyBalances(props.allSales, address);

  if (!address) return null;

  const filteredCopyTokens =
    props.allSales
      ?.flatMap((sale) => sale.tokensOnSale)
      .filter(
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

  if (props.isLoading || imageUrisLoading || copyBalancesLoading) {
    return <SkeletonLayout isOwnedNft={true} />;
  }

  const showEmptyState =
    !props.isOriginal &&
    filteredCopyTokens.length === 0 &&
    !props.isLoading &&
    !imageUrisLoading &&
    !copyBalancesLoading;

  return (
    <Flex justifyContent={"center"} pb={props.isOriginal ? 16 : 4} px={4}>
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
          ? sortedTokens.map((token, index) => (
              <OwnedNftItem
                key={token.tokenId}
                item={{
                  src:
                    reversedImageUris[index % reversedImageUris.length] ?? "",
                  tokenId: token.tokenId,
                  whitelist: [],
                  balance: "0",
                  isSold: false,
                  ipfsHash: ""
                }}
                index={index}
                isPrivateSale={false}
                isOwnedView={true}
                isOriginal={props.isOriginal}
                refetchBalances={refetchBalances}
                triggerReload={triggerReload}
              />
            ))
          : filteredCopyTokens.map((token, index) => (
              <OwnedNftItem
                key={index}
                item={{
                  src:
                    reversedImageUris[index % reversedImageUris.length] ?? "",
                  tokenId: token.tokenID,
                  whitelist: [],
                  balance: copyBalances[token.tokenID] ?? "0",
                  isSold: false,
                  ipfsHash: ""
                }}
                index={index}
                isPrivateSale={false}
                isOwnedView={true}
                isOriginal={props.isOriginal}
                refetchBalances={refetchBalances}
                triggerReload={triggerReload}
              />
            ))}

        {showEmptyState && <OwnedNftsEmptyState text={EmptyStateText} />}

        {props.isOriginal && (
          <SubmitButtonContainer>
            <PsyButton
              onClick={handleAddToWallet}
              isDisabled={!props.allSales || isAdding}
              customStyle={{
                width: "100%",
                maxWidth: "550px",
                opacity: isAdding ? 0.5 : 1,
                cursor: isAdding ? "not-allowed" : "pointer",
                backgroundColor: isAdding ? "#b0b0b0" : "#4a90e2",
                color: "#FFFFFF",
                textAlign: "center",
                padding: "12px 0"
              }}
            >
              {isAdding
                ? "Adding to Wallet..."
                : "Add PSYC NFTs to Your Wallet"}
            </PsyButton>
          </SubmitButtonContainer>
        )}
      </Grid>
    </Flex>
  );
};

export default OwnedNfts;
