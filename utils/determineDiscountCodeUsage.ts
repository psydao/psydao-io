import { Address } from "viem";

type DiscountUsageResponse = {
  userHasNotUsedDiscountCode: boolean;
};

export const determineDiscountCodeUsage = async (
  address: Address | undefined
) => {
  try {
    if (!address) return;
    const discountUsageRes = await fetch(
      `http://localhost:3000/api/discount-usage?address=${address}`,
      {
        method: "GET"
      }
    );

    if (!discountUsageRes.ok) {
      console.error(
        `Failed to fetch discount code usage response: ${discountUsageRes.statusText}`
      );
      return;
    }
    const discountUsageResponse =
      (await discountUsageRes.json()) as DiscountUsageResponse;
    return discountUsageResponse;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      "Error fetching discount code usage response: ",
      errorMessage
    );
    throw error;
  }
};
