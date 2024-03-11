import React from "react";
import { Button } from "@chakra-ui/react";

interface LinearButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const LinearButton: React.FC<LinearButtonProps> = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      variant={"unstyled"}
      w={"full"}
      bg={"linear-gradient(90deg, #b24fe4, #e09da3)"}
      color={"white"}
      mb={9}
    >
      {children}
    </Button>
  );
};

export default LinearButton;
