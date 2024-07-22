import { Flex, FormLabel, Switch } from "@chakra-ui/react";

type OpenPublicSaleSectionProps = {
  openPublicSale: boolean;
  setOpenPublicSale: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenPublicSaleSection = ({
  openPublicSale,
  setOpenPublicSale
}: OpenPublicSaleSectionProps) => {
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
      <Switch
        id="openPublicSale"
        isChecked={openPublicSale}
        onChange={() => setOpenPublicSale(!openPublicSale)}
      />
    </Flex>
  );
};

export default OpenPublicSaleSection;
