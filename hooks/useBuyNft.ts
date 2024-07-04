import { useCallback, useEffect, useState } from "react";
import {
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import { useToast } from "@chakra-ui/react";
import psycSaleAbiSepolia from "../abis/psycSaleAbiSepolia.json";
import { psycSaleSepolia } from "../constants/contracts";
// import { parseUnits } from "viem";

type ArgsType =
  | [number, string[]]
  | [number]
  | [number, number, string[]]
  | [number, number];

const useBuyNft = (isPrivateSale: boolean, isRandom: boolean) => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const toast = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: hash, writeContract, isPending, error } = useWriteContract();

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
        toast({
          title: "Please connect your wallet first",
          position: "top-right",
          status: "error",
          isClosable: true
        });
        if (connectors[0]) {
          connect({ connector: connectors[0] });
        }
        return;
      }

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
        // const priceInWei = parseUnits(price?.split(" ")[0] ?? "0", 18);

        writeContract({
          address: psycSaleSepolia,
          abi: psycSaleAbiSepolia,
          functionName: functionName,
          args: args
          // value: priceInWei
        });
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
      toast({
        title: "Error",
        description: `Failed to mint NFT: ${error.message || "Unknown error"}`,
        position: "top-right",
        status: "error",
        isClosable: true
      });
      setIsMinting(false);
      setIsModalOpen(false);
    }
    if (isPending) {
      toast({
        title: "Pending",
        description:
          "Your transaction is processing. Please wait for confirmation...",
        position: "top-right",
        status: "info",
        isClosable: true
      });
    }
    if (hash) {
      toast({
        title: "Confirmed",
        description: "Transaction confirmed: Your NFT has been minted.",
        position: "top-right",
        status: "success",
        isClosable: true
      });
      setIsMinting(false);
      setIsModalOpen(false);
      setIsConfirmed(true);
    }
  }, [error, hash, isSuccess, toast]);

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
