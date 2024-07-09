import { useCallback, useEffect, useState } from "react";
import {
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";
import { customToast } from "@/components/toasts/SwapSuccess";
import { useToast } from "@chakra-ui/react";
import { Zoom } from "react-toastify";

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
  const [isSalesActive, setIsSalesActive] = useState(false);
  const [activationInProgress, setActivationInProgress] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const handleActivateSale = useCallback(
    async (tokenIds: number[]) => {
      try {
        setActivationInProgress(true);
        writeContract({
          address: psycSaleSepolia,
          abi: psycSaleAbiSepolia,
          functionName: "setSalesActive",
          args: [tokenIds]
        });
        setIsSalesActive(true);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast({
          title: "Something went wrong!",
          description: message,
          position: "top-right",
          status: "error",
          isClosable: true
        });
      } finally {
        setActivationInProgress(false);
      }
    },
    [writeContract, toast]
  );

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

      if (!isSalesActive && !activationInProgress) {
        await handleActivateSale(tokenIdsForActivation);
      }

      if (isRandom && !isSalesActive) return;

      try {
        setIsMinting(true);
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

        writeContract({
          address: psycSaleSepolia,
          abi: psycSaleAbiSepolia,
          functionName: functionName,
          args: args
        });
      } catch (error: unknown) {
        customToast(
          {
            mainText: "An error occurred. Please try again later."
          },
          {
            type: "error",
            transition: Zoom
          },
          width <= 768
        );
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
      isRandom,
      handleActivateSale,
      isSalesActive,
      activationInProgress
    ]
  );

  useEffect(() => {
    if (error && error.message.includes("User rejected")) {
      customToast(
        {
          mainText: "Request rejected by user. Please try again."
        },
        {
          type: "error",
          transition: Zoom
        },
        width <= 768
      );
      setIsMinting(false);
      setIsModalOpen(false);
    } else if (error && !error.message.includes("User rejected")) {
      customToast(
        {
          mainText: "An error occurred. Please try again later."
        },
        {
          type: "error",
          transition: Zoom
        },
        width <= 768
      );
      setIsMinting(false);
      setIsModalOpen(false);
    }
    if (isPending) {
      customToast(
        {
          mainText:
            "Your transaction is processing. Please wait for confirmation."
        },
        {
          type: "default",
          transition: Zoom
        },
        width <= 768
      );
    }
    if (isSuccess) {
      customToast(
        {
          mainText: "Success! Your NFT has been minted.",
          isPsyc: true
        },
        {
          type: "success",
          transition: Zoom
        },
        width <= 768
      );
      setIsMinting(false);
      setIsModalOpen(false);
      setIsConfirmed(true);
    }
  }, [error, isSuccess, isPending]);

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
