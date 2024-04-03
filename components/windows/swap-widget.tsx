import { Box, Flex, Image, Link, Text, useMediaQuery } from "@chakra-ui/react";

import { Window } from "components/window";
import { TokenContainer } from "components/token-container";
import { ConnectWalletButton } from "components/connect-button";
import { useRestrictedCountries } from "hooks/restrictedCountries";
import { RestrictedCountries } from "components/swap-widget/RestrictedCountries";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { SwapTsAndCs } from "components/swap-widget/SwapTsAndCs";
import { useEthPrice } from "hooks/useEtherPrice";
import { psyDAOTokenPrice } from "constants/psyTokenPrice";

export const SwapWidget = () => {
  const isRescricted = useRestrictedCountries();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [ethAmount, setEthAmount] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState(
    localStorage.getItem("acceptedTermsAndConditions") === "true"
  );

  const { address } = useAccount();
  const ethBalance = useBalance({
    address: address,
  });
  const formattedEthBalance = parseFloat(
    formatUnits(ethBalance.data ? ethBalance.data.value : BigInt(0), 18)
  ).toPrecision(4);

  const ethPrice = useEthPrice();

  const calculatePriceAndToken = (
    amount: string,
    setValue: Dispatch<SetStateAction<string>>,
    ethPrice: number,
    fromEth?: boolean
  ) => {
    const amountValue = amount.length ? Number(amount) : 0;
    const usdValue = fromEth
      ? amountValue * ethPrice
      : amountValue * psyDAOTokenPrice;
    const value = fromEth ? usdValue / psyDAOTokenPrice : usdValue / ethPrice;
    if (!isNaN(value)) {
      setValue(value.toFixed(2));
    } else {
      setValue("0.00");
    }
  };

  useEffect(() => {
    if (ethPrice) {
      if (isSwapped) {
        calculatePriceAndToken(tokenAmount, setEthAmount, ethPrice);
      } else {
        calculatePriceAndToken(ethAmount, setTokenAmount, ethPrice, true);
      }
    }
  }, [ethAmount, ethPrice, isSwapped, tokenAmount]);

  return (
    <Window
      id="swap"
      height="80%"
      maxHeight="640px"
      minHeight={isLargerThanMd ? "552px" : "350px"}
      width="95%"
      maxWidth="655px"
      minWidth="240px"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Window.TitleBar />
      <Window.Content p={2}>
        {isRescricted ? (
          <RestrictedCountries />
        ) : !termsAndConditions ? (
          <SwapTsAndCs setTermsAndConditions={setTermsAndConditions} />
        ) : (
          <>
            <Box p={6} pb={8}>
              <Text
                textColor="#269200"
                fontWeight="500"
                fontStyle="italic"
                mt="1"
                fontSize={{ base: "20px", sm: "36px" }}
                fontFamily={"Amiri"}
              >
                PSY token sale now open
              </Text>
              <Link
                textDecoration={"underline"}
                textColor="#269200"
                fontWeight="400"
                fontStyle="italic"
                fontSize={{ base: "18px", md: "24px" }}
                textUnderlineOffset={"12px"}
                fontFamily={"Amiri"}
              >
                Whitepaper
              </Link>
            </Box>
            <Flex w={"full"} alignItems={"center"} direction={"column"}>
              <Flex
                direction={"column"}
                alignItems={"start"}
                textAlign={"center"}
                w={"fit-content"}
                gap={2}
              >
                <Image
                  src="/windows/swap/swap-banner-image.png"
                  alt=""
                  margin="0 auto"
                  maxW={{ base: "220px", sm: "390px" }}
                />
                <Text
                  fontFamily={"Amiri"}
                  fontSize={{ base: "10px", sm: "16px" }}
                  color={"#f3c1c1"}
                  fontStyle={"italic"}
                >
                  {`$${psyDAOTokenPrice} per PSY`}
                </Text>
                <Text
                  fontFamily={"Amiri"}
                  fontSize={{ base: "10px", sm: "16px" }}
                  color={"#f3c1c1"}
                  fontStyle={"italic"}
                >
                  $1.023m Circulating Market Cap
                </Text>
                <Text
                  fontFamily={"Amiri"}
                  fontSize={{ base: "10px", sm: "16px" }}
                  color={"#f3c1c1"}
                  fontStyle={"italic"}
                >
                  PSY remaining for sale: 85%
                </Text>
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  w={"full"}
                  gap={4}
                >
                  <TokenContainer
                    amount={isSwapped ? tokenAmount : ethAmount}
                    setAmount={isSwapped ? setTokenAmount : setEthAmount}
                    header={isSwapped ? "Receive" : "Send"}
                    name={isSwapped ? "psyDAO" : "Ethereum"}
                    symbol={isSwapped ? "PSY" : "ETH"}
                    image={`/windows/swap/${isSwapped ? "PSY" : "ETH"}.svg`}
                    maxBalance={formattedEthBalance}
                    isSwapped={isSwapped}
                  />
                  <Box>
                    <Image
                      cursor={"pointer"}
                      alt="Arrow Swap"
                      src={"/windows/swap/arrow-swap-icon.svg"}
                      onClick={() => setIsSwapped((prev) => !prev)}
                    />
                  </Box>
                  <TokenContainer
                    amount={isSwapped ? ethAmount : tokenAmount}
                    header={isSwapped ? "Send" : "Receive"}
                    name={isSwapped ? "Ethereum" : "psyDAO"}
                    symbol={isSwapped ? "ETH" : "PSY"}
                    image={`/windows/swap/${isSwapped ? "ETH" : "PSY"}.svg`}
                    maxBalance={formattedEthBalance}
                    isSwapped={isSwapped}
                  />
                  <ConnectWalletButton />
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
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
