import React from "react";
import { Flex } from "@chakra-ui/react";
import NftTokensSection from "../admin-dashboard/create-sale/nft-tokens";
import SetTokenPrice from "../admin-dashboard/create-sale/set-token-price";
import WhiteListedAddressesSection from "../admin-dashboard/create-sale/whitelisted-addresses";
import SaleStatusSection from "../admin-dashboard/edit-sale/sale-status-section";

import type { Sale } from "@/lib/types";
import { getSaleComplete } from "@/utils/getSaleComplete";

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
  saleStatus: "active" | "paused";
  setSaleStatus: React.Dispatch<React.SetStateAction<"active" | "paused">>;
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
  let isComplete = false;

  if (selectedSale) {
    isComplete = getSaleComplete(selectedSale);
  }

  const tokenIds = selectedSale
    ? selectedSale.tokensOnSale
        .map((x) => x.tokenID)
        .sort((a, b) => parseInt(a) - parseInt(b))
    : [];

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"100%"}
      overflowY={"auto"}
      alignItems={"start"}
    >
      <NftTokensSection tokenIds={tokenIds.map((id) => parseInt(id))} />
      <SaleStatusSection
        saleStatus={saleStatus}
        setSaleStatus={setSaleStatus}
        isComplete={isComplete}
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
