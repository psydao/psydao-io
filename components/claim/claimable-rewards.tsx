import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import ClaimCard from "./claim-card";
import { useWizard } from "react-use-wizard";
import { useGetBatchClaims } from "@/hooks/useGetBatchClaims";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import DiagonalRectangle from "../nft-sale-widget/common/diagonal-rectangle";
import { env } from "@/config/env.mjs";
import { ClaimStatus } from "@/lib/types";

interface ClaimableRewardsProps {
  isAdmin: boolean;
}

type MappedClaimData = {
  id: string;
  claims: [];
  batchId: string;
  ipfsHash: string;
  merkleRoot: string;
  amount: string;
  claimed: boolean;
  deadline: string;
  merkleProof: string[];
  buttonDisabled: boolean;
  reason: ClaimStatus | undefined;
};

const EmptyState = (props: {
  address: Address | undefined;
  loading: boolean;
}) => {
  const { openConnectModal } = useConnectModal();

  return props.address ? (
    <Flex
      gap={8}
      direction={"column"}
      p={{
        base: "4",
        md: "8"
      }}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        border={"1px solid rgba(242,190,190,0.45)"}
        borderRadius={"20px"}
        w={"fit-content"}
        marginX={"auto"}
        padding={{
          base: "4",
          md: "6"
        }}
      >
        <Text
          fontSize={{
            base: "16px",
            md: "18px"
          }}
        >
          {props.loading ? "Loading rewards..." : "No claimable rewards yet"}
        </Text>
      </Flex>
    </Flex>
  ) : (
    <Flex
      direction={"column"}
      justifyContent="center"
      alignItems="center"
      height="100%"
      px={4}
    >
      <Box
        p={6}
        display={"inline-flex"}
        borderRadius={"30px"}
        border={"2px solid #F2BEBE73"}
        gap={2.5}
        position={"relative"}
        flexDirection={"column"}
        alignItems={"center"}
        height={"fit-content"}
        width={"fit-content"}
      >
        <Box>
          <Image src={"/psy-logo.svg"} />
        </Box>
        <Flex
          flexWrap={"nowrap"}
          gap={4}
          alignItems={"center"}
          direction={"column"}
          justifyContent={"center"}
        >
          <DiagonalRectangle position="left" />
          <Text
            fontSize={18}
            color={"black"}
            lineHeight={"26px"}
            textAlign={"center"}
          >
            Connect your wallet <br /> to view rewards
          </Text>
          <DiagonalRectangle position="right" />
          <Button
            variant={"unstyled"}
            w={"100%"}
            borderRadius={"24px"}
            border={"2px solid #F2BEBE"}
            color={"#F2BEBE"}
            fontSize={18}
            fontFamily={"Amiri"}
            fontWeight={"bold"}
            onClick={() => {
              openConnectModal && openConnectModal();
            }}
          >
            Connect Wallet
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

const ClaimableRewards: React.FC<ClaimableRewardsProps> = ({ isAdmin }) => {
  const { nextStep } = useWizard();
  const claims = useGetBatchClaims();
  const [mappedData, setMappedData] = useState<MappedClaimData[]>([]);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const fetchMappedData = async (): Promise<{
    data?: any;
    error?: any;
  }> => {
    const cleanedClaimsArray = claims.map(({ __typename, ...rest }) => rest);

    try {
      setLoading(true);
      const response = await fetch("/api/mapped-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          claims: cleanedClaimsArray,
          address: address
        })
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Error:", result.error);
        return { error: result.error };
      }

      const result = await response.json();
      return { data: result };
    } catch (error) {
      console.error("Error calling API:", error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (claims && address) {
      fetchMappedData()
        .then((result) => {
          setMappedData(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [address, claims]);

  if (!mappedData) {
    return null;
  }

  return (
    <Box>
      <Flex
        px={{ base: "4", md: "8" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E9BDBD"}
      >
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          gap={1.5}
          py={6}
        >
          <Text
            as="h2"
            fontSize={{ base: "20px", sm: "24px" }}
            lineHeight={{ base: "20px", sm: "24px" }}
          >
            Claimable Rewards for PSYC Token Holders
          </Text>
          {isAdmin && (
            <Button
              h={"100%"}
              py={{ base: 2, md: 3 }}
              px={{ base: 2, md: 4 }}
              w={"100%"}
              maxW={{ base: "106px", sm: "138px" }}
              display={"flex"}
              justifyContent={"center"}
              bg={"#AF52DE26"}
              borderRadius={"50px"}
              color={"#AF52DE"}
              fontFamily={"Inter Medium"}
              fontSize={{ base: 12, md: 14 }}
              _hover={{ textDecoration: "none" }}
              onClick={nextStep}
            >
              Create claims
            </Button>
          )}
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "minmax(170px, 1fr)",
          sm: "repeat(auto-fit, minmax(170px, 1fr))"
        }}
        gap={2}
        justifyItems="center"
        maxW="100%"
        padding={{ base: "4", md: "8" }}
      >
        {address && mappedData.length > 0 ? (
          mappedData.map((item, index) => {
            return (
              <ClaimCard
                key={index}
                amount={item.amount}
                claimStatus={
                  item.claimed
                    ? "Claimed"
                    : item.reason
                      ? item.reason
                      : "Claimable"
                }
                batchId={item.batchId}
                expiry={item.deadline}
                onClaim={() => {}}
                proof={item.merkleProof}
                text={item.reason ? item.reason : "Claim"}
                disabled={!!item.reason}
              />
            );
          })
        ) : (
          <EmptyState address={address} loading={loading} />
        )}
      </Grid>
    </Box>
  );
};

export default ClaimableRewards;
