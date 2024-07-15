import { Box, Flex, useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useState } from "react";
import { Zoom } from "react-toastify";
import { customToast } from "../../toasts/SwapSuccess";
import { type AdminSale } from "@/lib/types";
import CreateSaleHeader from "./create-sale-header";
import NftTokensSection from "./nft-tokens";
import SetTokenPrice from "./set-token-price";

import SaleStartTimeSection from "./start-time-section";
import WhiteListedAddressesSection from "./whitelisted-addresses";
import { isAddress } from "viem";
import CreateButtonContainer from "./create-button-container";

export const CreateSale = ({
  setOpenCreateSale
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { address } = useAccount();
  const toast = useToast();
  const [timeInputType, setTimeInputType] = useState("text");
  const [focusedDate, setFocusedDate] = useState(false);
  const [focusedTime, setFocusedTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [width] = useState(window.innerWidth);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [newWhitelistedAddresses, setNewWhitelistedAddresses] = useState("");

  const whitelistedAddresses: string | null = localStorage.getItem(
    "whitelistedAddresses"
  );

  const whitelistedArray: string[] = whitelistedAddresses
    ? (JSON.parse(whitelistedAddresses) as string[])
    : [];

  const handleCreateSale = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      toast({
        title: "Please connect your wallet first",
        position: "top-right",
        status: "error",
        isClosable: true
      });
      return;
    }
    setIsSubmitting(true);
    let isSuccess = true;
    let mySales: AdminSale[] = [];
    const storedSales = localStorage.getItem("createdSales");
    if (storedSales) {
      try {
        mySales = JSON.parse(storedSales) as AdminSale[];
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
      }
    }

    const newSale: AdminSale = {
      startDate,
      startTime,
      floorPrice,
      ceilingPrice
    };

    const splitNewWhitelistedAddresses =
      newWhitelistedAddresses.length > 0
        ? newWhitelistedAddresses.split(", ")
        : [];

    splitNewWhitelistedAddresses.forEach((address) => {
      if (!isAddress(address)) {
        setIsSubmitting(false);
        isSuccess = false;
        customToast(
          {
            mainText: "Invalid address",
            isPsyc: true
          },
          {
            type: "error",
            transition: Zoom
          },
          width <= 768
        );
        return;
      }
    });

    if (isSuccess === true) {
      if (whitelistedArray.length > 0) {
        localStorage.setItem(
          "whitelistedAddresses",
          JSON.stringify([...whitelistedArray, ...splitNewWhitelistedAddresses])
        );
      } else {
        localStorage.setItem(
          "whitelistedAddresses",
          JSON.stringify([...splitNewWhitelistedAddresses])
        );
      }

      localStorage.setItem(
        "createdSales",
        JSON.stringify([...mySales, newSale])
      );
      customToast(
        {
          mainText: "Success! Your sale has been created.",
          isPsyc: true
        },
        {
          type: "success",
          transition: Zoom
        },
        width <= 768
      );
      setOpenCreateSale(false);
      setIsSubmitting(false);
    }
  };
  return (
    <Flex direction={"column"} gap={2}>
      <CreateSaleHeader
        setOpenCreateSale={() => setOpenCreateSale((prev) => !prev)}
      />
      <form onSubmit={handleCreateSale}>
        <Box position="relative" height="100%" mb={12} overflowY="auto">
          <NftTokensSection />
          <SaleStartTimeSection
            focusedDate={focusedDate}
            setFocusedDate={setFocusedDate}
            focusedTime={focusedTime}
            setFocusedTime={setFocusedTime}
            setStartDate={setStartDate}
            setStartTime={setStartTime}
            timeInputType={timeInputType}
            setTimeInputType={setTimeInputType}
          />
          <SetTokenPrice setPrice={setFloorPrice} type="floor" />
          <SetTokenPrice setPrice={setCeilingPrice} type="ceiling" />
          <WhiteListedAddressesSection
            addressArray={whitelistedArray}
            setWhitelistedAddresses={setNewWhitelistedAddresses}
          />
        </Box>
        <CreateButtonContainer address={address} isSubmitting={isSubmitting} />
      </form>
    </Flex>
  );
};
