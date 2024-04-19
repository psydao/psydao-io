import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { useBlackListWallets } from "./useBlackListWallets";
import { useState } from "react";
import { useSendTokenSale } from "services/web3/useSendTokenSale";

export const useBuyToken = () => {
  const { address } = useAccount();
  const { sendTokenSale, error, isConfirmed, isConfirming } =
    useSendTokenSale();
  const toast = useToast();
  // Use this address if you want to test blacklist: 0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a
  const { data } = useBlackListWallets(address as string);

  const [isBlackListWallet, setIsBlackListWallet] = useState<boolean | null>(
    null
  );

  const buyToken = async (amountOfPsyTokens: number, ethToSpent: string) => {
    if (!address) {
      toast({
        title: "Please connect your wallet first",
        position: "top-right",
        status: "error",
        isClosable: true
      });
      return;
    }

    try {
      if (data) {
        if (data.identifications?.length > 0) {
          toast({
            title: "Address wallet is on blacklist",
            position: "top-right",
            status: "error",
            isClosable: true
          });
          setIsBlackListWallet(true);
          return;
        }

        if (data.identifications?.length === 0) {
          setIsBlackListWallet(false);
          await sendTokenSale(amountOfPsyTokens, ethToSpent);
          return;
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        isClosable: true
      });
    }
  };

  return {
    isBlackListWallet,
    buyToken,
    error,
    isConfirmed,
    isConfirming
  };
};
