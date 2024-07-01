import { useMemo, useState } from "react";

import {
  Box,
  Flex,
  Image,
  Link,
  Switch,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import { Window } from "@/components/window";

import { useWindowManager } from "@/components/window-manager";
import { useQuery } from "@apollo/client";
import { getSaleById } from "@/services/graph";

const SwapWidgetTitle = () => {
  const [isPrivateSale, setIsPrivateSale] = useState(false);

  // TODO: Hide toggle if user is not whitelisted

  const IS_WHITELISTED = true;

  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data,
    loading,
    error
  } = useQuery(getSaleById, {
    variables: {
      id: "1"
    }
  });

  console.log(data, loading, error?.message);

  return (
    <Box px={{ base: 2, md: 4 }} py={2}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={2}
      >
        <Flex
          alignItems={{ base: "start", md: "center" }}
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Text
            textColor="#269200"
            fontWeight="500"
            fontStyle="italic"
            fontSize={{ base: "20px", sm: "40px" }}
            lineHeight={{ base: "20px", sm: "40px" }}
            fontFamily={"Amiri"}
          >
            Mint PSYC
          </Text>
          {IS_WHITELISTED && (
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
          )}
        </Flex>
        <Link
          h={"100%"}
          py={2}
          px={{ base: 2, md: 3.5 }}
          cursor={"pointer"}
          href="/documents/psydao-whitepaper.pdf"
          target="_blank"
          rel="noreferrer noopener"
          bg={"#AF52DE26"}
          borderRadius={"50px"}
          color={"#AF52DE"}
          fontFamily={"Inter Medium"}
          fontSize={{ base: 12, md: 14 }}
          _hover={{ textDecoration: "none" }}
        >
          Whitepaper
        </Link>
      </Flex>
    </Box>
  );
};

export const NftSaleWidget = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { state } = useWindowManager();

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "nft-sale") {
      return true;
    }

    return false;
  }, [state]);

  return (
    <Window
      id="nft-sale"
      height={fullScreenWindow ? "100%" : isLargerThanMd ? "500px" : "80%"}
      width={fullScreenWindow ? "100%" : isLargerThanMd ? "655px" : "95%"}
      top={{
        base: fullScreenWindow ? "0" : "60%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "56%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
    >
      <Window.TitleBar />
      <Window.Content py={2}>
        <SwapWidgetTitle />
        <Image
          src="/windows/alchemist/clouds.png"
          alt=""
          position="absolute"
          right="0"
          bottom="0"
          zIndex="-1"
          filter="blur(12px)"
        />
      </Window.Content>
    </Window>
  );
};
