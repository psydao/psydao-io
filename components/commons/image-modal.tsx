import { Box, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Image from "next/image";

type FullSizeImageModalProps = {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
};

const FullSizeImageModal = ({
  imageSrc,
  isOpen,
  onClose
}: FullSizeImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        h={{ base: "20%", sm: "27%", lg: "40%" }}
        w={"100%"}
        maxW={{ base: "90%", xl: "60vw" }}
        borderRadius={"32px"}
      >
        <Box h={"100%"} w={"100%"} position={"relative"} borderRadius={"32px"}>
          <Image
            src={imageSrc}
            alt="Full size image"
            fill
            objectFit="cover"
            style={{
              borderRadius: "32px"
            }}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FullSizeImageModal;
