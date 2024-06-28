import { Flex, Switch, Text } from "@chakra-ui/react";
import { useState } from "react";

export const PrivateSaleSwitch = () => {
  const [isPrivateSale, setIsPrivateSale] = useState(false);

  return (
    <Flex alignItems={"center"} gap={2} mb={1}>
      <Switch
        isChecked={isPrivateSale}
        onChange={() => setIsPrivateSale((prev) => !prev)}
        sx={{
          "span.chakra-switch__track:not([data-checked])": {
            backgroundColor: "#E9E9EA"
          },
          "span.chakra-switch__track": {
            backgroundColor: "#AF52DE"
          }
        }}
      />
      <Text
        fontFamily={"Inter Medium"}
        fontSize={{ base: 12, md: 14 }}
        color={"#585858"}
      >
        Private Sale
      </Text>
    </Flex>
  );
};
