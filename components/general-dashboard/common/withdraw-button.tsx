import React from "react";
import { Button } from "@chakra-ui/react";

type CustomStyle = {
  [key: string]: string | number;
};

interface WithdrawButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
  customStyle?: CustomStyle;
  isConfirming?: boolean;
}

export const WithdrawButton: React.FC<WithdrawButtonProps> = ({
  onClick,
  children,
  customStyle,
  isConfirming,
  isDisabled
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
      width={"100%"}
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
      {...customStyle}
    >
      {children}
    </Button>
  );
};

export default WithdrawButton;
