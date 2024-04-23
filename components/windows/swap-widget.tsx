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
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { SwapTsAndCs } from "components/swap-widget/SwapTsAndCs";
import { psyDAOTokenPrice } from "constants/psyTokenPrice";
import { useReadEthPrice } from "services/web3/useReadEthPrice";
import { useReadTokenPriceInDollar } from "services/web3/useReadTokenPriceInDollar";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useReadTotalTokensForSale } from "@/services/web3/useReadTotalTokensForSale";

export const SwapWidget = () => {
  const isRescricted = useRescrictedCountries();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const [focused, setFocused] = useState<string>("");

  const [ethAmount, setEthAmount] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState(
    localStorage.getItem("acceptedTermsAndConditions") === "true"
  );

  const { address, chainId, chain } = useAccount();
  const ethBalance = useBalance({
    address: address
  });
  const formattedEthBalance = parseFloat(
    formatUnits(ethBalance.data ? ethBalance.data.value : BigInt(0), 18)
  ).toPrecision(4);

  const ethPrice = useReadEthPrice();
  const { data: tokenPriceInDollar } = useReadTokenPriceInDollar();
  const { data: totalTokensForSale } = useReadTotalTokensForSale();

  const totalTokensForSaleValue = useMemo(() => {
    if (totalTokensForSale) {
      return formatUnits(BigInt(totalTokensForSale as number), 18);
    }
  }, [totalTokensForSale]);

  const calculateTokenAmount = useCallback(
    (amountOfEth: number) => {
      if (ethPrice?.data && tokenPriceInDollar) {
        const ethPriceBigInt = BigInt(Number(ethPrice?.data));
        const tokenPriceInDollarBigInt = BigInt(Number(tokenPriceInDollar));
        const amountOfEthBigInt = parseEther(amountOfEth.toString());

        const tokenAmount =
          Number(
            (amountOfEthBigInt * ethPriceBigInt) / tokenPriceInDollarBigInt
          ) / 1e10;

        return Math.round(tokenAmount);
      }

      return 0;
    },
    [ethPrice?.data, tokenPriceInDollar]
  );

  const calculatePriceAndToken = useCallback(
    (
      amount: string,
      setValue: Dispatch<SetStateAction<string>>,
      ethPrice: any,
      fromEth?: boolean
    ) => {
      const amountValue = amount.length ? Number(amount) : 0;

      const value = fromEth
        ? calculateTokenAmount(amountValue)
        : (Math.floor(Number(tokenPriceInDollar) / ethPrice) + 1) *
          1e10 *
          amountValue;

      if (!isNaN(value)) {
        const formattedEther = formatEther(BigInt(value));
        setValue(fromEth ? value.toString() : formattedEther);
      } else {
        setValue("");
      }
    },
    [calculateTokenAmount, tokenPriceInDollar]
  );

  useEffect(() => {
    if (ethPrice?.data && tokenPriceInDollar && focused === "PSY") {
      calculatePriceAndToken(tokenAmount, setEthAmount, ethPrice?.data);
    }
  }, [
    calculatePriceAndToken,
    ethPrice?.data,
    focused,
    tokenAmount,
    tokenPriceInDollar
  ]);

  useEffect(() => {
    if (ethPrice?.data && tokenPriceInDollar && focused === "ETH") {
      calculatePriceAndToken(ethAmount, setTokenAmount, ethPrice?.data, true);
    }
  }, [
    calculatePriceAndToken,
    ethAmount,
    ethPrice?.data,
    focused,
    tokenPriceInDollar
  ]);

  const [currentDomain, setCurrentDomain] = useState("");
  const handleGetDomain = () => {
    setCurrentDomain(window.location.origin);
  };

  useEffect(() => {
    handleGetDomain();
  }, [currentDomain]);

  const isProduction = currentDomain === "https://www.psydao.io";

  const isWrongNetwork =
    (isProduction && chainId !== 1) ||
    (!isProduction && chainId !== 1 && chainId !== 11155111);

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
      defaultIsOpen={true}
    >
      <Window.TitleBar />
      <Window.Content p={2}>
        {isRescricted ? (
          <RestrictedCountries />
        ) : !termsAndConditions ? (
          <SwapTsAndCs setTermsAndConditions={setTermsAndConditions} />
        ) : (
          <>
            {address && isWrongNetwork ? (
              <>
                <Flex p={3} pb={5} direction={"column"} gap={5}>
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
                    ethToSend={
                      (Math.floor(Number(tokenPriceInDollar) / ethPrice?.data) +
                        1) *
                      1e10 *
                      Number(tokenAmount)
                    }
                    isWrongNetwork={isWrongNetwork}
                  />
                </Flex>
              </>
            ) : (
              <>
                {" "}
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
                    fontSize={{ base: "18px", md: "24px" }}
                    textUnderlineOffset={"12px"}
                    fontFamily={"Amiri"}
                    href="/documents/psydao-whitepaper.pdf"
                    target="_blank"
                    rel="noreferrer noopener"
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
                        ethToSend={
                          (Math.floor(
                            Number(tokenPriceInDollar) / ethPrice?.data
                          ) +
                            1) *
                          1e10 *
                          Number(tokenAmount)
                        }
                        isWrongNetwork={isWrongNetwork}
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
