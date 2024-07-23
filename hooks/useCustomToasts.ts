import { customToast } from "@/components/toasts/SwapSuccess";
import { useToast } from "@chakra-ui/react";
import { Zoom } from "react-toastify";

export const customErrorMessage = (message: string) => {
  if (message.includes("User rejected")) {
    return "User rejected transaction request.";
  }

  if (message.includes("Invalid Price")) {
    return "The floor price cannot be greater than or equal to the current floor price.";
  }

  if (message.includes("Limit Identical")) {
    return "You are attempting to change the buy limit to the same value. Please try again.";
  }

  if (message.includes("No Limit")) {
    return "You cannot set the buy limit to 0. Please try again.";
  }

  if (message.includes("Sale Has Not Started")) {
    return "Cannot edit sale: Sale has not started.";
  }

  if (message.includes("Not Whitelisted")) {
    return "Cannot access sale: Your connected wallet address is not whitelisted.";
  }

  if (message.includes("Batch Zero")) {
    return "The batch ID cannot be zero.";
  }

  if (message.includes("Purchase Limit Reached")) {
    return "You have reached your purchase limit for this sale. Please try a different sale";
  }

  if (message.includes("Token Already Sold")) {
    return "Oh no! This token has already been sold. Please try a different token.";
  }

  if (message.includes("No Proof Provided")) {
    return "No proof submitted. Please contact an administrator.";
  }

  if (message.includes("Token Not In Batch")) {
    return "Token not in selected batch. Please contact an administrator.";
  }

  if (message.includes("Incorrect Value")) {
    return "Incorrect ETH value for token. Please try again.";
  }

  if (message.includes("Non-Existent Batch")) {
    return "Invalid batch number. Please try again.";
  }

  if (message.includes("Only Core Contract")) {
    return "Only the core contract can call this function.";
  }

  if (message.includes("Ceiling Price Below Floor")) {
    return "Ceiling price cannot be less than the floor price.";
  }
  if (message.includes("server error")) {
    return "Error on the server side. Please try again.";
  }
  if (message.includes("OwnableUnauthorizedAccount")) {
    return "Invalid wallet address.";
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
