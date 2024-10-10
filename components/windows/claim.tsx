import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import { useMemo } from "react";
import { Wizard } from "react-use-wizard";
import { whitelistedAddresses } from "../admin-dashboard/whitelisted-addresses";
import { useAccount } from "wagmi";
import ClaimableRewards from "../claim/claimable-rewards";
import ViewClaims from "../claim/view-claims";

export const Claim = () => {
  const { state } = useWindowManager();
  const { address } = useAccount();

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "claim") {
      return true;
    }

    return false;
  }, [state]);

  const isAdmin = whitelistedAddresses.includes(address ?? "0x");

  return (
    <Window
      id="claim"
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
      left={"50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-40%, -45%)"}
      fullScreenWindow={fullScreenWindow}
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content
        layerStyle="window"
        position="relative"
        zIndex="0"
        p={0}
        overflowX={"hidden"}
      >
        <Wizard
          startIndex={0}
        >
          <ClaimableRewards isAdmin={isAdmin} />
          <ViewClaims />
        </Wizard>
      </Window.Content>
    </Window>
  );
};
