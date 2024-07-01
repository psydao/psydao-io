import { shortenAddress } from "@/utils/shortenAddress";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

const WalletConnectHome = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  return (
    <Button
      position="absolute"
      display={"flex"}
      top="0"
      gridArea={{
        base: "2 / -4 / span 1 / span 3",
        md: "1 / -8 / span 2 / span 3"
      }}
      width="100%"
      height={"100%"}
      maxH={"46px"}
      bg={"#fffaf8"}
      color={"#F2BEBE"}
      fontFamily={"Amiri"}
      fontStyle={"italic"}
      fontWeight={400}
      fontSize={24}
      lineHeight={"36px"}
      variant={"unstyled"}
      borderRadius={0}
      onClick={!!address ? () => disconnect() : openConnectModal}
    >
      <Flex
        h={"100%"}
        w={"100%"}
        bgGradient={
          "radial(124.71% 124.71% at 50% 50%, rgba(255, 250, 249, 0) 0%, #F2BEBE 120%)"
        }
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        {address ? shortenAddress(address) : "Connect Wallet"}
        {!!address && (
          <Box h={4} w={4}>
            <Image src="/icons/power.svg" alt="connect icon" />
          </Box>
        )}
      </Flex>
    </Button>
  );
};

export default WalletConnectHome;
