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
      alignItems={{ base: "row", sm: "center" }}
      borderColor="#F2BEBE"
      direction={{ base: "column", sm: "row" }}
      flexWrap={"wrap"}
    >
      <FormLabel fontSize="18" htmlFor={label} mb="0">
        {label}
      </FormLabel>
      <Flex
        bg="#FBF6F8"
        justifyContent={"space-between"}
        alignItems="center"
        borderRadius="xl"
        boxShadow="-2px 2px 4px 0px #0000001F inset"
        gap={4}
        p="16px"
        w={{ base: "100%", sm: "auto" }}
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
          border={"none"}
          focusBorderColor="transparent"
          onWheel={(e) => e.currentTarget.blur()}
          position={"relative"}
          zIndex={1}
        />
        <Text bg={"#F2BEBE1A"} p={"0px 8px"} rounded={"32px"} fontSize={"xl"}>
          %
        </Text>
      </Flex>
    </Flex>
  );
};

export default RevenueSplitSection;
