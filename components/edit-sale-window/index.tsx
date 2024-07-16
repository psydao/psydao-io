import { Flex } from "@chakra-ui/react";
import NftTokensSection from "../admin-dashboard/create-sale/nft-tokens";
import SetTokenPrice from "../admin-dashboard/create-sale/set-token-price";
import WhiteListedAddressesSection from "../admin-dashboard/create-sale/whitelisted-addresses";
import { useState } from "react";
import { type Sale } from "../admin-dashboard/admin-sale-component";

const EditSaleWindow = (props: {
  selectedSale: Sale | undefined;
  floorPrice: string | undefined;
  ceilingPrice: string | undefined;
  setFloorPrice: React.Dispatch<React.SetStateAction<string>>;
  setCeilingPrice: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const whitelistedAddresses: string | null = localStorage.getItem(
    "whitelistedAddresses"
  );

  const [newWhitelistedAddresses, setNewWhitelistedAddresses] = useState("");
  const [addressesToRemove, setAddressesToRemove] = useState<string[]>([]);
  const whitelistedArray: string[] = whitelistedAddresses
    ? (JSON.parse(whitelistedAddresses) as string[])
    : [];

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
        addressesToRemove={addressesToRemove}
        setAddressesToRemove={setAddressesToRemove}
        addressArray={whitelistedArray}
        setWhitelistedAddresses={setNewWhitelistedAddresses}
      />
    </Flex>
  );
};

export default EditSaleWindow;
