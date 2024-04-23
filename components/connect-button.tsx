import { Box } from "@chakra-ui/react";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import LinearButton from "./linear-button";
import { useBuyToken } from "hooks/useBuyToken";
import { useSignInWallet } from "hooks/useSignInWallet";
import { useEffect, useState } from "react";

import { formatEther } from "viem";
import { customToast } from "./toasts/SwapSuccess";
import { Zoom } from "react-toastify";

interface ConnectWalletButtonProps {
  tokenAmount: string;
  ethToSend: number;
  walletBalance: string;
  totalTokensForSaleValue?: string;
  isWrongNetwork?: boolean;
}

export const ConnectWalletButton = ({
  tokenAmount,
  ethToSend,
  walletBalance,
  totalTokensForSaleValue,
  isWrongNetwork
}: ConnectWalletButtonProps) => {
  const { buyToken, isBlackListWallet, error, isConfirmed, isConfirming } =
    useBuyToken();
  const signIn = useSignInWallet();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          type: "error",
          transition: Zoom
        },
        width <= 768
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
          type: "error",
          transition: Zoom
        },
        width <= 768
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
          type: "error",
          transition: Zoom
        },
        width <= 768
      );
    } else if (isConfirmed) {
      customToast(
        {
          mainText:
            "Your transaction is successful. You will receive your PsyDao token once the sale is closed"
        },
        {
          type: "success",
          transition: Zoom
        },
        width <= 768
      );
    }
  }, [error, isConfirmed]);

  const invalidAmountMoreEthThanWallet =
    Number(ethToSend) > Number(walletBalance);
  const { openChainModal } = useChainModal();

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
                type: "error",
                transition: Zoom
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
                type: "error",
                transition: Zoom
              }
            );
            return;
          }
          await buyToken(Number(tokenAmount), ethToSend.toString());
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
              if (isWrongNetwork ?? chain.unsupported) {
                return (
                  <LinearButton
                    customStyle={{
                      width: "100%",
                      mb: 9
                    }}
                    onClick={
                      openChainModal
                        ? openChainModal
                        : () => {
                            console.error("Cannot open chain modal");
                          }
                    }
                  >
                    Change network
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
                  {isConfirming ? "Transaction in progress..." : "Buy"}
                </LinearButton>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
