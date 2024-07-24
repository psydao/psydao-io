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

import { handleTransactionSuccess } from "@/utils/transactionHandlers";
import { useResize } from "./useResize";
import { psycSaleContractConfig } from "@/lib/sale-contract-config";
import { toWei } from "@/utils/saleUtils";
import { useCustomToasts } from "./useCustomToasts";

type ArgsType =
  | [number, string[]]
  | [number]
  | [number, number, string[]]
  | [number, number];

const useBuyNft = (
  isPrivateSale: boolean,
  isRandom: boolean,
  isOriginal: boolean
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
      console.log({
        batchId,
        erc721TokenId,
        price,
        proof
      });
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
            console.log("Function Name: ", functionName);
            console.log("Arguments: ", args);
          } else {
            functionName = isPrivateSale ? "buyFromBatch" : "buyFromBatch";
            args = isPrivateSale
              ? [batchId, erc721TokenId, proof]
              : [batchId, erc721TokenId, []];
            console.log("Function Name: ", functionName);
            console.log("Arguments: ", args);
          }
        } else {
          if (isRandom) {
            functionName = "buyRandomNftCopyFromBatch";
            args = [batchId];
            console.log("Function Name: ", functionName);
            console.log("Arguments: ", args);
          } else {
            functionName = "buyNftCopyFromBatch";
            args = [batchId, erc721TokenId];
            console.log("Function Name: ", functionName);
            console.log("Arguments: ", args);
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
