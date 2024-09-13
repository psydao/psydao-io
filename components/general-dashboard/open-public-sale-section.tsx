import { Flex, FormLabel, Switch } from "@chakra-ui/react";

const OpenPublicSaleSection = () => {
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
      <FormLabel fontSize="18" htmlFor="openPublicSale" mb="0">
        Open Public Sale
      </FormLabel>
      <Switch id="openPublicSale" isChecked={false} isDisabled={true} />
    </Flex>
  );
};

export default OpenPublicSaleSection;
