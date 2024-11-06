import { Button } from "@chakra-ui/react";

interface CreateClaimButtonProps {
  buttonText: string;
  fullWidth: boolean;
  handleClick: () => void;
  isLoading?: boolean;
  loadingText?: string;
}

const CreateClaimButton = ({
  buttonText,
  fullWidth,
  handleClick,
  isLoading,
  loadingText
}: CreateClaimButtonProps) => {
  return (
    <Button
      onClick={handleClick}
      background={"linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)"}
      _hover={{
        background: "linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)",
        opacity: 0.7
      }}
      _loading={{
        background: "linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)",
        opacity: 0.7
      }}
      width={fullWidth ? "100%" : "auto"}
      color={"white"}
      borderRadius={"20px"}
      padding={"10px 36px"}
      fontSize={{ base: "12px", sm: "14px" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      fontFamily={"Poppins Semibold"}
      marginX={"auto"}
      loadingText={loadingText}
      isLoading={isLoading}
    >
      {buttonText}
    </Button>
  );
};

export default CreateClaimButton;
