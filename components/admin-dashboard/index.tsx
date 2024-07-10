import { useMemo } from "react";

import { Grid, Image, useMediaQuery } from "@chakra-ui/react";
import { Window } from "@/components/window";
import { useWindowManager } from "../window-manager";
import AdminDashboardHeader from "./admin-dashboard-header";
import AdminDashboardEmptyState from "./admin-dashboard-empty";

const AdminDashboardWidget = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "admin-dashboard") {
      return true;
    }

    return false;
  }, [state]);

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
    >
      <Window.TitleBar />
      <Window.Content py={2}>
        <AdminDashboardHeader />
        <Grid
          h={"100%"}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateRows={"1fr"}
        >
          <AdminDashboardEmptyState />
        </Grid>
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
