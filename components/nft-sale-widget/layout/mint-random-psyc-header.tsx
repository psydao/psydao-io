import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const MintRandomPSYCHeader = () => {
  return (
    <Box position="relative" textAlign="center" py={4}>
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Image
          src="/decoration-frame.svg"
          alt="Left Decoration Frame"
          position="absolute"
          left={{ base: "5px", sm: "20px", md: "40px" }}
          top="50%"
          width={{ base: "50px", sm: "100px", md: "200px" }}
          transform="translateY(-50%)"
          zIndex="0"
        />
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          bg="white"
          border="2px solid rgba(242, 190, 190, 0.45)"
          borderRadius="full"
          px={2.5}
          py={1}
          zIndex="1"
        >
          <Image
            src="/diagonal-rectangle.svg"
            alt="Left Diagonal Rect"
            position="absolute"
            left="10px"
            zIndex="1"
            width="12px"
            height="12px"
          />
          <Text
            color="black"
            fontSize={{ base: "12px", sm: "18px" }}
            lineHeight={{ base: "20px", sm: "25px" }}
            fontFamily={"Amiri"}
            px={6}
          >
            Mint Random PSYC
          </Text>
          <Image
            src="/diagonal-rectangle.svg"
            alt="Right Diagonal Rect"
            position="absolute"
            right="10px"
            zIndex="1"
            width="12px"
            height="12px"
          />
        </Box>
        <Image
          src="/decoration-frame.svg"
          alt="Right Decoration Frame"
          position="absolute"
          right={{ base: "5px", sm: "20px", md: "40px" }}
          width={{ base: "50px", sm: "100px", md: "200px" }}
          top="50%"
          transform="translateY(-50%)"
          zIndex="0"
        />
      </Flex>
    </Box>
  );
};
