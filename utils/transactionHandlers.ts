import { customToast } from "@/components/toasts/SwapSuccess";
import { type ToastOptions, Zoom } from "react-toastify";

export const handleTransactionError = (error: unknown, width: number) => {
  let message = "Unknown error";

  if (error instanceof Error) {
    if (error.message.includes("reverted with the following reason:")) {
      const matches = error.message.match(
        /reverted with the following reason:\s*(.+)/
      );
      if (matches?.[1]) {
        message = matches[1].trim();
      } else {
        message = error.message;
      }
    } else if (error.message.includes("reverted with reason string")) {
      const matches = error.message.match(
        /reverted with reason string '([^']+)'/
      );
      if (matches?.[1]) {
        message = matches[1];
      } else {
        message = error.message;
      }
    } else {
      message = error.message;
    }
  }

  console.log("error", message);
  customToast(
    { mainText: message },
    { type: "error", transition: Zoom } as ToastOptions,
    width <= 768
  );
};

export const handleTransactionSuccess = (width: number) => {
  customToast(
    {
      mainText: "Success! Your NFT has been minted.",
      isPsyc: true
    },
    { type: "success", transition: Zoom } as ToastOptions,
    width <= 768
  );
};

export const handleUserRejection = (width: number) => {
  customToast(
    { mainText: "Request rejected by user. Please try again." },
    { type: "error", transition: Zoom } as ToastOptions,
    width <= 768
  );
};
