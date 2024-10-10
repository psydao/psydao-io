import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Button, Image } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";
import CreateClaimButton from "./claim-button";

const EmptyState = () => {
  const { nextStep } = useWizard();
  return (
    <Flex
      gap={8}
      direction={"column"}
      p={{
        base: "4",
        md: "8"
      }}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        border={"1px solid rgba(242,190,190,0.45)"}
        borderRadius={"20px"}
        w={"fit-content"}
        marginX={"auto"}
        padding={{
          base: "4",
          md: "6"
        }}
      >
        <Image src="/psydao-logo-light.png" />
        <Flex
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={4}
        >
          <Image src="/diagonal-rectangle.png" />
          <Text
            fontSize={{
              base: "16px",
              md: "18px"
            }}
          >
            There are no claims rewards added yet
          </Text>
          <Image src="/diagonal-rectangle.png" />
        </Flex>
      </Flex>
      <CreateClaimButton
        handleClick={nextStep}
        fullWidth={false}
        buttonText={"Add a new claim rewards"}
      />
    </Flex>
  );
};

const ViewClaims = () => {
  const { previousStep } = useWizard();
  return (
    <Box height={"100%"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E9BDBD"}
      >
        <Flex
          width={"100%"}
          justifyContent={"flex-start"}
          alignItems={"baseline"}
          direction={"row"}
          gap={1.5}
          py={6}
        >
          <Button
            onClick={previousStep}
            bg={"none"}
            _hover={{
              background: "none"
            }}
          >
            <ArrowBackIcon h={6} w={6} color={"#F2BEBE"} />
          </Button>
          <Text
            as="h2"
            fontSize={{ base: "32px", sm: "40px" }}
            lineHeight={{ base: "32px", sm: "40px" }}
            color={"#269200"}
          >
            Create Claims
          </Text>
        </Flex>
      </Flex>
      <EmptyState />
    </Box>
  );
};

export default ViewClaims;
