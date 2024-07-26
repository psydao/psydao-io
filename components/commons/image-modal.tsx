import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Image src={imageSrc} alt="Full size image" />
      </ModalContent>
    </Modal>
  );
};

export default FullSizeImageModal;
