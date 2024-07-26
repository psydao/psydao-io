import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Text,
  Button
} from "@chakra-ui/react";
import DiagonalRectangle from "./diagonal-rectangle";
import { useConnectModal } from "@rainbow-me/rainbowkit";

type ConnectWalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const { openConnectModal } = useConnectModal();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        p={6}
        bg={"white"}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
        alignItems={"center"}
      >
        <Flex position={"relative"} gap={"10px"} alignItems={"center"}>
          <DiagonalRectangle position="left" />
          <Text
            color={"black"}
            fontSize={18}
            fontFamily={"Amiri"}
            textAlign={"center"}
          >
            To Mint PSYC NFTs, <br /> You Need to Connect Your Wallet First
          </Text>
          <DiagonalRectangle position="right" />
        </Flex>
        <Button
          variant={"unstyled"}
          w={"100%"}
          borderRadius={"24px"}
          border={"2px solid #F2BEBE"}
          color={"#F2BEBE"}
          fontSize={24}
          fontFamily={"Amiri"}
          fontWeight={"bold"}
          onClick={() => {
            onClose();
            openConnectModal && openConnectModal();
          }}
        >
          Connect Wallet
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
