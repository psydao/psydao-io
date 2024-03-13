import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import Image from "next/image";

type TokenContainerProps = FlexProps & {
  image: string;
  name: string;
  symbol: string;
  header: string;
  amount: string;
};

export const TokenContainer = (props: TokenContainerProps) => {
  return (
    <Flex
      bgColor={"#fbf6f8"}
      px={4}
      py={6}
      w={"full"}
      borderRadius={"3xl"}
      direction={"column"}
      gap={2}
      boxShadow={"-2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset"}
    >
      <Text
        color={"#686478"}
        fontSize={"16px"}
        fontWeight={700}
        textAlign={"start"}
      >
        {props.header}
      </Text>
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Box
          borderRadius={"full"}
          bg={"white"}
          paddingY={{ base: 1, sm: 2 }}
          paddingX={{ base: 2, sm: 4 }}
        >
          <Flex
            gap={1}
            position={"relative"}
            height={{ base: "28px", sm: "28px" }}
            width={{ base: "76px", sm: "96px" }}
          >
            <Image
              src={props.image}
              alt={`${props.symbol} icon`}
              layout="fill"
            />
          </Flex>
        </Box>
        <Flex gap={2} alignItems={"center"}>
          <Text
            fontWeight={600}
            color={"#97929e"}
            fontSize={{ base: "12px", sm: "16px" }}
          >
            {props.amount}
          </Text>
          <Text
            fontWeight={700}
            color={"black"}
            fontSize={{ base: "12px", sm: "16px" }}
          >
            {props.symbol}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
