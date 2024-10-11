import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Text,
  Button,
  ModalCloseButton
} from "@chakra-ui/react";
import DiagonalRectangle from "./diagonal-rectangle";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

type ConnectWalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

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
        borderRadius={address ? "18px" : "30px"}
      >
        {address && <ModalCloseButton color={"#F2BEBE"} />}
        {address ? (
          <Flex
            position={"relative"}
            gap={"10px"}
            alignItems={"center"}
            w={"100%"}
            justifyContent={"center"}
          >
            <DiagonalRectangle position="left" />
            <Text
              color={"black"}
              fontSize={18}
              fontFamily={"Amiri"}
              textAlign={"center"}
              w={"fit"}
              fontWeight={"medium"}
            >
              Sorry! You are not whitelisted <br /> for this sale
            </Text>
            <DiagonalRectangle position="right" />
          </Flex>
        ) : (
          <>
            <Flex
              position={"relative"}
              gap={"10px"}
              alignItems={"center"}
              w={"100%"}
              justifyContent={"center"}
            >
              <DiagonalRectangle position="left" />
              <Text
                color={"black"}
                fontSize={18}
                fontFamily={"Amiri"}
                textAlign={"center"}
                w={"fit"}
              >
                To Mint PSYC NFTs, You Need to <br /> Connect Your Wallet First
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
