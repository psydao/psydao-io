import { Flex, Text } from "@chakra-ui/react";

export const InterimState = (props: { type: "loading" | "error" }) => {
  return (
    <Flex
      h={{ base: "150px", md: "300px" }}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex
        p={{ base: 2, sm: 6 }}
        bg={"#F2BEBE1A"}
        border={"1px solid #e2e2e2"}
        borderRadius={"18px"}
      >
        <Text fontSize={{ base: "14px", sm: "18px" }}>
          {props.type === "loading"
            ? "Loading, please wait..."
            : "Error: Failed to load sales"}
        </Text>
      </Flex>
    </Flex>
  );
};
