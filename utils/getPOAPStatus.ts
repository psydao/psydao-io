import type { Address } from "viem";

const getPOAPStatus = async (address: Address) => {
  try {
    const poapRes = await fetch("/api/poap", {
      method: "GET",
      body: JSON.stringify({ address })
    });

    if (!poapRes.ok) {
      throw new Error(`Failed to fetch POAP response: ${poapRes.statusText}`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching POAP response: ", errorMessage);
    throw error;
  }
};

export default getPOAPStatus;
