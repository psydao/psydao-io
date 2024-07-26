import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
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
      <Flex
        w={"100%"}
        position={"absolute"}
        top={"8%"}
        justifyContent={"center"}
        zIndex={9999}
      >
        <Button
          variant={"unstyled"}
          bg={"#00000038"}
          w={"64px"}
          h={"64px"}
          borderRadius={"999px"}
          onClick={onClose}
        >
          <CloseIcon h={"27px"} w={"27px"} color={"white"} />
        </Button>
      </Flex>
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
