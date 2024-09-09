import { useEffect, useMemo } from "react";
import { Image, useMediaQuery } from "@chakra-ui/react";
import { useWindowManager } from "../ui/window-manager";
import { Window } from "../ui/window";
import GeneralDashboardHeader from "./general-dashboard-header";
import GeneralSettingsSection from "./general-settings-section";
import { whitelistedAddresses } from "../admin-dashboard/whitelisted-addresses";
import { useAccount } from "wagmi";

const GeneralDashboard = ({
  triggerNftSaleUpdate
}: {
  triggerNftSaleUpdate: () => void;
}) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const { state, dispatch } = useWindowManager();
  const { address } = useAccount();

  const fullScreenWindow = useMemo(() => {
    return state.fullScreen === "general-dashboard";
  }, [state]);

  useEffect(() => {
    if (!whitelistedAddresses.includes(address ?? "0x")) {
      dispatch({ type: "close", id: "general-dashboard" });
    }
  }, [address, dispatch]);

  const handleCloseDashboard = () => {
    dispatch({ type: "close", id: "general-dashboard" });
  };

  return (
    <Window
      id="general-dashboard"
      maxHeight={{
        base: fullScreenWindow ? "100%" : "90%",
        sm: fullScreenWindow ? "100%" : "80%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      height={"100%"}
      maxWidth={{
        base: fullScreenWindow ? "100%" : "95%",
        md: fullScreenWindow ? "100%" : "602px"
      }}
      width={"100%"}
      top={{
        base: fullScreenWindow ? "0" : "55%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "50%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
    >
      <Window.TitleBar />
      <Window.Content py={2}>
        <GeneralDashboardHeader />
        <GeneralSettingsSection
          triggerNftSaleUpdate={triggerNftSaleUpdate}
          onDashboardClose={handleCloseDashboard}
        />
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

export default GeneralDashboard;
