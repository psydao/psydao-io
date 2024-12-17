import MintButton from "@/components/ui/mint-button";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { memo } from "react";

interface MintButtonProps {
  isButtonDisabled: boolean;
  modalNeeded: boolean;
  handleModal: () => void;
  handleMint: () => void;
  isMinting: boolean;
  isPaused: boolean;
  isActive: boolean;
  isOriginal: boolean;
  isRandom: boolean;
  isSold: boolean;
}

export const MintButtonComponent = memo(
  ({
    isButtonDisabled,
    modalNeeded,
    handleModal,
    handleMint,
    isMinting,
    isPaused,
    isActive,
    isOriginal,
    isRandom,
    isSold
  }: MintButtonProps) => {
    let buttonText = "Mint";
    let isDisabled = isButtonDisabled;

    if (isRandom) {
      if (isMinting) {
        buttonText = "Minting";
      } else if (isPaused) {
        buttonText = "Paused";
      } else if (isSold && isOriginal) {
        buttonText = "Sold";
      }

      isDisabled = isMinting || isPaused || (isSold && isOriginal);
    } else {
      if (isMinting) {
        buttonText = "Minting";
      } else if (isPaused || (!isOriginal && !isActive)) {
        buttonText = "Paused";
      } else if (isSold && isOriginal) {
        buttonText = "Sold";
      }
    }

    return (
      <Flex justifyContent="center" w="100%">
        <MintButton
          customStyle={{
            width: "100%",
            opacity:
              (isRandom ? isDisabled : isButtonDisabled) || modalNeeded
                ? 0.5
                : 1,
            cursor: modalNeeded ? "help" : "pointer"
          }}
          onClick={modalNeeded ? handleModal : handleMint}
          isRandom={isRandom}
          isDisabled={isRandom ? isDisabled : isButtonDisabled}
        >
          {isMinting && <Spinner size="sm" mr={2} />}
          {buttonText}
        </MintButton>
      </Flex>
    );
  }
);
