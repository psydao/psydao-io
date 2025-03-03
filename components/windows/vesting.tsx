import { useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  useMediaQuery,
  Text,
  Image
} from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import { useAccount } from "wagmi";
import { env } from "@/config/env.mjs";

// Components
import WrongNetworkWindow from "../common/wrong-network";
import { Wizard } from "react-use-wizard";
import DiagonalRectangle from "../nft-sale-widget/common/diagonal-rectangle";
import { useConnectModal } from "@rainbow-me/rainbowkit";

// Window style configurations
const windowStyles = {
  height: "100%",
  maxHeight: {
    base: "85%",
    sm: "80%",
    md: "650px"
  },
  maxWidth: {
    base: "95%",
    md: "602px"
  },
  width: "100%",
  top: {
    base: "65%",
    sm: "58%",
    md: "50%"
  }
} as const;

export function Vesting() {
  // Hooks
  const { state } = useWindowManager();
  const { address, chainId } = useAccount();

  const { openConnectModal } = useConnectModal();

  // Memoized values
  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "vesting") {
      return true;
    }

    return false;
  }, [state]);
  const isWrongNetwork = chainId !== env.NEXT_PUBLIC_CHAIN_ID;

  return (
    <Window
      id="vesting"
      {...windowStyles}
      maxHeight={fullScreenWindow ? "100%" : windowStyles.maxHeight}
      maxWidth={fullScreenWindow ? "100%" : windowStyles.maxWidth}
      top={{
        base: fullScreenWindow ? "0" : "58%",
        sm: fullScreenWindow ? "0" : "56%",
        md: fullScreenWindow ? "0" : "52%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
    >
      <Window.TitleBar />
      <Window.Content p={0} overflowX="hidden">
        {!address ? (
          <Flex
            direction={"column"}
            justifyContent="center"
            alignItems="center"
            height="100%"
            px={4}
          >
            <Box
              p={6}
              display={"inline-flex"}
              borderRadius={"30px"}
              border={"2px solid #F2BEBE73"}
              gap={2.5}
              position={"relative"}
              flexDirection={"column"}
              alignItems={"center"}
              height={"fit-content"}
              width={"fit-content"}
            >
              <Box>
                <Image src={"/psy-logo.svg"} />
              </Box>
              <Flex
                flexWrap={"nowrap"}
                gap={4}
                alignItems={"center"}
                direction={"column"}
                justifyContent={"center"}
              >
                <DiagonalRectangle position="left" />
                <Text
                  fontSize={18}
                  color={"black"}
                  lineHeight={"26px"}
                  textAlign={"center"}
                >
                  Connect your wallet <br /> to see vesting schedules
                </Text>
                <DiagonalRectangle position="right" />
                <Button
                  variant={"unstyled"}
                  w={"100%"}
                  borderRadius={"24px"}
                  border={"2px solid #F2BEBE"}
                  color={"#F2BEBE"}
                  fontSize={18}
                  fontFamily={"Amiri"}
                  fontWeight={"bold"}
                  onClick={() => {
                    openConnectModal && openConnectModal();
                  }}
                >
                  Connect Wallet
                </Button>
              </Flex>
            </Box>
          </Flex>
        ) : isWrongNetwork ? (
          <WrongNetworkWindow />
        ) : (
          <h1>List schedules here.</h1>
        )}
        <Box
          as="img"
          src="/windows/alchemist/clouds.png"
          alt=""
          position="absolute"
          right="0"
          bottom="0"
          zIndex="-1"
          filter="blur(12px)"
        />
      </Window.Content>
    </Window>
  );
}
