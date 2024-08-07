import { useState, useEffect } from "react";
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
  onDashboardClose: () => void;
};

const WithdrawalModal = ({
  isOpen,
  onClose,
  onDashboardClose
}: WithdrawalModalProps) => {
  const [address, setAddress] = useState("");
  const { withdrawRoyalties, isSubmitting, transactionSuccess } =
    useWithdrawRoyalties();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    if (!address.trim()) return;
    setIsWithdrawing(true);
    await withdrawRoyalties(address);
    setIsWithdrawing(false);
  };

  const handleModalClose = () => {
    if (!isWithdrawing && !isSubmitting) {
      onClose();
      setAddress("");
    }
  };

  useEffect(() => {
    if (transactionSuccess) {
      setAddress("");
      onClose();
      onDashboardClose();
    }
  }, [transactionSuccess, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="lg" p={4}>
        <ModalHeader textAlign="center" fontSize="lg">
          Enter your withdrawal address
        </ModalHeader>
        {!isWithdrawing && !isSubmitting && <ModalCloseButton />}
        <ModalBody>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Input
              placeholder="Enter your withdrawal address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              mb={4}
              borderRadius="md"
              isDisabled={isWithdrawing || isSubmitting}
            />
            <WithdrawButton
              isConfirming={isSubmitting || isWithdrawing}
              onClick={handleWithdraw}
              isDisabled={isSubmitting || isWithdrawing || !address.trim()}
            >
              {isWithdrawing || isSubmitting ? "Withdrawing..." : "Withdraw"}
            </WithdrawButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawalModal;
