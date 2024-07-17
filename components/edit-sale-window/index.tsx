import { Flex } from "@chakra-ui/react";
import NftTokensSection from "../admin-dashboard/create-sale/nft-tokens";
import SetTokenPrice from "../admin-dashboard/create-sale/set-token-price";
import WhiteListedAddressesSection from "../admin-dashboard/create-sale/whitelisted-addresses";
import React from "react";
import { type Sale } from "../admin-dashboard/admin-sale-component";

const EditSaleWindow = (props: {
  selectedSale: Sale | undefined;
  floorPrice: string | undefined;
  ceilingPrice: string | undefined;
  setFloorPrice: React.Dispatch<React.SetStateAction<string>>;
  setCeilingPrice: React.Dispatch<React.SetStateAction<string>>;
  addressesToRemove: string[];
  setAddressesToRemove: React.Dispatch<React.SetStateAction<string[]>>;
  whitelistedArray: string[];
  newWhitelistedAddresses: string;
  setNewWhitelistedAddresses: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"100%"}
      overflowY={"auto"}
      alignItems={"start"}
    >
      <NftTokensSection />
      {/* INSERT SALE STATUS */}
      <SetTokenPrice
        setPrice={props.setFloorPrice}
        type="floor"
        price={props.floorPrice ?? ""}
      />
      <SetTokenPrice
        setPrice={props.setCeilingPrice}
        type="ceiling"
        price={props.ceilingPrice ?? ""}
      />
      <WhiteListedAddressesSection
        addressesToRemove={props.addressesToRemove}
        setAddressesToRemove={props.setAddressesToRemove}
        addressArray={props.whitelistedArray}
        setWhitelistedAddresses={props.setNewWhitelistedAddresses}
      />
    </Flex>
  );
};

export default EditSaleWindow;
