import { customToast } from "@/components/toasts/SwapSuccess";
import { useToast } from "@chakra-ui/react";
import { Zoom } from "react-toastify";

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
    showDefaultErrorToast
  };
};
