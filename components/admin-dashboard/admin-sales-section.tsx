import { Box, Divider, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { type Sale } from "@/lib/types";
import PsyButton from "../ui/psy-button";
import AdminSaleComponent from "./admin-sale-component";
import SubmitButtonContainer from "../commons/submit-button-container";
import EditSaleWindow from "../edit-sale-window";
import { formatEther } from "viem";
import SubmitSaleButton from "../commons/submit-sale-button";
import { useEditSaleForm } from "@/hooks/useEditSaleForm";
import { useResize } from "@/hooks/useResize";
import { getSaleComplete } from "@/utils/getSaleComplete";

export const AdminSalesSection = ({
  setOpenCreateSale,
  openEditSale,
  setOpenEditSale,
  setSelectedSale,
  openCreateSale,
  saleData,
  selectedSale,
  triggerNftSaleUpdate,
  refetchSalesData
}: {
  selectedSale: Sale | undefined;
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
  openEditSale: boolean;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateSale: boolean;
  saleData: Sale[];
  triggerNftSaleUpdate: () => void;
  refetchSalesData: () => void;
}) => {
  const { width } = useResize();
  const { address } = useAccount();
  const { handleEditSale, isSubmitting } = useEditSaleForm(
    address,
    setOpenEditSale,
    selectedSale?.batchID ?? "",
    triggerNftSaleUpdate,
    refetchSalesData
  );
  const [existingWhitelistedAddresses, setExistingWhitelistedAddresses] =
    useState<string[]>([]);
  const [newWhitelistedAddresses, setNewWhitelistedAddresses] =
    useState<string>("");
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [addressesToRemove, setAddressesToRemove] = useState<string[]>([]);
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState<string>("");
  const [saleStatus, setSaleStatus] = useState<"active" | "paused">("active");

  const splitNewWhitelistedAddresses =
    newWhitelistedAddresses.length > 0
      ? newWhitelistedAddresses.split(", ")
      : [];

  useEffect(() => {
    if (selectedSale) {
      setFloorPrice(formatEther(BigInt(selectedSale.floorPrice)));
      setCeilingPrice(formatEther(BigInt(selectedSale.ceilingPrice)));
      setTokenIds(
        selectedSale.tokensOnSale
          .map((x) => x.tokenID)
          .sort((a, b) => parseInt(a) - parseInt(b))
      );
    }
  }, [selectedSale]);

  return (
    <Box textAlign={"start"} py={4} px={4} position="relative">
      {!openEditSale ? (
        <Flex
          justifyContent="center"
          gap={5}
          flexDirection="column"
          alignItems="center"
          width="100%"
          height="100%"
          overflowY="auto"
        >
          {saleData.length > 0
            ? saleData.map((sale, index: number) => {
                const isComplete = getSaleComplete(sale);
                return (
                  <>
                    <AdminSaleComponent
                      key={index}
                      sale={sale}
                      index={index}
                      setWhitelistedAddresses={setExistingWhitelistedAddresses}
                      setSelectedSale={setSelectedSale}
                      setOpenEditSale={setOpenEditSale}
                      isComplete={isComplete}
                    />
                    <Divider
                      border={"none"}
                      height={"1px"}
                      bg={"#F2BEBE"}
                      width={"100%"}
                    />
                  </>
                );
              })
            : null}
          <SubmitButtonContainer>
            <PsyButton
              customStyle={{ width: "100%" }}
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
                  saleStatus,
                  tokenIds,
                  width
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
              selectedSale={selectedSale}
              floorPrice={floorPrice}
              setFloorPrice={setFloorPrice}
              ceilingPrice={ceilingPrice}
              setCeilingPrice={setCeilingPrice}
              addressesToRemove={addressesToRemove}
              setAddressesToRemove={setAddressesToRemove}
              setNewWhitelistedAddresses={setNewWhitelistedAddresses}
              whitelistedArray={existingWhitelistedAddresses}
              newWhitelistedAddresses={newWhitelistedAddresses}
              setSaleStatus={setSaleStatus}
              saleStatus={saleStatus}
            />
            <SubmitButtonContainer>
              <SubmitSaleButton
                type="edit"
                address={address}
                isSubmitting={isSubmitting}
              />
            </SubmitButtonContainer>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default AdminSalesSection;
