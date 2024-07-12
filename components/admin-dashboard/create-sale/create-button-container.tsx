import { Box } from "@chakra-ui/react";
import CreateSaleButton from "./create-sale-button";

type CreateButtonContainerProps = {
  address: string | undefined;
  isSubmitting: boolean;
};

const CreateButtonContainer = (props: CreateButtonContainerProps) => {
  return (
    <Box
      width="100%"
      position="fixed"
      bottom={0}
      bg="white"
      mx="auto"
      p={4}
      boxShadow={"0px -2px 25.6px 0px #00000040"}
    >
      <CreateSaleButton
        address={props.address}
        isSubmitting={props.isSubmitting}
        children={"Create Sale"}
      />
    </Box>
  );
};

export default CreateButtonContainer;
