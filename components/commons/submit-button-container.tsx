import { Flex } from "@chakra-ui/react";

type SubmitButtonContainerProps = {
  children: React.ReactNode;
};

const SubmitButtonContainer = (props: SubmitButtonContainerProps) => {
  return (
    <Flex
      width="100%"
      position="fixed"
      bottom={0}
      bg="white"
      left={0}
      p={4}
      boxShadow={"0px -2px 25.6px 0px #00000040"}
      alignItems={"center"}
      justifyContent={"center"}
      zIndex={2}
    >
      {props.children}
    </Flex>
  );
};

export default SubmitButtonContainer;
