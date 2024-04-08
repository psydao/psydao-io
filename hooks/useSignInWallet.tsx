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
        statement:
          "Welcome to the PSY token sale! Click to sign in and verify your wallet for purchasing PSY. This request will not trigger a blockchain transaction or cost any gas fees. This signature only proves you are the true owner of this wallet. By signing this message you confirm that you have read and agreed to the Terms and Conditions Relating to the PSY Token Sale and read and understood the PsyDAO Whitepaper.",
        uri: window.location.origin,
        version: "1",
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) ?? 1,
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
