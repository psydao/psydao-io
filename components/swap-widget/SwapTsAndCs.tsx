import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Box, Checkbox, Flex, Show, Text } from "@chakra-ui/react";
import LinearButton from "@/components/ui/linear-button";
import TermsAndConditionsContent from "@/components/terms-and-conditions/TermsAndConditionsContent";
import { useWindowManager } from "@/components/ui/window-manager";

interface SwapTsAndCsType {
  setTermsAndConditions: Dispatch<SetStateAction<boolean>>;
}

export const SwapTsAndCs = ({ setTermsAndConditions }: SwapTsAndCsType) => {
  const { dispatch } = useWindowManager();

  const [userHasAccepted, setUserHasAccepted] = useState(false);

  const handleAccept = () => {
    setTermsAndConditions(true);
    localStorage.setItem("acceptedTermsAndConditions", "true");
    dispatch({ type: "fullScreen", id: "" });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={{ base: 2, sm: 4 }}
      h={"100%"}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        textAlign={"center"}
        color={"#269200"}
        whiteSpace={"nowrap"}
        flexWrap={"nowrap"}
        pt={{ base: 0, sm: 4 }}
      >
        <Text
          fontSize={{ base: "18px", sm: "30px", lg: "48px" }}
          lineHeight={{ base: "22px", sm: "34px", lg: "48px" }}
          fontFamily={"Amiri"}
          fontStyle={"italic"}
        >
          To Participate in our Token Sale,
        </Text>
        <Flex
          fontSize={{ base: "14px", sm: "18px", md: "20px", lg: "22px" }}
          lineHeight={{ base: "14px", sm: "18px", md: "20px", lg: "22px" }}
          fontFamily={"Amiri"}
          fontStyle={"italic"}
          textAlign={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
          gap={1}
        >
          Please Read and Accept our{" "}
          <Show breakpoint="(max-width: 380px)">
            <br />
          </Show>
          <Text whiteSpace={"nowrap"} color={"#269200"}>
            Terms and Conditions
          </Text>
          .
        </Flex>
      </Flex>
      <TermsAndConditionsContent />
      <Flex
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
        grow={0}
        shrink={0}
        basis={"auto"}
        pt={{ base: 2, sm: 4 }}
      >
        <Flex gap={3}>
          <Checkbox
            colorScheme="purple"
            onChange={() => setUserHasAccepted((prev) => !prev)}
            isChecked={userHasAccepted}
            id="accept-terms-checkbox"
          />
          <label htmlFor="accept-terms-checkbox">
            <Text
              color={"#374151"}
              fontFamily={"Poppins"}
              fontSize={{ base: "10px", sm: "14px" }}
              cursor={"pointer"}
            >
              I have read the T&Cs
            </Text>
          </label>
        </Flex>
        <LinearButton
          customStyle={{ width: "100%" }}
          onClick={handleAccept}
          isDisabled={!userHasAccepted}
          isAccept
        >
          <Text
            fontSize={{ base: "10px", sm: "18px" }}
            padding={{ base: "8px 16px", sm: "18px" }}
          >
            I Accept
          </Text>
        </LinearButton>
      </Flex>
    </Box>
  );
};
