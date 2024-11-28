import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import { useMemo } from "react";
import { Wizard } from "react-use-wizard";
import { whitelistedAddresses } from "../admin-dashboard/whitelisted-addresses";
import { useAccount } from "wagmi";
import ClaimableRewards from "../claim/claimable-rewards";
import CreateRewardClaim from "../claim/create-reward-claim";
import AdminViewClaims from "../claim/admin-view-claims";
import WrongNetworkWindow from "../common/wrong-network";
import { env } from "@/config/env.mjs";

export const Claim = () => {
  const { state } = useWindowManager();
  const { address, chainId } = useAccount();

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "claim") {
      return true;
    }

    return false;
  }, [state]);

  const isAdmin = whitelistedAddresses.includes(address ?? "0x");
  const isWrongNetwork = chainId !== env.NEXT_PUBLIC_CHAIN_ID;

  return (
    <Window
      id="claim"
      maxHeight={{
        base: fullScreenWindow ? "100%" : "85%",
        sm: fullScreenWindow ? "100%" : "80%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      height={"100%"}
      maxWidth={{
        base: fullScreenWindow ? "100%" : "95%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      width={"100%"}
      top={{
        base: fullScreenWindow ? "0" : "60%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "48%"
      }}
      left={{
        base: fullScreenWindow ? "0" : "40%",
        xl: fullScreenWindow ? "0" : "30%"
      }}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-40%, -45%)"}
      fullScreenWindow={fullScreenWindow}
      defaultIsOpen={false}
    >
      <Window.TitleBar />
      <Window.Content
        layerStyle="window"
        position="relative"
        zIndex="0"
        p={0}
        overflowX={"hidden"}
      >
        {address && isWrongNetwork ? (
          <WrongNetworkWindow />
        ) : (
          <Wizard startIndex={0}>
            <ClaimableRewards isAdmin={isAdmin} />
            <AdminViewClaims />
            <CreateRewardClaim />
          </Wizard>
        )}
      </Window.Content>
    </Window>
  );
};
