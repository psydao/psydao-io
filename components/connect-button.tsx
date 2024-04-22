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
  ethToSend: number;
  walletBalance: string;
  totalTokensForSaleValue?: string;
}

export const ConnectWalletButton = ({
  tokenAmount,
  ethToSend,
  walletBalance,
  totalTokensForSaleValue
}: ConnectWalletButtonProps) => {
  const { buyToken, isBlackListWallet, error, isConfirmed, isConfirming } =
    useBuyToken();
  const signIn = useSignInWallet();

  useEffect(() => {
    if (!isBlackListWallet && typeof isBlackListWallet === "boolean") {
      void signIn();
    }
  }, [isBlackListWallet]);

  useEffect(() => {
    if (error && error.message.includes("User rejected")) {
      customToast(
        {
          mainText: "Request rejected by user. Please try again"
        },
        {
          type: "error"
        }
      );
    } else if (
      error &&
      error.message.includes("Amount Must Be Bigger Than 0")
    ) {
      customToast(
        {
          mainText: "Please enter an amount greater than 0"
        },
        {
          type: "error"
        }
      );
    } else if (
      error &&
      !error.message.includes("user rejected request") &&
      !error.message.includes("Amount Must Be Bigger Than 0")
    ) {
      customToast(
        {
          mainText: "An error occurred. Please try again later"
        },
        {
          type: "error"
        }
      );
    } else if (isConfirmed) {
      customToast(
        {
          mainText: "You’ve successfully converted ETH to PSY"
        },
        {
          type: "success"
        }
      );
    }
  }, [error, isConfirmed]);

  const invalidAmountMoreEthThanWallet =
    Number(formatEther(BigInt(!isNaN(ethToSend) ? Math.round(ethToSend) : 0))) >
    Number(walletBalance);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        const sendTransactionHandler = async () => {
          if (invalidAmountMoreEthThanWallet) {
            customToast(
              {
                mainText: "Not enough ETH for the transaction"
              },
              {
                type: "error"
              }
            );
            return;
          }
          if (
            totalTokensForSaleValue &&
            Number(tokenAmount) > Number(totalTokensForSaleValue)
          ) {
            customToast(
              {
                mainText: "Amount requested exclude token sale value"
              },
              {
                type: "error"
              }
            );
            return;
          }
          await buyToken(
            Number(tokenAmount),
            formatEther(BigInt(!isNaN(ethToSend) ? Math.round(ethToSend) : 0))
          );
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
                    mb: 9
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
