import {
  Modal,
  ModalContent,
  type ModalContentProps,
  ModalOverlay,
  type ModalOverlayProps,
  type ModalProps
} from "@chakra-ui/react";

interface Props extends ModalProps {
  modalOverlayProps?: ModalOverlayProps;
  contentContainerProps?: ModalContentProps;
}

export const ModalContainer = ({
  children,
  modalOverlayProps,
  contentContainerProps,
  ...props
}: Props) => {
  return (
    <Modal isCentered {...props}>
      <ModalOverlay
        bg={"transparent"}
        background="rgba(25, 22, 59, 0.53)"
        backdropFilter="blur(8px)"
        p={{ base: 2, sm: "auto" }}
        {...modalOverlayProps}
      />
      <ModalContent
        bg="white"
        borderRadius="20px"
        display="flex"
        maxWidth="auto"
        width="fit-content"
        p={{ base: 2, sm: 6 }}
        height="fit-content"
        margin="12px"
        color="black"
        flexDirection="column"
        {...contentContainerProps}
      >
        {children}
      </ModalContent>
    </Modal>
  );
};
