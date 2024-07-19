import { useCallback, useEffect, useState } from "react";
import {
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import { customToast } from "@/components/toasts/SwapSuccess";
import { useToast } from "@chakra-ui/react";
import { Zoom } from "react-toastify";

import {
  handleTransactionError,
  handleTransactionSuccess,
  handleUserRejection
} from "@/utils/transactionHandlers";
import { useResize } from "./useResize";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { toWei } from "@/utils/saleUtils";
import useActivateSale from "./useActivateSale";

type ArgsType =
  | [number, string[]]
  | [number]
  | [number, number, string[]]
  | [number, number];

const useBuyNft = (isPrivateSale: boolean, isRandom: boolean) => {
  const { isConnected } = useAccount();
  const toast = useToast();
  const { connect, connectors } = useConnect();
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { width } = useResize();
  const { isSalesActive, activateSale } = useActivateSale();
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const buyNft = useCallback(
    async (
      batchId: number,
      erc721TokenId: number,
      tokenIdsForActivation: number[],
      price: string,
      proof: string[] = []
    ) => {
      if (!isConnected) {
        customToast(
          {
            mainText: "Please connect your wallet first"
          },
          { type: "error" },
          width <= 768
        );
        if (connectors[0]) {
          connect({ connector: connectors[0] });
        }
        return;
      }
      console.log({
        batchId,
        erc721TokenId,
        tokenIdsForActivation,
        price,
        proof
      });
      try {
        setIsMinting(true);

        if (!isSalesActive) {
          await activateSale([erc721TokenId], (error) => {
            throw error;
          });
        }

        let functionName = "";
        let args: ArgsType = [batchId, erc721TokenId];

        if (isPrivateSale && isRandom) {
          functionName = "buyRandomFromBatch";
          args = [batchId, proof];
        } else if (!isPrivateSale && isRandom) {
          functionName = "buyRandomNftCopyFromBatch";
          args = [batchId];
        } else if (isPrivateSale && !isRandom) {
          functionName = "buyFromBatch";
          args = [batchId, erc721TokenId, proof];
        } else if (!isPrivateSale && !isRandom) {
          functionName = "buyNftCopyFromBatch";
          args = [batchId, erc721TokenId];
        }

        const parsedAmount = toWei(price);

        writeContract({
          ...psycSaleContractConfig,
          functionName: functionName,
          args: args,
          value: parsedAmount
        });
      } catch (error) {
        handleTransactionError(error, width);
        setIsMinting(false);
      }
    },
    [
      isConnected,
      connect,
      writeContract,
      toast,
      connectors,
      isPrivateSale,
      isRandom
    ]
  );
  useEffect(() => {
    if (error) {
      if (error.message.includes("User rejected")) {
        handleUserRejection(width);
      } else {
        handleTransactionError(error, width);
      }
      setIsMinting(false);
      setIsModalOpen(false);
    } else if (isPending) {
      customToast(
        {
          mainText:
            "Your transaction is processing. Please wait for confirmation."
        },
        { type: "default", transition: Zoom },
        width <= 768
      );
    } else if (isSuccess) {
      handleTransactionSuccess(width);
      setIsMinting(false);
      setIsModalOpen(false);
      setIsConfirmed(true);
    }
  }, [error, isSuccess, isPending, width]);

  return {
    buyNft,
    isPending,
    isConfirming,
    isMinting,
    isModalOpen,
    setIsModalOpen,
    isConfirmed,
    setIsConfirmed
  };
};

export default useBuyNft;
