import { Flex, FormLabel, Switch } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";

type PrivateSaleSectionProps = {
  setPrivateSale: Dispatch<SetStateAction<boolean>>;
};

const PrivateSaleSection = (props: PrivateSaleSectionProps) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      p={6}
      gap={4}
      borderY="1px"
      alignItems="center"
      borderColor="#F2BEBE"
    >
      <FormLabel
        fontSize="18"
        htmlFor="private-sale"
        mb="0"
        fontFamily={"Inter"}
      >
        Private sale
      </FormLabel>
      <Switch
        id="private-sale"
        onChange={() => props.setPrivateSale((prev) => !prev)}
        size="lg"
        colorScheme="purple"
      />
    </Flex>
  );
};

export default PrivateSaleSection;
