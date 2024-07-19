import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Box
} from "@chakra-ui/react";
import { useWithdrawRoyalties } from "@/hooks/useWithdrawRoyalties";
import WithdrawButton from "../general-dashboard/common/withdraw-button";

type WithdrawalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WithdrawalModal = ({ isOpen, onClose }: WithdrawalModalProps) => {
  const [address, setAddress] = useState("");
  const { withdrawRoyalties, isSubmitting } = useWithdrawRoyalties();

  const handleWithdraw = async () => {
    const success = await withdrawRoyalties(address);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="lg" p={4}>
        <ModalHeader textAlign="center" fontSize="lg">
          Enter your withdrawal address
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Input
              placeholder="Enter your withdrawal address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              mb={4}
              borderRadius="md"
            />
            <WithdrawButton
              isConfirming={isSubmitting}
              onClick={handleWithdraw}
              isDisabled={isSubmitting}
            >
              Withdraw
            </WithdrawButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawalModal;
