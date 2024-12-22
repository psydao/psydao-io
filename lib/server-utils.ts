import { PinataSDK } from "pinata";
interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const pinAddresses = async (ipfsHash: string) => {
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.NEXT_PUBLIC_PINATA_BASE_URL
  });
  try {
    if (process.env.PINATA_JWT && process.env.NEXT_PUBLIC_PINATA_BASE_URL) {
      await pinata.upload.cid(ipfsHash);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error pinning addresses: ", errorMessage);
    throw error;
  }
};
