import { Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LinearButton from "./linear-button";
import { useBuyToken } from "hooks/useBuyToken";
import { useSignInWallet } from "hooks/useSignInWallet";
import { useEffect } from "react";

import { formatEther } from "viem";
import { customToast } from "./toasts/SwapSuccess";

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
  const { buyToken, isBlackListWallet, error, isConfirmed, isConfirming } =
    useBuyToken();
  const signIn = useSignInWallet();

  useEffect(() => {
    if (!isBlackListWallet && typeof isBlackListWallet === "boolean") {
      signIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlackListWallet]);

  useEffect(() => {
    if (error && error.message.includes("User rejected")) {
      customToast(
        {
          mainText: "Request rejected by user. Please try again",
        },
        {
          type: "error",
        }
      );
    } else if (
      error &&
      error.message.includes("Amount Must Be Bigger Than 0")
    ) {
      customToast(
        {
          mainText: "Please enter an amount greater than 0",
        },
        {
          type: "error",
        }
      );
    } else if (
      error &&
      !error.message.includes("user rejected request") &&
      !error.message.includes("Amount Must Be Bigger Than 0")
    ) {
      customToast(
        {
          mainText: "An error occurred. Please try again later",
        },
        {
          type: "error",
        }
      );
    } else if (isConfirmed) {
      customToast(
        {
          mainText: "You’ve successfully converted ETH to PSY",
        },
        {
          type: "success",
        }
      );
    }
  }, [error, isConfirmed]);

  useEffect(() => {}, [error, isConfirmed]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        const sendTransactionHandler = async () => {
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
                  customStyle={{
                    width: "100%",
                    mb: 9,
                  }}
                  onClick={sendTransactionHandler}
                  isConfirming={isConfirming}
                >
                  {isConfirming ? "PSY incoming..." : "Buy"}
                </LinearButton>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
