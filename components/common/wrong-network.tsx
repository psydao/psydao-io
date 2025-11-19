import { Flex, Text, Image } from "@chakra-ui/react";
import SubmitButtonContainer from "./submit-button-container";
import PsyButton from "../ui/psy-button";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { env } from "@/config/env.mjs";

type WrongNetworkWindowProps = {
  expectedChainId?: number;
};

const chainLabels: Record<number, string> = {
  1: "Ethereum Mainnet",
  11155111: "Sepolia Testnet",
  8453: "Base Mainnet",
  84532: "Base Sepolia Testnet"
};

const WrongNetworkWindow = ({ expectedChainId }: WrongNetworkWindowProps) => {
  const { openChainModal } = useChainModal();

  const defaultChainLabel = env.NEXT_PUBLIC_IS_MAINNET
    ? chainLabels[1]
    : chainLabels[11155111];

  const chainLabel =
    (expectedChainId ? chainLabels[expectedChainId] : undefined) ??
    chainLabels[env.NEXT_PUBLIC_CHAIN_ID] ??
    defaultChainLabel;

  return (
    <Flex p={2} pb={5} direction={"column"} gap={4}>
      <Text
        textColor="#269200"
        fontWeight="500"
        fontStyle="italic"
        mt="1"
        fontSize={{ base: "20px", sm: "36px" }}
        fontFamily={"Amiri"}
      >
        Wrong network!
      </Text>
      <Text
        textColor="#269200"
        fontWeight="500"
        fontStyle="italic"
        mt="1"
        fontSize={{ base: "14px", sm: "24px" }}
        fontFamily={"Amiri"}
      >
        {`Please switch to ${chainLabel}`}
      </Text>
      <Image
        src="/windows/swap/restricted-countries.png"
        alt="Wrong network background"
      />

      <SubmitButtonContainer>
        <PsyButton
          customStyle={{ width: "100%", maxWidth: "550px" }}
          onClick={() => {
            openChainModal && openChainModal();
          }}
        >
          {`Switch to ${chainLabel}`}
        </PsyButton>
      </SubmitButtonContainer>
    </Flex>
  );
};

export default WrongNetworkWindow;
