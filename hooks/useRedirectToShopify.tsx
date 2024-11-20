import type { Address } from "viem";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "./useResize";

interface ShopifyResponse {
  checkoutUrl: string;
  discountCode: string;
}

const useRedirectToShopify = () => {
  const { showCustomErrorToast } = useCustomToasts();
  const { width } = useResize();
  const redirectToShopify = async (ethAddress: Address | undefined) => {
    if (!ethAddress) {
      showCustomErrorToast("No wallet address provided.", width);
      return;
    }
    const shopifyResponse = await fetch(
      `/api/shopify?ethAddress=${ethAddress}`
    );

    const response = (await shopifyResponse.json()) as ShopifyResponse;

    if (!shopifyResponse.ok) {
      showCustomErrorToast("Could not create cart.", width);
      return;
    }

    if (!response.checkoutUrl || !response.discountCode) {
      showCustomErrorToast("Could not create cart.", width);
      return;
    } else if (response.checkoutUrl && response.discountCode) {
      window.open(response.checkoutUrl, "_blank");
    } else {
      showCustomErrorToast("Could not create cart.", width);
      return;
    }
  };

  return { redirectToShopify };
};

export default useRedirectToShopify;
