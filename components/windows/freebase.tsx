import { useMemo } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import { useAccount } from "wagmi";
import { env } from "@/config/env.mjs";

// Components
import UserDashboard from "@/components/freebase";
import AdminFreebaseComponent from "@/components/freebase/admin-freebase-component";
import WrongNetworkWindow from "../common/wrong-network";
import { whitelistedAddresses } from "../admin-dashboard/whitelisted-addresses";

// Window style configurations
const windowStyles = {
  height: "100%",
  maxHeight: {
    base: "85%",
    sm: "80%",
    md: "650px"
  },
  maxWidth: {
    base: "95%",
    md: "602px"
  },
  width: "100%",
  top: {
    base: "65%",
    sm: "58%",
    md: "50%"
  }
} as const;

export function Freebase() {
  // Hooks
  const { state } = useWindowManager();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const { address, chainId } = useAccount();

  // Memoized values
  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "freebase") {
      return true;
    }

    return false;
  }, [state]);
  const isWrongNetwork = chainId !== env.NEXT_PUBLIC_CHAIN_ID;
  const isAdmin = whitelistedAddresses.includes(address ?? "0x");

  // Render content based on conditions
  const renderContent = () => {
    if (isWrongNetwork) return <WrongNetworkWindow />;
    if (isAdmin) return <AdminFreebaseComponent />;
    return <UserDashboard />;
  };

  return (
    <Window
      id="freebase"
      {...windowStyles}
      maxHeight={fullScreenWindow ? "100%" : windowStyles.maxHeight}
      maxWidth={fullScreenWindow ? "100%" : windowStyles.maxWidth}
      top={{
        base: fullScreenWindow ? "0" : "58%",
        sm: fullScreenWindow ? "0" : "56%",
        md: fullScreenWindow ? "0" : "46%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
    >
      <Window.TitleBar />
      <Window.Content p={0} overflowX="hidden">
        {renderContent()}
        <Box
          as="img"
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
}
