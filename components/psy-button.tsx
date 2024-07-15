import React from "react";
import { Button } from "@chakra-ui/react";

type CustomStyle = {
  [key: string]: string | number;
};

interface PsyButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
  customStyle?: CustomStyle;
  isConfirming?: boolean;
  isAccept?: boolean;
}

export const PsyButton: React.FC<PsyButtonProps> = ({
  onClick,
  children,
  customStyle,
  isConfirming,
  isDisabled,
  isAccept
}) => {
  return (
    <Button
      onClick={onClick}
      variant={"unstyled"}
      bg={
        isDisabled
          ? "gray.500"
          : "linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)"
      }
      color={isDisabled ? "black" : "white"}
      borderRadius={"full"}
      paddingX={12}
      paddingY={3}
      height="36px"
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      isDisabled={isConfirming ?? isDisabled}
      _hover={{
        opacity: isDisabled ? "" : "0.8"
      }}
      fontFamily={"Amiri"}
      fontSize={16}
      fontWeight={600}
      maxWidth={{
        base: isAccept ? "100px" : "auto",
        md: isAccept ? "274px" : "auto"
      }}
      {...customStyle}
    >
      {children}
    </Button>
  );
};

export default PsyButton;
