import { Box, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Image from "next/image";

type ShopifyImageModalProps = {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
};

const ShopifyImageModal = ({
  imageSrc,
  isOpen,
  onClose
}: ShopifyImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent
        h={"100%"}
        maxH={{ base: "320px", sm: "480px" }}
        w={"100%"}
        maxW={{ base: "95%", sm: "548px" }}
        bg={"transparent"}
        shadow={"none"}
      >
        <Box h={"100%"} w={"100%"} position={"relative"}>
          <Image
            src={imageSrc}
            alt="shopify product image"
            fill
            objectFit="cover"
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ShopifyImageModal;
