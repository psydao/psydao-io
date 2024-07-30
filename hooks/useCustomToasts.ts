import { customToast } from "@/components/toasts/SwapSuccess";
import { useToast } from "@chakra-ui/react";
import { Zoom } from "react-toastify";

const ERROR_MESSAGES = {
  "User rejected": "User rejected transaction request.",
  "Sale Paused": "Sale Paused By Owner.",
  "insufficient funds": "Insufficient funds.",
  "Invalid Price":
    "The floor price cannot be greater than or equal to the current floor price.",
  "Limit Identical":
    "You are attempting to change the buy limit to the same value. Please try again.",
  "No Limit": "You cannot set the buy limit to 0. Please try again.",
  "Sale Has Not Started": "This sale has not yet started.",
  "Not Whitelisted":
    "Cannot access sale: Your connected wallet address is not whitelisted.",
  "Batch Zero": "The batch ID cannot be zero.",
  "Purchase Limit Reached":
    "You have reached your purchase limit for this sale. Please try a different sale",
  "Token Already Sold":
    "Oh no! This token has already been sold. Please try a different token.",
  "No Proof Provided": "No proof submitted. Please contact an administrator.",
  "Token Not In Batch":
    "Token not in selected batch. Please contact an administrator.",
  "Incorrect Value": "Incorrect ETH value for token. Please try again.",
  "Non-Existent Batch": "Invalid batch number. Please try again.",
  "Only Core Contract": "Only the core contract can call this function.",
  "Ceiling Price Below Floor":
    "Ceiling price cannot be less than the floor price.",
  "server error": "A server error has occurred. Please try again.",
  OwnableUnauthorizedAccount: "Invalid wallet address.",
  "Token Array Empty": "No tokens provided for sale.",
  "Unable to decode signature":
    "Please run 'mintNextBatch' first before creating a sale",
  "Size of bytes": "Invalid wallet address(es) submitted",
  "Invalid Ceiling Price": "Floor price cannot be greater than ceiling price."
};

export const customErrorMessage = (message: string): string => {
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (message.includes(key)) return value;
  }
  return "An unknown error occurred. Please contact an administrator or try again later.";
};

export const useCustomToasts = () => {
  const toast = useToast();

  const showErrorToast = (message: string, width: number) => {
    customToast(
      {
        mainText: message,
        isPsyc: true
      },
      {
        type: "error",
        transition: Zoom
      },
      width <= 768
    );
  };

  const showCustomErrorToast = (message: string, width: number) => {
    const errorMessage = customErrorMessage(message);
    console.log(message);
    customToast(
      {
        mainText: errorMessage,
        isPsyc: true
      },
      {
        type: "error",
        transition: Zoom
      },
      width <= 768
    );
  };

  const showSuccessToast = (message: string, width: number) => {
    customToast(
      {
        mainText: message,
        isPsyc: true
      },
      {
        type: "success",
        transition: Zoom
      },
      width <= 768
    );
  };

  const showDefaultErrorToast = (title: string) => {
    toast({
      title,
      position: "top-right",
      status: "error",
      isClosable: true
    });
  };

  return {
    showErrorToast,
    showSuccessToast,
    showDefaultErrorToast,
    showCustomErrorToast
  };
};
