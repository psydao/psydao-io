import { Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LinearButton from "./linear-button";

export const ConnectWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        return (
          <Box w="full">
            {(() => {
              if (!connected) {
                return (
                  <LinearButton onClick={openConnectModal}>
                    Connect A Wallet
                  </LinearButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <LinearButton onClick={openConnectModal}>
                    Wrong network
                  </LinearButton>
                );
              }
              return (
                <LinearButton onClick={openAccountModal}>
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </LinearButton>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
