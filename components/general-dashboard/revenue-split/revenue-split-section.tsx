import { Flex, FormLabel, Input, Box, Text } from "@chakra-ui/react";

type RevenueSplitSectionProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const RevenueSplitSection = ({
  label,
  value,
  setValue
}: RevenueSplitSectionProps) => {
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
      <FormLabel fontSize="18" htmlFor={label} mb="0">
        {label}
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
          w={16}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          fontSize="22px"
        />
        <Text bg={"#F2BEBE1A"} p={4} rounded={"18px"} fontSize={"xl"}>
          %
        </Text>
      </Box>
    </Flex>
  );
};

export default RevenueSplitSection;
