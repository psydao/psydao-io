import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "../ui/window-manager";
import AdminDashboardHeader from "./admin-dashboard-header";
import AdminDashboardEmptyState from "./admin-dashboard-empty";
import AdminSalesSection from "./admin-sales-section";
import { CreateSale } from "./create-sale/index";
import EditSaleHeader from "./edit-sale/edit-sale-header";
import { useGlobalContext } from "@/contexts/globalContext";
import { useEffect, useMemo } from "react";
import { whitelistedAddresses } from "./whitelisted-addresses";
import { useAccount } from "wagmi";
import SkeletonLoader from "../ui/skeleton-loader";
import { getWindowTop } from "@/utils/getWindowTop";

const AdminDashboardWidget = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const { state, dispatch } = useWindowManager();
  const { address } = useAccount();
  const { openCreateSale, selectedSale, data, loading } = useGlobalContext();

  // Memoize expensive calculations and avoid unnecessary re-renders
  const fullScreenWindow = useMemo(
    () => state.fullScreen === "admin-dashboard",
    [state.fullScreen]
  );
  const windowHeight = fullScreenWindow
    ? "100%"
    : isLargerThanMd
      ? "500px"
      : "80%";
  const windowWidth = fullScreenWindow
    ? "100%"
    : isLargerThanMd
      ? "655px"
      : "95%";

  useEffect(() => {
    if (!whitelistedAddresses.includes(address ?? "0x")) {
      dispatch({ type: "close", id: "admin-dashboard" });
    }
  }, [address, dispatch]);

  return (
    <Window
      id="admin-dashboard"
      height={windowHeight}
      width={windowWidth}
      top={getWindowTop(fullScreenWindow)}
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
          <CreateSale />
        ) : (
          <>
            {selectedSale ? <EditSaleHeader /> : <AdminDashboardHeader />}
            <Box w="100%" mt={4}>
              {loading ? (
                <SkeletonLoader />
              ) : data ? (
                <AdminSalesSection />
              ) : (
                <AdminDashboardEmptyState />
              )}
            </Box>
          </>
        )}
        <Image
          src="/windows/alchemist/clouds.png"
          alt="Decorative Clouds"
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
