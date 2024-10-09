import type { Address } from "viem";

interface ShopifyResponse {
  cartResponse: {
    cart: {
      id: string;
      checkoutUrl: string;
      discountCodes: Array<{
        code: string;
        applicable: boolean;
      }>;
    };
  };
  discountCode: string;
}

const redirectToShopify = async (ethAddress: Address) => {
  const shopifyResponse = await fetch(`/api/shopify?ethAddress=${ethAddress}`);

  const response = (await shopifyResponse.json()) as ShopifyResponse;

  // Alert if no cart was created
  // else if cart was created, redirect to Shopify checkout

  if (!response.cartResponse.cart) {
    alert("Failed to create cart");
  } else if (
    response.cartResponse.cart.checkoutUrl &&
    response.cartResponse.cart.discountCodes[0]?.applicable &&
    response.discountCode
  ) {
    window.location.href = response.cartResponse.cart.checkoutUrl;
  } else {
    alert("Failed to create cart");
  }
};

export default redirectToShopify;
