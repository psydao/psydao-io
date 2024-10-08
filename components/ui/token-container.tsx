import {
  defaultGasEstimate,
  maxGasUsage
} from "@/constants/ethMaxValueWithGas";
import { mainnetClient } from "@/constants/publicClient";
import {
  Box,
  Button,
  Flex,
  type FlexProps,
  Input,
  Text
} from "@chakra-ui/react";
import Image from "next/image";
import { type Dispatch, type SetStateAction } from "react";
import { formatEther, parseEther } from "viem";
import { estimateFeesPerGas } from "viem/actions";

type TokenContainerProps = FlexProps & {
  image: string;
  name: string;
  symbol: string;
  header: string;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  setFocused: Dispatch<SetStateAction<string>>;
  maxBalance?: string;
  calculatePriceAndToken?: () => void;
};

export const TokenContainer = ({
  image,
  name,
  symbol,
  header,
  amount,
  setAmount,
  setFocused,
  maxBalance,
  calculatePriceAndToken
}: TokenContainerProps) => {
  const ethCard = symbol === "ETH";

  const maxValueWithGas = async () => {
    if (!maxBalance || parseFloat(maxBalance) === 0) return "0";

    const valueAsBigNumber = parseEther(maxBalance);

    try {
      const feeData = await estimateFeesPerGas(mainnetClient);

      if (feeData?.maxFeePerGas) {
        const maxFee = formatEther(feeData.maxFeePerGas);
        const gasPriceEther = parseFloat(maxFee);
        if (!isNaN(gasPriceEther)) {
          let gasCost = parseEther((gasPriceEther * maxGasUsage).toString());
          if (gasCost < defaultGasEstimate) {
            gasCost = defaultGasEstimate;
          }
          const valMinusGas = valueAsBigNumber - gasCost;
          if (valMinusGas <= 0n) return "0";
          return formatEther(valMinusGas);
        }
      }
    } catch (error) {
      console.error("error estimateFeesPerGas", error);
    }

    const valMinusGas = valueAsBigNumber - defaultGasEstimate;
    if (valMinusGas <= 0n) return "0";
    return formatEther(valMinusGas);
  };

  const handleMaxBalance = async () => {
    const valueWithGas = await maxValueWithGas();
    if (valueWithGas) {
      setAmount(Number(valueWithGas).toFixed(8));
    } else {
      setAmount("0.00");
    }
    setFocused(symbol);
    calculatePriceAndToken && calculatePriceAndToken();
  };

  return (
    <Flex
      bgColor={"#fbf6f8"}
      px={3}
      py={4}
      w={"full"}
      borderRadius={"3xl"}
      direction={"column"}
      gap={2}
      boxShadow={"-2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset"}
    >
      <Flex w={"full"} justifyContent={"space-between"}>
        <Text
          color={"#686478"}
          fontSize={"14px"}
          fontWeight={700}
          textAlign={"start"}
          fontFamily="Poppins Semibold"
        >
          {header}
        </Text>
        {header === "Send" && (
          <Flex alignItems={"center"} gap={1}>
            <Text fontSize={"12px"} color={"#656075"} fontFamily="Poppins">
              {`Balance: ${Number(maxBalance).toFixed(4)} ETH`}{" "}
            </Text>
            <Button
              variant={"unstyled"}
              bg={"#F2BEBE52"}
              borderRadius={"8px"}
              display={"flex"}
              h={"fit-content"}
              p={"2px 6px"}
              onClick={handleMaxBalance}
            >
              <Text
                textAlign={"center"}
                fontWeight="600"
                fontSize={"12px"}
                bgGradient={"linear(to-r, #B14CE7, #E09CA4)"}
                bgClip="text"
                fontFamily="Poppins Semibold"
              >
                MAX
              </Text>
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Box
          borderRadius={"full"}
          bg={"white"}
          paddingY={{ base: 1, sm: 2 }}
          paddingX={{ base: 2, sm: 4 }}
          width={"fit-content"}
        >
          <Flex gap={2} position={"relative"} alignItems={"center"} w={"100%"}>
            <Image src={image} alt={`${symbol} icon`} height={16} width={16} />
            <Text
              color={"black"}
              fontFamily={"Poppins Semibold"}
              fontSize={{ base: 10, sm: 12 }}
              fontWeight={600}
            >
              {name}
            </Text>
          </Flex>
        </Box>
        <Flex gap={2} alignItems={"center"}>
          <Input
            variant="flushed"
            focusBorderColor="#f2bebe"
            placeholder={ethCard ? "0.00" : "0"}
            textAlign={"right"}
            type="number"
            fontWeight={600}
            color={"#97929e"}
            value={ethCard ? amount : parseInt(amount)}
            onWheel={(e) => (e.target as HTMLElement).blur()}
            fontSize={{ base: "12px", sm: "16px" }}
            fontFamily="Poppins"
            onFocus={() => setFocused(symbol)}
            onChange={(e) => {
              const value = ethCard
                ? e.target.value
                : e.target.value.replace(/[^\d]/, "");
              setAmount(value);
            }}
            step={1}
            maxWidth={{ base: 20, md: "100%" }}
          />
          <Text
            fontWeight={700}
            color={"black"}
            fontSize={{ base: "12px", sm: "16px" }}
            fontFamily="Poppins Semibold"
          >
            {symbol}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
