import { Box, Button, Flex, FlexProps, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type TokenContainerProps = FlexProps & {
  image: string;
  name: string;
  symbol: string;
  header: string;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  setFocused: Dispatch<SetStateAction<string>>;
  maxBalance?: string;
};

export const TokenContainer = (props: TokenContainerProps) => {
  const ethCard = props.symbol === "ETH";

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
      <Flex w={"full"} justifyContent={"space-between"}>
        <Text
          color={"#686478"}
          fontSize={"16px"}
          fontWeight={700}
          textAlign={"start"}
        >
          {props.header}
        </Text>
        {props.header === "Send" && (
          <Flex alignItems={"center"} gap={1}>
            <Text fontSize={"10px"} color={"#656075"}>
              {`Balance: ${props.maxBalance} ETH`}{" "}
            </Text>
            <Button
              variant={"unstyled"}
              bg={"#F2BEBE52"}
              borderRadius={"8px"}
              display={"flex"}
              h={"fit-content"}
              p={"2px 6px"}
              onClick={() => {
                if (props.maxBalance) {
                  props.setAmount(props.maxBalance);
                }
              }}
            >
              <Text
                textAlign={"center"}
                fontWeight="600"
                fontSize={"10px"}
                bgGradient={"linear(to-r, #B14CE7, #E09CA4)"}
                bgClip="text"
              >
                MAX
              </Text>
            </Button>
          </Flex>
        )}
      </Flex>
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
          <Input
            variant="flushed"
            focusBorderColor="#f2bebe"
            placeholder={ethCard ? "0.00" : "0"}
            textAlign={"right"}
            type="number"
            fontWeight={600}
            color={"#97929e"}
            value={ethCard ? props.amount : parseInt(props.amount)}
            fontSize={{ base: "12px", sm: "16px" }}
            onFocus={() => props.setFocused(props.symbol)}
            onChange={(e) => {
              const value = ethCard
                ? e.target.value
                : e.target.value.replace(/[^\d]/, "");
              props.setAmount(value);
            }}
            step={1}
          />
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
