import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";

type TokenContainerProps = FlexProps & {
  image?: string;
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
          <Text color={"black"} fontWeight={600}>
            {props.name}
          </Text>
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
