import { customToast } from "@/components/toasts/SwapSuccess";
import { type AdminSale } from "@/lib/types";
import { type Dispatch, type SetStateAction } from "react";
import { Zoom } from "react-toastify";
import { isAddress } from "viem";

export const handleCreateSale = async (
  e: React.FormEvent<HTMLFormElement>,
  address: `0x${string}` | undefined,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  startDate: string,
  startTime: string,
  floorPrice: string,
  ceilingPrice: string,
  newWhitelistedAddresses: string,
  width: number,
  startTimeStamp: number,
  whitelistedArray: string[],
  setOpenCreateSale: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  if (!address) {
    customToast(
      {
        mainText: "Please connect your wallet to create a sale",
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

  if (floorPrice > ceilingPrice) {
    isSuccess = false;
    setIsSubmitting(false);
    customToast(
      {
        type: "error",
        mainText:
          "Please make sure the floor price is less than or equal to the ceiling price"
      },
      {
        transition: Zoom
      },
      width <= 768
    );
  }

  if (startTimeStamp < Date.now()) {
    isSuccess = false;
    setIsSubmitting(false);
    customToast(
      {
        type: "error",
        mainText:
          "The date entered must be in the future. Please select a valid future date."
      },
      {
        transition: Zoom
      },
      width <= 768
    );
  }

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

    localStorage.setItem("createdSales", JSON.stringify([...mySales, newSale]));
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
