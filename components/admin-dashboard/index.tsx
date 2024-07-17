import { useMemo, useState, useEffect } from "react";
import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "../ui/window-manager";
import AdminDashboardHeader from "./admin-dashboard-header";
import AdminDashboardEmptyState from "./admin-dashboard-empty";
import AdminSalesSection from "./admin-sales-section";
import { CreateSale } from "./create-sale/index";
import { type AdminSale } from "@/lib/types";
import EditSaleHeader from "./edit-sale/edit-sale-header";

const AdminDashboardWidget = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const [openCreateSale, setOpenCreateSale] = useState(false);
  const [openEditSale, setOpenEditSale] = useState(false);
  const { state } = useWindowManager();
  const [salesExist, setSalesExist] = useState(false);
  const [saleId, setSaleId] = useState<number | null>(null);

  const fullScreenWindow = useMemo(() => {
    return state.fullScreen === "admin-dashboard";
  }, [state]);

  useEffect(() => {
    const sales = localStorage.getItem("createdSales");
    if (sales) {
      try {
        const parsedSales = JSON.parse(sales) as AdminSale[];
        setSalesExist(parsedSales.length > 0);
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
        setSalesExist(false);
      }
    } else {
      setSalesExist(false);
    }
  }, [openCreateSale, openEditSale]);

  return (
    <Window
      id="admin-dashboard"
      height={fullScreenWindow ? "100%" : isLargerThanMd ? "500px" : "80%"}
      width={fullScreenWindow ? "100%" : isLargerThanMd ? "655px" : "95%"}
      top={{
        base: fullScreenWindow ? "0" : "60%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "56%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
      px={0}
    >
      <Window.TitleBar />
      <Window.Content
        py={2}
        px={0}
        position="relative"
        height="100%"
        mb={12}
        overflowY="auto"
      >
        {openCreateSale ? (
          <CreateSale setOpenCreateSale={setOpenCreateSale} />
        ) : (
          <>
            {saleId === null ? (
              <AdminDashboardHeader />
            ) : (
              <EditSaleHeader
                id={saleId}
                backToSales={() => {
                  setOpenEditSale(false);
                  setSaleId(null);
                }}
              />
            )}
            <Box w="100%" mt={4}>
              {salesExist ? (
                <AdminSalesSection
                  setOpenCreateSale={setOpenCreateSale}
                  setOpenEditSale={setOpenEditSale}
                  openCreateSale={openCreateSale}
                  saleId={saleId}
                  setSaleId={setSaleId}
                  openEditSale={openEditSale}
                />
              ) : (
                <AdminDashboardEmptyState
                  setOpenCreateSale={setOpenCreateSale}
                />
              )}
            </Box>
          </>
        )}
        <Image
          src="/windows/alchemist/clouds.png"
          alt=""
          position="absolute"
          right="0"
          bottom="0"
          zIndex="-1"
          filter="blur(12px)"
        />
      </Window.Content>
    </Window>
  );
};

export default AdminDashboardWidget;
