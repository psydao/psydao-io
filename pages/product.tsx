import React, { useState, useEffect } from "react";
import { useAccount, useReadContract, useConnect } from "wagmi";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import {
  Tokengate,
  type Requirements,
  type Reaction,
  type UnlockingToken
} from "@shopify/tokengate";
import "@shopify/tokengate/styles.css";

const COMO_HAT_PRODUCT_ID = "your-shopify-product-id";
const NFT_CONTRACT_ADDRESS = "0x6c6Ab7b3215374dE4A65De63eAC9BC7A0c7f402d";

const ProductPage = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [unlockingTokens, setUnlockingTokens] = useState<UnlockingToken[]>([]);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const { data: nftBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: [
      {
        name: "balanceOf",
        type: "function",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view"
      }
    ],
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address)
    }
  });

  useEffect(() => {
    if (nftBalance && nftBalance > 0n) {
      setIsLocked(false);
      setUnlockingTokens([
        {
          contractAddress: NFT_CONTRACT_ADDRESS,
          collectionName: "PsyDAO NFT",
          imageUrl:
            "https://i.seadn.io/s/raw/files/216c713e9cce01a3daa3a8ee0ec8081e.png?auto=format&dpr=1&w=1000",
          name: "PSYC"
        }
      ]);
    } else {
      setIsLocked(true);
      setUnlockingTokens([]);
    }
  }, [nftBalance]);

  const requirements: Requirements = {
    logic: "ANY" as const,
    conditions: [
      {
        name: "PsyDAO NFT",
        contractAddress: NFT_CONTRACT_ADDRESS,
        imageUrl:
          "https://i.seadn.io/s/raw/files/216c713e9cce01a3daa3a8ee0ec8081e.png?auto=format&dpr=1&w=1000",
        links: [
          {
            marketplace: "OpenSea",
            url: `https://opensea.io/assets/ethereum/${NFT_CONTRACT_ADDRESS}`
          },
          {
            label: "PsyDAO",
            url: "https://www.psydao.io"
          }
        ]
      }
    ]
  };

  const reaction: Reaction = {
    type: "exclusive_access" as const
  };

  return (
    <Container centerContent>
      <VStack spacing={6} align="center">
        <Heading as="h1" size="xl">
          Exclusive Product Access
        </Heading>
        {
          <Box>
            <Text mb={4}>
              Check out this exclusive product that you can unlock with your
              PsyDAO NFT.
            </Text>
            <Tokengate
              isLocked={isLocked}
              isConnected={isConnected}
              connectButton={
                <button
                  onClick={() => {
                    console.log("connectors", connectors);
                    if (connectors[2]) {
                      connect({ connector: connectors[2] });
                    }
                  }}
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                  Connect Wallet
                </button>
              }
              connectedButton={
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                  Unlock Product
                </button>
              }
              requirements={requirements}
              reaction={reaction}
              unlockingTokens={unlockingTokens}
              redemptionLimit={{
                total: 1,
                perToken: 1
              }}
            />
          </Box>
        }
      </VStack>
    </Container>
  );
};

export default ProductPage;
