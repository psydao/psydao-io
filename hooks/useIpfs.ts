import { type Balance } from "@/lib/services/ipfs";

export function useIpfs() {
  const uploadClaimsList = async (balanceList: Balance[]) => {
    try {
      const response = await fetch('/api/ipfs/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'claims',
          data: balanceList
        }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.ipfsHash;
    } catch (error) {
      console.error('Failed to upload claims list:', error);
      throw error;
    }
  };

  const uploadWhitelist = async (addresses: string[]) => {
    try {
      const response = await fetch('/api/ipfs/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'whitelist',
          data: addresses
        }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.ipfsHash;
    } catch (error) {
      console.error('Failed to upload whitelist:', error);
      throw error;
    }
  };

  return {
    uploadClaimsList,
    uploadWhitelist
  };
} 