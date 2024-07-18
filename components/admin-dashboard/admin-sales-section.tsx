import { Box, Divider, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { type Sale, type AdminSale } from "@/lib/types";
import PsyButton from "../ui/psy-button";
import AdminSaleComponent from "./admin-sale-component";
import SubmitButtonContainer from "../commons/submit-button-container";
import EditSaleWindow from "../edit-sale-window";
import { formatEther } from "viem";

export const AdminSalesSection = ({
  setOpenCreateSale,
  openEditSale,
  setOpenEditSale,
  setSelectedSale,
  openCreateSale,
  saleData,
  selectedSale
}: {
  selectedSale: Sale | undefined;
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
  openEditSale: boolean;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateSale: boolean;
  saleData: Sale[];
}) => {
  const { address } = useAccount();
  const whitelistedAddresses: string | null = localStorage.getItem(
    "whitelistedAddresses"
  );
  const [newWhitelistedAddresses, setNewWhitelistedAddresses] = useState("");
  const [addressesToRemove, setAddressesToRemove] = useState<string[]>([]);
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState<string>("");
  const splitNewWhitelistedAddresses =
    newWhitelistedAddresses.length > 0
      ? newWhitelistedAddresses.split(", ")
      : [];
  const whitelistedArray: string[] = whitelistedAddresses
    ? (JSON.parse(whitelistedAddresses) as string[])
    : [];

  useEffect(() => {
    if (selectedSale) {
      setFloorPrice(formatEther(BigInt(selectedSale.floorPrice)));
      setCeilingPrice(formatEther(BigInt(selectedSale.ceilingPrice)));
    }
  }, [selectedSale]);

  const handleEditSale = () => {
    console.log("edit!");
  };

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
            ? saleData.map((sale, index: number) => (
                <>
                  <AdminSaleComponent
                    sale={sale}
                    index={index}
                    setSelectedSale={setSelectedSale}
                    setOpenEditSale={setOpenEditSale}
                  />
                  <Divider
                    border={"none"}
                    height={"1px"}
                    bg={"#F2BEBE"}
                    width={"100%"}
                  />
                </>
              ))
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
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <EditSaleWindow
            selectedSale={selectedSale}
            floorPrice={floorPrice}
            ceilingPrice={ceilingPrice}
            setFloorPrice={setFloorPrice}
            setCeilingPrice={setCeilingPrice}
            addressesToRemove={addressesToRemove}
            setAddressesToRemove={setAddressesToRemove}
            setNewWhitelistedAddresses={setNewWhitelistedAddresses}
            whitelistedArray={whitelistedArray}
            newWhitelistedAddresses={newWhitelistedAddresses}
          />
          <SubmitButtonContainer>
            <PsyButton
              customStyle={{ width: "100%" }}
              onClick={() => handleEditSale()}
              isDisabled={!address}
            >
              Save
            </PsyButton>
          </SubmitButtonContainer>
        </Flex>
      )}
    </Box>
  );
};

export default AdminSalesSection;
