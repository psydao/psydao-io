import { useCallback, useEffect, useState } from "react";
import {
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import { customToast } from "@/components/toasts/SwapSuccess";
import { useToast } from "@chakra-ui/react";

import { handleTransactionSuccess } from "@/utils/transactionHandlers";
import { useResize } from "./useResize";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { toWei } from "@/utils/saleUtils";
import { useCustomToasts } from "./useCustomToasts";
import graphClient from "@/config/graphql";

type ArgsType =
  | [number, string[]]
  | [number]
  | [number, number, string[]]
  | [number, number];

const useBuyNft = (
  isPrivateSale: boolean,
  isRandom: boolean,
  isOriginal: boolean,
  refetchBalances: () => void
) => {
  const { isConnected } = useAccount();
  const toast = useToast();
  const { connect, connectors } = useConnect();
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { width } = useResize();
  const { showCustomErrorToast } = useCustomToasts();
  const {
    data: hash,
    writeContractAsync,
    isPending,
    error
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const buyNft = useCallback(
    async (
      batchId: number,
      erc721TokenId: number,
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
      try {
        setIsMinting(true);

        let functionName = "";
        let args: ArgsType = [batchId, erc721TokenId];

        if (isOriginal) {
          if (isRandom) {
            functionName = isPrivateSale
              ? "buyRandomFromBatch"
              : "buyRandomFromBatch";
            args = isPrivateSale ? [batchId, proof] : [batchId, []];
          } else {
            functionName = isPrivateSale ? "buyFromBatch" : "buyFromBatch";
            args = isPrivateSale
              ? [batchId, erc721TokenId, proof]
              : [batchId, erc721TokenId, []];
          }
        } else {
          if (isRandom) {
            functionName = "buyRandomNftCopyFromBatch";
            args = [batchId];
          } else {
            functionName = "buyNftCopyFromBatch";
            args = [batchId, erc721TokenId];
          }
        }

        const parsedAmount = toWei(price);

        await writeContractAsync({
          ...psycSaleContractConfig,
          functionName: functionName,
          args: args,
          value: parsedAmount
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setIsMinting(false);
        }
      }
    },
    [
      isConnected,
      connect,
      writeContractAsync,
      toast,
      connectors,
      isPrivateSale,
      isRandom,
      isOriginal
    ]
  );

  useEffect(() => {
    if (error) {
      showCustomErrorToast(error.message, width);
      setIsMinting(false);
      setIsModalOpen(false);
    } else if (isSuccess) {
      handleTransactionSuccess(width);
      graphClient.cache.evict({
        fieldName: "userCopyBalance",
        broadcast: false
      });
      graphClient.cache.gc();
      refetchBalances();
      setIsMinting(false);
      setIsModalOpen(false);
      setIsConfirmed(true);
    }
  }, [error, isSuccess, width]);

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
