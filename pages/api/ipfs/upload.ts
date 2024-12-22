import { pinClaimsListToIpfs, pinWhitelistToIpfs } from "@/lib/services/ipfs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;
    let ipfsHash;

    switch (type) {
      case 'claims':
        ipfsHash = await pinClaimsListToIpfs(data);
        break;
      case 'whitelist':
        ipfsHash = await pinWhitelistToIpfs(data);
        break;
      default:
        return res.status(400).json({ message: 'Invalid upload type' });
    }

    return res.status(200).json({ ipfsHash });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Upload failed' });
  }
} 