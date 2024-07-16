import { Box, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { type AdminSale } from "@/lib/types";
import PsyButton from "../psy-button";
import AdminSaleComponent, { type Sale } from "./admin-sale-component";
import EditSaleWindow from "../edit-sale-window";
import SubmitButtonContainer from "../commons/submit-button-container";

const AdminSalesSection = ({
  setOpenCreateSale,
  openEditSale,
  setOpenEditSale,
  openCreateSale,
  saleId,
  setSaleId
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
  openEditSale: boolean;
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateSale: boolean;
  saleId: number | null;
  setSaleId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { address } = useAccount();
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale>();
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [floorPrice, setFloorPrice] = useState("");

  useEffect(() => {
    const storedSales = localStorage.getItem("createdSales");
    if (storedSales) {
      try {
        const parsedSales = JSON.parse(storedSales) as AdminSale[]; // Explicitly cast the parsed result
        const selectedSale = parsedSales.find((x) => x.id === saleId);
        setSales(parsedSales);
        setSelectedSale(selectedSale);
        setCeilingPrice(selectedSale?.ceilingPrice ?? "");
        setFloorPrice(selectedSale?.floorPrice ?? "");
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
      }
    }
  }, [openCreateSale, setOpenCreateSale, saleId]);

  const handleEditSale = () => {
    const storedSales = localStorage.getItem("createdSales");
    let saleToEdit: Sale;
    let newArray = [];

    if (storedSales && selectedSale) {
      try {
        saleToEdit = selectedSale;
        const parsedSales = JSON.parse(storedSales) as AdminSale[]; // Explicitly cast the parsed result
        newArray = parsedSales;
        const index = parsedSales.findIndex(
          (sale) => sale.id === saleToEdit.id
        );
        saleToEdit.ceilingPrice = ceilingPrice ?? "";
        saleToEdit.floorPrice = floorPrice ?? "";
        if (index !== -1) {
          newArray[index] = saleToEdit;
        }
        localStorage.setItem("createdSales", JSON.stringify(newArray));
        setSaleId(null);
        setOpenEditSale(false);
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
      }
    }
  };

  return (
    <Box textAlign={saleId === null ? "center" : "start"} py={4} px={4}>
      {saleId === null && !openEditSale ? (
        <Flex
          justifyContent="center"
          gap={5}
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          {sales.length > 0
            ? sales.map((sale: Sale, index: number) => (
                <AdminSaleComponent
                  sale={sale}
                  index={index}
                  setSaleId={setSaleId}
                  setOpenEditSale={setOpenEditSale}
                />
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
