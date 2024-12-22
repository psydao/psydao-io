import axios from "axios";
import { PinataSDK, type UploadOptions } from "pinata";
import { env } from "@/config/env.mjs";
import { Address } from "viem";

export interface Balance {
  address: Address;
  tokens: string;
}

/**
 * Uploads an array of balances to IPFS
 *
 * @param {Balance[]} array - The array of balances to upload
 * @returns {Promise<string>} - The IPFS hash of the uploaded data
 */
export const uploadArrayToIpfs = async (array: Balance[]) => {
  try {
    const fileToUpload = new Blob([JSON.stringify(array)], {
      type: "application/json"
    });
    const formData = new FormData();
    formData.append("file", fileToUpload);
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${env.PINATA_JWT}`
        }
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get the data from IPFS
 *
 * @param {string} ipfsHash - The IPFS hash to get the data from
 * @returns {Promise<any>} - The data from IPFS
 */
export const getIpfsHash = async (ipfsHash: string) => {
  const response = await axios.get(
    `${env.NEXT_PUBLIC_PINATA_BASE_URL}/ipfs/${ipfsHash}`
  );
  return response.data;
};

/**
 * Uploads a list of balances<Balance[]> to IPFS
 * Uses the Pinata SDK as well as the admin JWT
 * Store the pins in the `psydaoClaims` group on Pinata, if its a new pin
 *
 * @param {Balance[]} balanceList - The list of balances to upload
 * @returns {Promise<string>} - The IPFS hash of the uploaded data
 */
export async function pinClaimsListToIpfs(
  balanceList: Balance[]
): Promise<string> {
  try {
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_ADMIN_JWT!,
      pinataGateway: "red-literary-tiglon-645.mypinata.cloud"
    });

    const psyDaoClaimsGroupId = "5bac7a60-6086-46cf-8adc-782fef1b522f"; // psydaoClaims groupId on Pinata

    const options: UploadOptions = {
      cidVersion: 0,
      metadata: {
        name: `PsyDAO Claims Distribution - ${new Date().toISOString()}`,
        keyValues: {
          type: "claims-distribution-balances"
        }
      },
      groupId: psyDaoClaimsGroupId
    };

    const upload = await pinata.upload.json(balanceList, options);

    const ipfsHash = upload.IpfsHash;

    console.log("ipfs hash", ipfsHash);
    if (upload.isDuplicate) {
      console.log("Duplicate pin detected: ", ipfsHash);
    }

    return ipfsHash;
  } catch (error) {
    console.error("IPFS upload error: ", error);
    throw error;
  }
}




/**
 * Uploads a list of balances<Balance[]> to IPFS
 * Uses the Pinata SDK as well as the admin JWT
 * Store the pins in the `psydaoClaims` group on Pinata, if its a new pin
 *
 * @param {string[]} addresses - The list of addresses to upload
 * @returns {Promise<string>} - The IPFS hash of the uploaded data
 */
export async function pinWhitelistToIpfs(
  addresses: string[]
): Promise<string> {
  try {

    const pinata = new PinataSDK({
      pinataJwt: env.PINATA_ADMIN_JWT,
      pinataGateway: "red-literary-tiglon-645.mypinata.cloud"
    });

    const psyDaoClaimsGroupId = "5bac7a60-6086-46cf-8adc-782fef1b522f"; // psydaoClaims groupId on Pinata

    const options: UploadOptions = {
      cidVersion: 0,
      metadata: {
        name: `PsyDAO Whitelist - ${new Date().toISOString()}`,
        keyValues: {
          type: "whitelist"
        }
      },
      groupId: psyDaoClaimsGroupId
    };

    const upload = await pinata.upload.json(addresses, options);

    const ipfsHash = upload.IpfsHash;

    console.log("ipfs hash", ipfsHash);
    if (upload.isDuplicate) {
      console.log("Duplicate pin detected: ", ipfsHash);
    }

    return ipfsHash;
  } catch (error) {
    console.error("IPFS upload error: ", error);
    throw error;
  }
}
