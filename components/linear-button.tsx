import React from "react";
import { Button } from "@chakra-ui/react";

type CustomStyle = {
  [key: string]: string | number;
};

interface LinearButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  customStyle?: CustomStyle;
}

const LinearButton: React.FC<LinearButtonProps> = ({
  onClick,
  children,
  customStyle,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={"unstyled"}
      bg={"linear-gradient(90deg, #b24fe4, #e09da3)"}
      color={"white"}
      borderRadius={"full"}
      paddingY={5}
      display={"flex"}
      {...customStyle}
    >
      {children}
    </Button>
  );
};

export default LinearButton;
