import { Box, Flex, FormLabel, Input, Image, Text } from "@chakra-ui/react";

type SetTokenPriceProps = {
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  type: "floor" | "ceiling";
};

const SetTokenPrice = (props: SetTokenPriceProps) => {
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
        htmlFor={props.type === "floor" ? "floor price" : "ceiling price"}
        mb="0"
        fontFamily={"Inter"}
      >
        {props.type === "floor" ? "Floor Price" : "Ceiling Price"}
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
          step={0.01}
          min={0.01}
          w={20}
          fontSize="22px"
          fontFamily={"Inter"}
          onChange={(e) => props.setPrice(e.target.value)}
          required
          border={"none"}
          focusBorderColor="transparent"
          onWheel={(e) => e.currentTarget.blur()}
        />
        <Flex
          alignItems={"center"}
          gap={1}
          borderRadius={4}
          p="4px"
          bg="#F2BEBE1A"
        >
          <Image src="/windows/swap/ETH.svg" alt="ETH icon" />
          <Text fontWeight="semibold">ETH</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SetTokenPrice;
