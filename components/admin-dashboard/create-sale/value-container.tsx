import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { shortenAddress } from "./utils/shortenAddress";

type ValueContainerProps = {
  value: string;
  isWhitelistedAddress: boolean;
  key?: number;
  removeAddress?: (address: string) => void;
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
        {props.isWhitelistedAddress ? shortenAddress(props.value) : props.value}
      </Text>
      {props.isWhitelistedAddress && props.removeAddress && (
        <Button
          variant={"unstyled"}
          p={0}
          m={0}
          onClick={() => {
            if (props.removeAddress) {
              props.removeAddress(props.value);
            }
          }}
          size={"xs"}
        >
          <CloseIcon height={"9px"} width={"9px"} color={"#F2BEBE"} />
        </Button>
      )}
    </Flex>
  );
};

export default ValueContainer;
