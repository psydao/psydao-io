import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export const RestrictedCountries = () => (
  <>
    <Box pb={6}>
      <Text
        textColor="#269200"
        fontStyle="italic"
        fontSize={{ base: "20px", sm: "48px" }}
        fontFamily={"Amiri"}
        textAlign={"center"}
      >
        Ooops...
      </Text>
      <Text
        textColor="#269200"
        fontStyle="italic"
        fontSize={{ base: "18px", md: "24px" }}
        fontFamily={"Amiri"}
        textAlign={"center"}
      >
        Our platform isn&apos;t available in your region
      </Text>
    </Box>
    <Image
      src="/windows/swap/restricted-countries.png"
      alt="Restricted countries background"
    />
  </>
);
