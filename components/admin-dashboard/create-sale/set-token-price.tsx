import { Box, Flex, FormLabel, Input, Image, Text } from "@chakra-ui/react";

type SetTokenPriceProps = {
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  type: "floor" | "ceiling";
  price: string;
};

const SetTokenPrice = (props: SetTokenPriceProps) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      p={6}
      gap={4}
      borderY="1px"
      alignItems={{ base: "start", md: "center" }}
      borderColor="#F2BEBE"
      direction={{ base: "column", md: "row" }}
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
        gap={{ base: 1, sm: 4 }}
        p="16px"
        w={{ base: "100%", md: "auto" }}
      >
        <Input
          type="number"
          step={0.01}
          min={0.01}
          w={{ base: "100%", md: 20 }}
          fontSize="22px"
          fontFamily={"Inter"}
          value={props.price}
          onChange={(e) => props.setPrice(e.target.value)}
          required
          border={"none"}
          focusBorderColor="transparent"
          onWheel={(e) => e.currentTarget.blur()}
        />
        <Flex
          alignItems={"center"}
          gap={2}
          borderRadius={"18px"}
          p={"8px 16px"}
          bg="#F2BEBE1A"
        >
          <Image src="/windows/swap/ETH.svg" alt="ETH icon" />
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            ETH
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SetTokenPrice;
