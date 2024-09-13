import { Box, Divider, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import PsyButton from "../ui/psy-button";
import AdminSaleComponent from "./admin-sale-component";
import SubmitButtonContainer from "../commons/submit-button-container";
import EditSaleWindow from "../edit-sale-window";
import { formatEther } from "viem";
import SubmitSaleButton from "../commons/submit-sale-button";
import { useEditSaleForm } from "@/hooks/useEditSaleForm";
import { getSaleComplete } from "@/utils/getSaleComplete";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import AdminDashboardEmptyState from "./admin-dashboard-empty";
import { useGlobalContext } from "@/contexts/globalContext";

export const AdminSalesSection = () => {
  const {
    selectedSale,
    setSelectedSale,
    setOpenCreateSale,
    openEditSale,
    setOpenEditSale,
    data,
    refetchSalesData
  } = useGlobalContext();

  const { address } = useAccount();
  const { getAddresses } = useGetAddresses();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [existingWhitelistedAddresses, setExistingWhitelistedAddresses] =
    useState<string[]>([]);
  const [newWhitelistedAddresses, setNewWhitelistedAddresses] =
    useState<string>("");

  const [addressesToRemove, setAddressesToRemove] = useState<string[]>([]);
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState<string>("");
  const [saleComplete, setSaleComplete] = useState<boolean>(false);
  const [addressesToDisplay, setAddressesToDisplay] = useState<string[]>([]);

  const { setUpdateNftSaleTrigger } = useGlobalContext() as {
    setUpdateNftSaleTrigger: React.Dispatch<React.SetStateAction<number>>;
  };

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  const { handleEditSale, isSubmitting } = useEditSaleForm(
    address,
    setOpenEditSale,
    setSelectedSale,
    selectedSale?.batchID ?? "",
    triggerNftSaleUpdate,
    refetchSalesData,
    getAddresses,
    setAddressesToRemove
  );

  const splitNewWhitelistedAddresses =
    newWhitelistedAddresses.length > 0
      ? newWhitelistedAddresses.split(", ")
      : [];

  useEffect(() => {
    if (existingWhitelistedAddresses.length > 0) {
      setAddressesToDisplay(existingWhitelistedAddresses);
    }

    if (addressesToRemove.length > 0) {
      setAddressesToDisplay(
        existingWhitelistedAddresses.filter(
          (address) => !addressesToRemove.includes(address)
        )
      );
    }

    if (!openEditSale && addressesToRemove.length > 0) {
      setAddressesToRemove([]);
    }
  }, [existingWhitelistedAddresses, addressesToRemove, openEditSale]);

  useEffect(() => {
    if (selectedSale) {
      setFloorPrice(formatEther(BigInt(selectedSale.floorPrice)));
      setCeilingPrice(formatEther(BigInt(selectedSale.ceilingPrice)));
      setSaleComplete(getSaleComplete(selectedSale));
    }
  }, [selectedSale]);

  return (
    <Box textAlign={"start"} py={4} px={4} position="relative">
      {!openEditSale ? (
        <Flex
          key={0}
          justifyContent="center"
          gap={5}
          flexDirection="column"
          alignItems="center"
          width="100%"
          height="100%"
          overflowY="auto"
          marginBottom={5}
        >
          {data && data.sales.length > 0 ? (
            data.sales.map((sale, index) => {
              const isLastItem = index === data.sales.length - 1;
              return (
                <>
                  <AdminSaleComponent
                    key={sale.batchID}
                    sale={sale}
                    setWhitelistedAddresses={setExistingWhitelistedAddresses}
                  />
                  {!isLastItem && (
                    <Divider
                      border={"none"}
                      height={"1px"}
                      bg={"#F2BEBE"}
                      width={"100%"}
                    />
                  )}
                </>
              );
            })
          ) : (
            <AdminDashboardEmptyState />
          )}
          <SubmitButtonContainer>
            <PsyButton
              customStyle={{ width: "100%", maxWidth: "550px" }}
              onClick={() => setOpenCreateSale(true)}
              isDisabled={!address}
            >
              Add a new sale
            </PsyButton>
          </SubmitButtonContainer>
        </Flex>
      ) : (
        <form
          onSubmit={(e) =>
            selectedSale
              ? handleEditSale(
                  e,
                  selectedSale.batchID,
                  addressesToRemove,
                  splitNewWhitelistedAddresses,
                  existingWhitelistedAddresses,
                  floorPrice,
                  ceilingPrice,
                  isPaused
                )
              : console.error("no sale selected")
          }
        >
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            width="100%"
          >
            <EditSaleWindow
              floorPrice={floorPrice}
              setFloorPrice={setFloorPrice}
              ceilingPrice={ceilingPrice}
              setCeilingPrice={setCeilingPrice}
              addressesToRemove={addressesToRemove}
              setAddressesToRemove={setAddressesToRemove}
              setNewWhitelistedAddresses={setNewWhitelistedAddresses}
              whitelistedArray={existingWhitelistedAddresses}
              newWhitelistedAddresses={newWhitelistedAddresses}
              setIsPaused={setIsPaused}
              isPaused={isPaused}
              isComplete={saleComplete}
              addressesToDisplay={addressesToDisplay}
            />
            <SubmitButtonContainer>
              <SubmitSaleButton
                type="edit"
                address={address}
                isSubmitting={isSubmitting}
                saleComplete={saleComplete}
              />
            </SubmitButtonContainer>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default AdminSalesSection;
