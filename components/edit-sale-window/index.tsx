import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import NftTokensSection from "../admin-dashboard/create-sale/nft-tokens";
import SetTokenPrice from "../admin-dashboard/create-sale/set-token-price";
import WhiteListedAddressesSection from "../admin-dashboard/create-sale/whitelisted-addresses";
import SaleStatusSection from "../admin-dashboard/edit-sale/sale-status-section";
import CopySaleActivation from "../admin-dashboard/edit-sale/copy-sale-activation";

import useActivateSale from "@/hooks/useActivateSale";

import type { Sale } from "@/lib/types";
import { psycSaleSepolia, psyNFTSepolia } from "@/constants/contracts";
import useFetchTokenOwners from "@/hooks/useFetchTokenOwner";
import { getSaleComplete } from "@/utils/getSaleComplete";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";

interface EditSaleWindowProps {
  selectedSale: Sale | undefined;
  floorPrice: string;
  ceilingPrice: string;
  setFloorPrice: React.Dispatch<React.SetStateAction<string>>;
  setCeilingPrice: React.Dispatch<React.SetStateAction<string>>;
  addressesToRemove: string[];
  setAddressesToRemove: React.Dispatch<React.SetStateAction<string[]>>;
  whitelistedArray: string[];
  newWhitelistedAddresses: string;
  setNewWhitelistedAddresses: React.Dispatch<React.SetStateAction<string>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
}

const EditSaleWindow: React.FC<EditSaleWindowProps> = ({
  selectedSale,
  floorPrice,
  ceilingPrice,
  setFloorPrice,
  setCeilingPrice,
  addressesToRemove,
  setAddressesToRemove,
  whitelistedArray,
  // newWhitelistedAddresses,
  setNewWhitelistedAddresses,
  isPaused,
  setIsPaused
}) => {
  let isComplete = false;

  if (selectedSale) {
    isComplete = getSaleComplete(selectedSale);
  }

  const { activateSale, isPending: isLoading } = useActivateSale();
  const { showCustomErrorToast } = useCustomToasts();
  const { width } = useResize();
  const tokenIds = selectedSale
    ? selectedSale.tokensOnSale
        .map((x) => x.tokenID)
        .sort((a, b) => parseInt(a) - parseInt(b))
    : [];

  const contractAddress = psyNFTSepolia;
  const { owners, loading, error } = useFetchTokenOwners(
    contractAddress,
    tokenIds
  );

  const handleActivateSale = async () => {
    try {
      const tokensOwnedByContract = owners
        .filter((owner) => {
          const isOwnedByContract =
            owner.owner.toLowerCase() === psycSaleSepolia.toLowerCase();
          console.log(
            `Token ID ${owner.id} is owned by contract: ${isOwnedByContract}`
          );
          return isOwnedByContract;
        })
        .map((token) => {
          const tokenIdPart = token.id.split("/").pop() ?? "";
          return parseInt(tokenIdPart, 10);
        });

      console.log("tokensOwnedByContract:", tokensOwnedByContract);

      if (tokensOwnedByContract.length > 0) {
        await activateSale(tokensOwnedByContract);
      } else {
        console.error("No tokens are owned by the contract address.");
      }
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      showCustomErrorToast(message, width);
    }
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading token owners...");
    } else if (error) {
      console.error(error);
    } else {
      console.log("Token owners fetched:", owners);
    }
  }, [owners, loading, error]);

  const isButtonDisabled =
    loading || tokenIds.length === 0 || isLoading || isComplete;
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"100%"}
      overflowY={"auto"}
      alignItems={"start"}
    >
      <NftTokensSection tokenIds={tokenIds.map((id) => parseInt(id))} />
      <CopySaleActivation
        handleActivateSale={handleActivateSale}
        isButtonDisabled={isButtonDisabled}
        isLoading={isLoading}
      />
      <SaleStatusSection
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        isComplete={isComplete}
        sale={selectedSale}
      />
      <SetTokenPrice
        setPrice={setFloorPrice}
        type="floor"
        initialValue={floorPrice}
        isDisabled={isComplete}
      />
      <SetTokenPrice
        setPrice={setCeilingPrice}
        type="ceiling"
        initialValue={ceilingPrice}
        isDisabled={isComplete}
      />
      <WhiteListedAddressesSection
        addressesToRemove={addressesToRemove}
        setAddressesToRemove={setAddressesToRemove}
        addressArray={whitelistedArray}
        setWhitelistedAddresses={setNewWhitelistedAddresses}
        saleComplete={isComplete}
      />
    </Flex>
  );
};

export default EditSaleWindow;
