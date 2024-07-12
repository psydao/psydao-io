import { Button } from "@chakra-ui/react";

type CreateSaleButtonProps = {
  address: string | undefined;
  isSubmitting: boolean;
  children: React.ReactNode;
};

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  return (
    <Button
      type="submit"
      variant={"unstyled"}
      bg={
        !props.address
          ? "gray.500"
          : "linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)"
      }
      color={!props.address ? "black" : "white"}
      borderRadius={"full"}
      paddingX={12}
      paddingY={3}
      height="36px"
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      isDisabled={props.isSubmitting ?? !props.address}
      _hover={{
        opacity: !props.address ? "" : "0.8"
      }}
      fontFamily={"Amiri"}
      fontSize={16}
      fontWeight={600}
      width="100%"
      zIndex={10}
    >
      {props.children}
    </Button>
  );
};

export default CreateSaleButton;
