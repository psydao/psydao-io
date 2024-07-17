import { Box, Flex } from "@chakra-ui/react";
import CreateSaleHeader from "./create-sale-header";
import NftTokensSection from "./nft-tokens";
import SetTokenPrice from "./set-token-price";
import SaleStartTimeSection from "./start-time-section";
import WhiteListedAddressesSection from "./whitelisted-addresses";

import SubmitButtonContainer from "../../commons/submit-button-container";
import { handleCreateSale } from "./utils/createSale";
import { type Sale } from "../admin-sale-component";
import CreateSaleButton from "./create-sale-button";

export const CreateSale = ({
  setOpenCreateSale
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    timeInputType,
    setTimeInputType,
    focusedDate,
    setFocusedDate,
    focusedTime,
    setFocusedTime,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    floorPrice,
    setFloorPrice,
    ceilingPrice,
    setCeilingPrice,
    newWhitelistedAddresses,
    setNewWhitelistedAddresses
  } = useFormState();
  const { tokenIds, isLoading } = useTokenIds();
  console.log("tokenIds in CreateSale:", tokenIds);
  const { getWhitelistedAddresses } = useSaleLocalStorage();
  const whitelistedArray = getWhitelistedAddresses();
  const { address } = useAccount();
  const { handleCreateSale, isSubmitting } = useCreateSale(
    setOpenCreateSale,
    tokenIds,
    whitelistedArray
  );

  if (isLoading) {
    return (
      <Box textAlign="center" mt={20}>
        Loading token IDs...
      </Box>
    );
  }

  return (
    <Flex direction={"column"}>
      <CreateSaleHeader
        setOpenCreateSale={() => setOpenCreateSale((prev) => !prev)}
      />
      <form
        onSubmit={(e) =>
          handleCreateSale(
            e,
            newWhitelistedAddresses,
            startDate,
            startTime,
            floorPrice,
            ceilingPrice
          )
        }
      >
        <Box position="relative" height="100%" mb={12} overflowY="auto">
          <NftTokensSection tokenIds={tokenIds} />
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
          <SetTokenPrice
            setPrice={setFloorPrice}
            type="floor"
            price={floorPrice}
          />
          <SetTokenPrice
            setPrice={setCeilingPrice}
            type="ceiling"
            price={ceilingPrice}
          />
          <WhiteListedAddressesSection
            addressArray={whitelistedArray}
            setWhitelistedAddresses={setNewWhitelistedAddresses}
          />
        </Box>
        <SubmitButtonContainer>
          <CreateSaleButton
            address={address}
            isSubmitting={isSubmitting}
            children={"Create Sale"}
          />
        </SubmitButtonContainer>
      </form>
    </Flex>
  );
};
