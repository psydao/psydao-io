import { Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LinearButton from "./linear-button";
import { useBuyToken } from "hooks/useBuyToken";
import { useSignInWallet } from "hooks/useSignInWallet";
import { useEffect } from "react";
import { customToast } from "./toasts/SwapSuccess";
import { displaySwapSuccess } from "./toasts/displaySwapSuccess";
import { formatEther } from "viem";

interface ConnectWalletButtonProps {
  tokenAmount: string;
  ethAmount: string;
  ethToSend: any;
}

export const ConnectWalletButton = ({
  tokenAmount,
  ethAmount,
  ethToSend,
}: ConnectWalletButtonProps) => {
  const { buyToken, isBlackListWallet } = useBuyToken();
  const signIn = useSignInWallet();

  useEffect(() => {
    if (!isBlackListWallet && typeof isBlackListWallet === "boolean") {
      signIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlackListWallet]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        const sendTransactionHandler = async () => {
          displaySwapSuccess(true);
          await buyToken(Number(tokenAmount), formatEther(ethToSend));
        };

        return (
          <Box w="full">
            {(() => {
              if (!connected) {
                return (
                  <LinearButton
                    customStyle={{ width: "100%", mb: 9 }}
                    onClick={openConnectModal}
                  >
                    Connect A Wallet
                  </LinearButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <LinearButton
                    customStyle={{ width: "100%", mb: 9 }}
                    onClick={openConnectModal}
                  >
                    Wrong network
                  </LinearButton>
                );
              }
              return (
                <LinearButton
                  customStyle={{ width: "100%", mb: 9 }}
                  onClick={sendTransactionHandler}
                >
                  Buy
                </LinearButton>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
