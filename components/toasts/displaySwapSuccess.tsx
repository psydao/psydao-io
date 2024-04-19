import { customToast } from "./SwapSuccess";

export const displaySwapSuccess = (isSuccessful: boolean) => {
  if (isSuccessful) {
    customToast(
      {
        mainText: "You've successfully converted ETH to PSY"
      },
      {
        type: "success"
      }
    );
  } else {
    customToast(
      {
        mainText: "Transaction failed. Please try again"
      },
      {
        type: "error"
      }
    );
  }
};
