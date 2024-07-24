import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import NftTokensSection from "../admin-dashboard/create-sale/nft-tokens";
import SetTokenPrice from "../admin-dashboard/create-sale/set-token-price";
import WhiteListedAddressesSection from "../admin-dashboard/create-sale/whitelisted-addresses";
import SaleStatusSection from "../admin-dashboard/edit-sale/sale-status-section";

import useActivateSale from "@/hooks/useActivateSale";

import type { Sale } from "@/lib/types";
import { psycSaleSepolia } from "@/constants/contracts";
import useFetchTokenOwners from "@/hooks/useFetchTokenOwner";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import MintButton from "../ui/mint-button";

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
  saleStatus: "active" | "complete" | "paused";
  setSaleStatus: React.Dispatch<
    React.SetStateAction<"active" | "complete" | "paused">
  >;
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
  saleStatus,
  setSaleStatus
}) => {
  const { activateSale, isPending: isLoading } = useActivateSale();

  const tokenIds = selectedSale
    ? selectedSale.tokensOnSale
        .map((x) => x.tokenID)
        .sort((a, b) => parseInt(a) - parseInt(b))
    : [];

  const { owners, loading, error } = useFetchTokenOwners(tokenIds);
  const { width } = useResize();
  const { showCustomErrorToast } = useCustomToasts();

  const handleActivateSale = async () => {
    console.log("Contract Address:", psycSaleSepolia);
    console.log("Owners:", owners);

    const tokensOwnedByContract = owners
      .filter((owner) => {
        const isOwnedByContract =
          owner.owner.toLowerCase() === psycSaleSepolia.toLowerCase();
        console.log(
          `Token ID ${owner.id} is owned by contract: ${isOwnedByContract}`
        );
        return isOwnedByContract;
      })
      .map((token) => parseInt(token.id));

    console.log("tokensOwnedByContract:", tokensOwnedByContract);

    if (tokensOwnedByContract.length > 0) {
      await activateSale(tokensOwnedByContract);
    } else {
      console.error("No tokens are owned by the contract address.");
    }
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading token owners...");
    } else if (error) {
      console.error("Error fetching token owners:", error);
      showCustomErrorToast(error.message, width);
    } else {
      console.log("Token owners fetched:", owners);
    }
  }, [owners, loading, error]);

  const isButtonDisabled = loading || tokenIds.length === 0 || isLoading;
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"100%"}
      overflowY={"auto"}
      alignItems={"start"}
    >
      <MintButton
        onClick={handleActivateSale}
        isDisabled={isButtonDisabled}
        customStyle={{
          position: "absolute",
          top: "80px",
          right: "40px",
          px: "10px"
        }}
      >
        {isLoading ? "Activating..." : "Activate Sale"}
      </MintButton>

      <NftTokensSection tokenIds={tokenIds.map((id) => parseInt(id))} />
      <SaleStatusSection
        saleStatus={saleStatus}
        setSaleStatus={setSaleStatus}
      />
      <SetTokenPrice
        setPrice={setFloorPrice}
        type="floor"
        initialValue={floorPrice}
      />
      <SetTokenPrice
        setPrice={setCeilingPrice}
        type="ceiling"
        initialValue={ceilingPrice}
      />
      <WhiteListedAddressesSection
        addressesToRemove={addressesToRemove}
        setAddressesToRemove={setAddressesToRemove}
        addressArray={whitelistedArray}
        setWhitelistedAddresses={setNewWhitelistedAddresses}
      />
    </Flex>
  );
};

export default EditSaleWindow;
