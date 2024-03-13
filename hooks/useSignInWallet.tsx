import { useAccount, useSignMessage } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { SiweMessage } from "siwe";

export const useSignInWallet = () => {
  const { address: account } = useAccount();
  const { signMessage } = useSignMessage();
  const toast = useToast();

  const signIn = async () => {
    if (!account) {
      toast({
        title: "Please connect your wallet first",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: "Sign in to your psyDAO Account with your wallet",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
      });

      signMessage({
        message: message.prepareMessage(),
      });
    } catch (verifyWalletError) {
      toast({
        title: "Error sign in",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  return signIn;
};
