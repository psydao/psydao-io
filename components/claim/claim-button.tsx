import { Button } from "@chakra-ui/react";

interface CreateClaimButtonProps {
  buttonText: string;
  fullWidth: boolean;
  handleClick: () => void;
}

const CreateClaimButton = ({
  buttonText,
  fullWidth,
  handleClick
}: CreateClaimButtonProps) => {
  return (
    <Button
      onClick={handleClick}
      background={"linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)"}
      width={fullWidth ? "100%" : "auto"}
      color={"white"}
      borderRadius={"20px"}
      padding={"10px 36px"}
      fontSize={"14px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      fontFamily={"Poppins Semibold"}
      marginX={"auto"}
    >
      {buttonText}
    </Button>
  );
};

export default CreateClaimButton;
