import { Box, Image, Link, Text } from "@chakra-ui/react";

export const AlchemistGrantContent = () => {
  return (
    <>
      <Box p="4">
        <Image src="/windows/alchemist/hero.png" alt="" margin="0 auto" />
        <Text
          as="h1"
          fontSize="36px"
          fontStyle="italic"
          lineHeight="100%"
          mt="6"
        >
          Alchemist Grant applications now open
        </Text>
        <Text lineHeight="140%" mt="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
          laoreet sem. Sed vulputate ex et lectus scelerisque. Fluent Latin is a
          requirement.
        </Text>
        <Text textColor="#269200" fontWeight="700" fontStyle="italic" mt="4">
          <Link href="#" target="_blank" textDecor="underline">
            Read More
          </Link>
        </Text>
      </Box>
      <Image
        src="/windows/alchemist/clouds.png"
        alt=""
        position="absolute"
        right="0"
        bottom="0"
        zIndex="-1"
        filter="blur(12px)"
      />
    </>
  );
};
