import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

type ValueContainerProps = {
  value: string;
  isWhitelistedAddress: boolean;
  key?: number;
};

const ValueContainer = (props: ValueContainerProps) => {
  return (
    <Flex
      py={{ base: 2, md: 3 }}
      px={{ base: 2, md: 4 }}
      cursor={"pointer"}
      bg={"#F2BEBE1A"}
      borderRadius={"50px"}
      flexShrink={0}
      gap={2}
      alignItems={"center"}
    >
      <Text
        fontFamily={"Inter Medium"}
        fontSize={{ base: 12, md: 14 }}
        _hover={{ textDecoration: "none" }}
        color={"#454545"}
      >
        {props.value}
      </Text>
      {props.isWhitelistedAddress && (
        <CloseIcon height={"9px"} width={"9px"} color={"#F2BEBE"} />
      )}
    </Flex>
  );
};

export default ValueContainer;
