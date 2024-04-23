import { Flex, Image, Link, Show, Text } from "@chakra-ui/react";
import LinearButton from "components/linear-button";
import React, { type Dispatch, type SetStateAction, useState } from "react";

interface SwapTsAndCsType {
  setTermsAndConditions: Dispatch<SetStateAction<boolean>>;
}

export const SwapTsAndCs = ({ setTermsAndConditions }: SwapTsAndCsType) => {
  const [userHasClicked, setUserHasClicked] = useState(false);
  const handleAccept = () => {
    setTermsAndConditions(true);
    localStorage.setItem("acceptedTermsAndConditions", "true");
  };

  return (
    <>
      <Flex
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        pb={6}
        gap={4}
      >
        <Flex
          direction={"column"}
          alignItems={"center"}
          textAlign={"center"}
          color={"#269200"}
        >
          <Text
            fontSize={{ base: "18px", sm: "30px", md: "48px" }}
            fontFamily={"Amiri"}
            fontStyle={"italic"}
          >
            To Participate in our Token Sale,
          </Text>
          <Text
            fontSize={{ base: "14px", sm: "18px", md: "24px" }}
            fontFamily={"Amiri"}
            fontStyle={"italic"}
            textAlign={"center"}
          >
            Please Read and Accept our{" "}
            <Show breakpoint="(max-width: 380px)">
              <br />
            </Show>
            <Link
              cursor={"pointer"}
              href="/documents/psydao-terms-and-conditions.pdf"
              target="_blank"
              rel="noreferrer noopener"
              textDecoration={"underline"}
              textUnderlineOffset={"8px"}
              onClick={() => setUserHasClicked(true)}
            >
              Terms and Conditions
            </Link>
            .
          </Text>
        </Flex>
        <LinearButton
          customStyle={{ width: "fit-content" }}
          onClick={handleAccept}
          isDisabled={!userHasClicked}
        >
          <Text
            fontSize={{ base: "10px", sm: "18px" }}
            padding={{ base: "8px 16px", sm: "20px" }}
          >
            I Accept
          </Text>
        </LinearButton>
      </Flex>
      <Image
        src="/windows/swap/terms-conditions.png"
        alt="Terms and conditions background"
        objectFit={"fill"}
      />
    </>
  );
};
