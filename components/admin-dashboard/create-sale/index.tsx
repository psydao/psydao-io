import { Box, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useState } from "react";

import CreateSaleHeader from "./create-sale-header";
import NftTokensSection from "./nft-tokens";
import SetTokenPrice from "./set-token-price";

import SaleStartTimeSection from "./start-time-section";
import WhiteListedAddressesSection from "./whitelisted-addresses";

import CreateButtonContainer from "./create-button-container";
import { handleCreateSale } from "./utils/createSale";

export const CreateSale = ({
  setOpenCreateSale
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { address } = useAccount();
  const [timeInputType, setTimeInputType] = useState("text");
  const [focusedDate, setFocusedDate] = useState(false);
  const [focusedTime, setFocusedTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [width] = useState(window.innerWidth);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [newWhitelistedAddresses, setNewWhitelistedAddresses] = useState("");
  const startTimeStamp = Date.parse(startDate + " " + startTime);
  const [addressesToRemove, setAddressesToRemove] = useState<string[]>([]);

  const whitelistedAddresses: string | null = localStorage.getItem(
    "whitelistedAddresses"
  );

  const whitelistedArray: string[] = whitelistedAddresses
    ? (JSON.parse(whitelistedAddresses) as string[])
    : [];

  console.log(addressesToRemove, whitelistedArray);

  return (
    <Flex direction={"column"} gap={2}>
      <CreateSaleHeader
        setOpenCreateSale={() => setOpenCreateSale((prev) => !prev)}
      />
      <form
        onSubmit={(e) =>
          handleCreateSale(
            e,
            address,
            setIsSubmitting,
            startDate,
            startTime,
            floorPrice,
            ceilingPrice,
            newWhitelistedAddresses,
            width,
            startTimeStamp,
            whitelistedArray,
            setOpenCreateSale,
            addressesToRemove
          )
        }
      >
        <Box position="relative" height="100%" mb={12} overflowY="auto">
          <NftTokensSection />
          <SaleStartTimeSection
            focusedDate={focusedDate}
            setFocusedDate={setFocusedDate}
            focusedTime={focusedTime}
            setFocusedTime={setFocusedTime}
            setStartDate={setStartDate}
            setStartTime={setStartTime}
            timeInputType={timeInputType}
            setTimeInputType={setTimeInputType}
          />
          <SetTokenPrice setPrice={setFloorPrice} type="floor" />
          <SetTokenPrice setPrice={setCeilingPrice} type="ceiling" />
          <WhiteListedAddressesSection
            addressArray={whitelistedArray}
            setWhitelistedAddresses={setNewWhitelistedAddresses}
            addressesToRemove={addressesToRemove}
            setAddressesToRemove={setAddressesToRemove}
          />
        </Box>
        <CreateButtonContainer address={address} isSubmitting={isSubmitting} />
      </form>
    </Flex>
  );
};
