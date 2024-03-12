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
        <Box borderRadius={"full"} bg={"white"} paddingY={2} paddingX={4}>
          <Flex gap={1}>
            <Image
              src={props.image}
              alt={`${props.symbol} icon`}
              width={"96px"}
              height={"28px"}
            />
          </Flex>
        </Box>
        <Flex gap={2} alignItems={"center"}>
          <Text fontWeight={600} color={"#97929e"}>
            {props.amount}
          </Text>
          <Text fontWeight={700} color={"black"}>
            {props.symbol}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
