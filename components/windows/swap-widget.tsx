import { Box, Flex, Image, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { Window } from "components/window";
import { TokenContainer } from "components/token-container";
import { ConnectWalletButton } from "components/connect-button";
import { useRescrictedCountries } from "hooks/restrictedCountries";
import { RestrictedCountries } from "components/swap-widget/RestrictedCountries";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
  useMemo
} from "react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits, parseEther } from "viem";
import { SwapTsAndCs } from "components/swap-widget/SwapTsAndCs";
import { psyDAOTokenPrice } from "constants/psyTokenPrice";
import { useReadEthPrice } from "services/web3/useReadEthPrice";
import { useReadTokenPriceInDollar } from "services/web3/useReadTokenPriceInDollar";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useReadTotalTokensForSale } from "@/services/web3/useReadTotalTokensForSale";
import ImageNext from "next/image";
import { useWindowManager } from "../window-manager";

const SwapWidgetTitle = () => (
  <Box p={4} pb={8}>
    <Text
      textColor="#269200"
      fontWeight="500"
      fontStyle="italic"
      mt="1"
      fontSize={{ base: "20px", sm: "36px" }}
      lineHeight={{ base: "20px", sm: "36px" }}
      fontFamily={"Amiri"}
    >
      PSY token sale now open
    </Text>
    <Link
      textDecoration={"underline"}
      textColor="#269200"
      fontWeight="400"
      fontSize={{ base: "18px", md: "24px" }}
      lineHeight={{ base: "18px", md: "24px" }}
      textUnderlineOffset={"12px"}
      fontFamily={"Amiri"}
      href="/documents/psydao-whitepaper.pdf"
      target="_blank"
      rel="noreferrer noopener"
    >
      Whitepaper
    </Link>
  </Box>
);

export const SwapWidget = () => {
  const isRescricted = useRescrictedCountries();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { state } = useWindowManager();

  const [focused, setFocused] = useState<string>("");

  const [ethAmount, setEthAmount] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState(
    localStorage.getItem("acceptedTermsAndConditions") === "true"
  );

  const { address, chainId } = useAccount();
  const ethBalance = useBalance({
    address: address
  });
  const formattedEthBalance = formatUnits(
    ethBalance.data ? ethBalance.data.value : BigInt(0),
    18
  );

  const ethPrice = useReadEthPrice();
  const { data: tokenPriceInDollar } = useReadTokenPriceInDollar();
  const { data: totalTokensForSale } = useReadTotalTokensForSale();

  const totalTokensForSaleValue = useMemo(() => {
    if (totalTokensForSale) {
      return formatUnits(BigInt(totalTokensForSale as number), 18);
    }
  }, [totalTokensForSale]);

  const calculateTokenAmount = useCallback(
    (amountOfEth: string) => {
      if (ethPrice?.data && tokenPriceInDollar) {
        const ethPriceBigInt = BigInt(Number(ethPrice?.data));
        const tokenPriceInDollarBigInt = BigInt(Number(tokenPriceInDollar));
        const amountOfEthBigInt = parseEther(amountOfEth);

        const tokenAmount =
          amountOfEthBigInt /
          (tokenPriceInDollarBigInt / ethPriceBigInt + BigInt(1));

        return formatUnits(tokenAmount, 10);
      }

      return 0;
    },
    [ethPrice?.data, tokenPriceInDollar]
  );

  const calculatePriceAndToken = useCallback(
    (
      amount: string,
      setValue: Dispatch<SetStateAction<string>>,
      fromEth?: boolean
    ) => {
      if (tokenPriceInDollar) {
        const value = fromEth
          ? calculateTokenAmount(amount)
          : calculateEthAmount(amount);
        if (value) {
          setValue(Number(value).toFixed(8));
        } else {
          setValue("0,00");
        }
      }
    },
    [calculateTokenAmount, tokenPriceInDollar]
  );

  const calculateEthAmount = (amount: string): string => {
    if (ethPrice?.data && tokenPriceInDollar && Number(amount) > 0) {
      const amountFormatted = amount.includes(",")
        ? amount.replace(",", "")
        : amount.replace(".", "");

      const decimalPlaces = amount.includes(".")
        ? amount.split(".")[1]?.length
        : amount.split(",")[1]?.length;
      const amountValue = amount.length ? BigInt(amountFormatted) : BigInt(0);
      const tokenPriceInDollarBigInt = BigInt(Number(tokenPriceInDollar));
      const formula =
        tokenPriceInDollarBigInt / BigInt(Number(ethPrice?.data)) + BigInt(1);

      return formatUnits(formula * amountValue, 8 + (decimalPlaces ?? 0));
    }
    return "0";
  };

  useEffect(() => {
    if (ethPrice?.data && tokenPriceInDollar && focused === "PSY") {
      calculatePriceAndToken(tokenAmount, setEthAmount);
    }
  }, [calculatePriceAndToken, ethPrice?.data, tokenAmount, tokenPriceInDollar]);

  useEffect(() => {
    if (ethPrice?.data && tokenPriceInDollar && focused === "ETH") {
      calculatePriceAndToken(ethAmount, setTokenAmount, true);
    }
  }, [calculatePriceAndToken, ethAmount, ethPrice?.data, tokenPriceInDollar]);

  const clearAmounts = () => {
    setTokenAmount("");
    setEthAmount("");
  };

  const [currentDomain, setCurrentDomain] = useState("");
  const handleGetDomain = () => {
    setCurrentDomain(window.location.origin);
  };

  useEffect(() => {
    handleGetDomain();
  }, [currentDomain]);

  const handleCalculatePriceAndToken = () => {
    calculatePriceAndToken(ethAmount, setTokenAmount, true);
  };

  const isWrongNetwork = chainId !== 1;

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "swap") {
      return true;
    }

    return false;
  }, [state]);

  return (
    <Window
      id="swap"
      height={
        fullScreenWindow && termsAndConditions
          ? "100%"
          : isLargerThanMd
            ? "500px"
            : "80%"
      }
      width={
        fullScreenWindow && termsAndConditions
          ? "100%"
          : isLargerThanMd
            ? "655px"
            : "95%"
      }
      top={{
        base: fullScreenWindow && termsAndConditions ? "0" : "60%",
        sm: fullScreenWindow && termsAndConditions ? "0" : "58%",
        md: fullScreenWindow && termsAndConditions ? "0" : "56%"
      }}
      left={fullScreenWindow && termsAndConditions ? "0" : "50%"}
      transform={
        fullScreenWindow && termsAndConditions
          ? "translate(0, 0)"
          : "translate(-50%, -50%)"
      }
      fullScreenWindow={fullScreenWindow}
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content p={2}>
        {isRescricted ? (
          <RestrictedCountries />
        ) : !termsAndConditions ? (
          <Box pt={{ base: 0, sm: 2 }} h={"100%"}>
            <SwapTsAndCs setTermsAndConditions={setTermsAndConditions} />
          </Box>
        ) : (
          <>
            {address && isWrongNetwork ? (
              <>
                <Flex p={2} pb={5} direction={"column"} gap={4}>
                  <Text
                    textColor="#269200"
                    fontWeight="500"
                    fontStyle="italic"
                    mt="1"
                    fontSize={{ base: "20px", sm: "36px" }}
                    fontFamily={"Amiri"}
                  >
                    Wrong network!
                  </Text>
                  <Text
                    textColor="#269200"
                    fontWeight="500"
                    fontStyle="italic"
                    mt="1"
                    fontSize={{ base: "14px", sm: "24px" }}
                    fontFamily={"Amiri"}
                  >
                    Please switch to Ethereum mainnet
                  </Text>
                  <Image
                    src="/windows/swap/restricted-countries.png"
                    alt="Wrong network background"
                  />

                  <ConnectWalletButton
                    tokenAmount={tokenAmount}
                    walletBalance={formattedEthBalance}
                    totalTokensForSaleValue={totalTokensForSaleValue}
                    ethToSend={calculateEthAmount(tokenAmount)}
                    isWrongNetwork={isWrongNetwork}
                  />
                </Flex>
              </>
            ) : (
              <>
                {!fullScreenWindow && <SwapWidgetTitle />}
                <Flex w={"full"} alignItems={"center"} direction={"column"}>
                  {fullScreenWindow && <SwapWidgetTitle />}
                  <Flex
                    direction={"column"}
                    alignItems={"start"}
                    textAlign={"center"}
                    w={"fit-content"}
                    gap={2}
                  >
                    <ImageNext
                      src="/windows/swap/swap-banner-image.png"
                      alt="Swap banner"
                      width={390}
                      height={172}
                    />
                    <Text
                      fontFamily={"Amiri"}
                      fontSize={{ base: "10px", sm: "16px" }}
                      color={"#C3767F"}
                      fontStyle={"italic"}
                    >
                      {`$${psyDAOTokenPrice} per PSY`}
                    </Text>
                    <Text
                      fontFamily={"Amiri"}
                      fontSize={{ base: "10px", sm: "16px" }}
                      color={"#C3767F"}
                      fontStyle={"italic"}
                    >
                      PSY remaining for sale:{" "}
                      {`${
                        totalTokensForSaleValue
                          ? (
                              (Number(totalTokensForSaleValue) / 20466831) *
                              100
                            ).toFixed(2)
                          : "0"
                      }%`}
                    </Text>
                    <Flex
                      direction={"column"}
                      alignItems={"center"}
                      w={"full"}
                      gap={4}
                    >
                      <TokenContainer
                        amount={ethAmount}
                        setAmount={setEthAmount}
                        header="Send"
                        name="Ethereum"
                        symbol="ETH"
                        image="/windows/swap/ETH.svg"
                        maxBalance={formattedEthBalance}
                        setFocused={setFocused}
                        calculatePriceAndToken={handleCalculatePriceAndToken}
                      />
                      <ArrowDownIcon />
                      <TokenContainer
                        amount={tokenAmount}
                        setAmount={setTokenAmount}
                        header="Receive"
                        name="PsyDAO"
                        symbol="PSY"
                        image="/windows/swap/PSY.svg"
                        maxBalance={formattedEthBalance}
                        setFocused={setFocused}
                      />
                      <ConnectWalletButton
                        tokenAmount={tokenAmount}
                        walletBalance={formattedEthBalance}
                        totalTokensForSaleValue={totalTokensForSaleValue}
                        ethToSend={calculateEthAmount(tokenAmount)}
                        isWrongNetwork={isWrongNetwork}
                        clearAmounts={clearAmounts}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
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
