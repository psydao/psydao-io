import type { Address } from "viem";
import type { PoapResponseType } from "@/pages/api/poap";

const getPOAPStatus = async (address: Address | undefined) => {
  try {
    if (!address) return;
    const poapRes = await fetch(`/api/poap?address=${address}`, {
      method: "GET"
    });

    if (!poapRes.ok) {
      console.error(`Failed to fetch POAP response: ${poapRes.statusText}`);
      return;
    }

    if (poapRes.status === 204) return;

    const jsonPoapResponse = (await poapRes.json()) as PoapResponseType;

    return jsonPoapResponse;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching POAP response: ", errorMessage);
    throw error;
  }
};

export default getPOAPStatus;
