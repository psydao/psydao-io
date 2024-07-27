import { useMemo } from "react";
import { Image, useMediaQuery } from "@chakra-ui/react";
import { useWindowManager } from "../ui/window-manager";
import { Window } from "../ui/window";
import GeneralDashboardHeader from "./general-dashboard-header";
import GeneralSettingsSection from "./general-settings-section";

const GeneralDashboard = ({
  triggerNftSaleUpdate
}: {
  triggerNftSaleUpdate: () => void;
}) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    return state.fullScreen === "admin-dashboard";
  }, [state]);

  return (
    <Window
      id="general-dashboard"
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
        <GeneralDashboardHeader />
        <GeneralSettingsSection triggerNftSaleUpdate={triggerNftSaleUpdate} />
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
