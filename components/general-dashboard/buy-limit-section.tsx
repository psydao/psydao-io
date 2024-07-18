import { Flex, FormLabel, Input, Box } from "@chakra-ui/react";

type BuyLimitSectionProps = {
  buyLimit: string;
  setBuyLimit: React.Dispatch<React.SetStateAction<string>>;
};

const BuyLimitSection = ({ buyLimit, setBuyLimit }: BuyLimitSectionProps) => {
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
      <FormLabel fontSize="18" htmlFor="buyLimit" mb="0">
        Buy limit per Address
      </FormLabel>
      <Box
        display="flex"
        bg="#FBF6F8"
        alignItems="center"
        borderRadius="xl"
        boxShadow="inner"
        gap={4}
        p="16px"
      >
        <Input
          type="number"
          step={1}
          min={1}
          w={28}
          value={buyLimit}
          onChange={(e) => setBuyLimit(e.target.value)}
          required
          fontSize="22px"
        />
      </Box>
    </Flex>
  );
};

export default BuyLimitSection;
