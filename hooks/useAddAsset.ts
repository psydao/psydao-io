import { useState } from "react";
import { useCustomToasts } from "./useCustomToasts";
import { useResize } from "./useResize";

type AssetType = "ERC20" | "ERC721" | "ERC1155";

interface AssetDetails {
  address: string;
  tokenId?: string;
  symbol?: string;
  decimals?: number;
  image?: string;
}

export const useAddAssetToWallet = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wasAdded, setWasAdded] = useState<boolean | null>(null);
  const { showSuccessToast, showCustomErrorToast } = useCustomToasts();
  const { width } = useResize();
  const addAssetToWallet = async (
    assetType: AssetType,
    assetDetails: AssetDetails
  ) => {
    setIsAdding(true);
    setError(null);
    setWasAdded(null);

    try {
      const ethereum = window.ethereum;

      if (!ethereum) {
        throw new Error("No Ethereum provider found.");
      }

      const wasAdded = (await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: assetType,
          options: {
            address: assetDetails.address,
            tokenId: assetDetails.tokenId,
            symbol: assetDetails.symbol,
            decimals: assetDetails.decimals,
            image: assetDetails.image
          }
        }
      })) as boolean;

      setWasAdded(wasAdded);

      if (wasAdded) {
        showSuccessToast("Asset added to wallet successfully!", width);
      } else {
        showCustomErrorToast("User declined to add the asset.", width);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      console.error(errorMessage, "errorMessage");
      showCustomErrorToast(errorMessage, width);
    } finally {
      setIsAdding(false);
    }
  };

  return { addAssetToWallet, isAdding, error, wasAdded };
};
