import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Button, Input, Image, Grid } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";
import CreateClaimButton from "./claim-button";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomDatePicker from "./custom-date-picker";
import { useCreateNewClaimableBatch } from "@/services/web3/useCreateNewClaimableBatch";
import { useGetMinimumClaimDeadline } from "@/services/web3/useGetMinimumClaimDeadline";
import { getDeadlineTimeStamp } from "@/utils/getDeadlineTimeStamp";
import { useApprovePsy } from "@/services/web3/useApprovePsy";
import { formatUnits, parseUnits } from "viem";
import { usePsyPerBatch } from "@/services/web3/usePsyPerBatch";

// ester: this file is quite hefty. If you want to refactor if, go ahead !

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      borderBottom={"1px solid #E9BDBD"}
      fontSize={{
        base: "16px",
        md: "18px"
      }}
      fontFamily={"Inter Medium"}
      fontWeight={"400"}
      p={"6"}
    >
      {children}
    </Box>
  );
};

type Claim = {
  fromDate: Date | null;
  toDate: Date | null;
  claimDeadline: Date | null;
  amount: string;
};

const CreateRewardClaim = () => {
  const { previousStep } = useWizard();
  const [loading, setLoading] = useState(false);
  const [claimDeadlineAsString, setClaimDeadlineAsString] = useState("");
  // ester: if the user has not selected fromDate, toDate, or claimDeadline we should display an error message
  // amount is taken from contract thus not editable
  const [claimInput, setClaimInput] = useState<Claim>({
    fromDate: null,
    toDate: null,
    claimDeadline: null,
    amount: ""
  });
  const [minDate, setMinDate] = useState<Date | null>(null);

  const { minimumClaimDeadline, isSuccess, refetch } =
    useGetMinimumClaimDeadline();

  useEffect(() => {
    if (claimInput.fromDate) {
      const minimumClaimDeadlineMs =
        parseInt(minimumClaimDeadline.toString()) * 1000;

        const calculatedMinDate = new Date(
        claimInput.fromDate.getTime() + minimumClaimDeadlineMs
      );

      setMinDate(calculatedMinDate);
    }
  }, [claimInput.fromDate, minimumClaimDeadline]);

  const {
    approve,
    data,
    error: approveError,
    txError
  } = useApprovePsy(parseUnits(claimInput.amount.toString(), 18));

  const { data: psyPerBatch, isError, isLoading, isFetched } = usePsyPerBatch();

  useMemo(() => {
    if (isFetched) {
      setClaimInput({
        ...claimInput,
        amount: formatUnits(psyPerBatch as bigint, 18)
      });
    }
  }, [isFetched]);

  useEffect(() => {
    const claimDeadline = getDeadlineTimeStamp(
      claimInput.fromDate?.getTime() as number,
      minimumClaimDeadline?.toString()
    );
    setClaimDeadlineAsString(claimDeadline);
  }, [claimInput.fromDate]);

  const {
    createNewClaimableBatch,
    isConfirmed,
    isConfirming,
    isPending,
    error
  } = useCreateNewClaimableBatch();

  const fetchDistributionData = async (
    startTimeStamp: number,
    endTimeStamp: number,
    totalAmountOfTokens: string
  ): Promise<{
    data?: { merkleRoot: string; ipfsHash: string };
    error?: any;
  }> => {
    try {
      const response = await fetch("/api/distribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startTimeStamp: startTimeStamp / 1000,
          endTimeStamp: endTimeStamp / 1000,
          totalAmountOfTokens: totalAmountOfTokens.toString()
        })
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Error:", result.error);
        return { error: result.error };
      }

      const result = await response.json();
      console.log("Merkle Tree:", result);
      return { data: result };
    } catch (error) {
      console.error("Error calling API:", error);
      return { error };
    }
  };

  const handleDistributionProcess = useCallback(async () => {
    setLoading(true);

    const startTimeStamp = claimInput.fromDate?.getTime();
    const endTimeStamp = claimInput.toDate?.getTime();
    const totalAmountOfTokens = claimInput.amount;

    if (!startTimeStamp || !endTimeStamp || !totalAmountOfTokens) {
      setLoading(false);
      return;
    }

    const { data, error } = await fetchDistributionData(
      startTimeStamp,
      endTimeStamp,
      totalAmountOfTokens
    );

    if (error) {
      setLoading(false);
      return;
    }

    try {
      console.log("Calling createNewClaimableBatch");
      await createNewClaimableBatch(
        data?.merkleRoot as string,
        claimDeadlineAsString,
        data?.ipfsHash as string
      );
    } catch (error) {
      console.error("Error creating new claimable batch:", error);
    } finally {
      setLoading(false);
    }
  }, [createNewClaimableBatch, claimInput, claimDeadlineAsString]);

  return (
    <Box height={"100%"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E9BDBD"}
      >
        <Flex
          width={"100%"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          direction={"row"}
          gap={1.5}
          py={6}
        >
          <Button
            onClick={previousStep}
            bg={"none"}
            _hover={{
              background: "none"
            }}
          >
            <ArrowBackIcon h={6} w={6} color={"#F2BEBE"} />
          </Button>
          <Text
            px={2}
            as="h2"
            fontSize={{ base: "24px", sm: "40px" }}
            fontStyle={{
              base: "italic",
              sm: "normal"
            }}
            lineHeight={{ base: "24px", sm: "40px" }}
            color={"#269200"}
          >
            Add a new reward claim
          </Text>
        </Flex>
      </Flex>
      <Box overflow={"scroll"} paddingBottom={"90px"}>
        <Section>
          <Flex
            gap={3}
            direction={{
              sm: "column",
              md: "row"
            }}
          >
            <Image width={6} src="/icons/alert-triangle.svg" />
            <Text color={"#E9B15B"}>
              Please note that once claim rewards are launched, there will be no
              option to modify or update them.
            </Text>
          </Flex>
        </Section>
        <Section>
          <Text>
            Rewards for DAO members who participate in proposal voting
          </Text>
        </Section>
        <Section>
          <Flex
            alignItems={{
              sm: "start",
              md: "center"
            }}
            wrap={"wrap"}
            gap={4}
            direction={{
              sm: "column",
              md: "row"
            }}
            justifyContent={"space-between"}
          >
            <Text>Participation period</Text>
            <Flex
              gap={4}
              wrap={"wrap"}
              direction={{
                sm: "column",
                md: "row"
              }}
            >
              <CustomDatePicker
                label="From"
                selectedDate={claimInput.fromDate}
                setSelectedDate={(date) =>
                  setClaimInput({
                    ...claimInput,
                    fromDate: date
                  })
                }
              />
              <CustomDatePicker
                label="To"
                selectedDate={claimInput.toDate}
                setSelectedDate={(date) =>
                  setClaimInput({
                    ...claimInput,
                    toDate: date
                  })
                }
              />
            </Flex>
          </Flex>
        </Section>
        <Section>
          <Flex
            alignItems={{
              sm: "start",
              md: "center"
            }}
            wrap={"wrap"}
            gap={4}
            direction={{
              sm: "column",
              md: "row"
            }}
            justifyContent={"space-between"}
          >
            <Text>Claim deadline</Text>
            <CustomDatePicker
              label="Date"
              minDate={minDate || undefined} 
              selectedDate={claimInput.claimDeadline}
              setSelectedDate={(deadline) =>
                setClaimInput({
                  ...claimInput,
                  claimDeadline: deadline
                })
              }
            />
          </Flex>
        </Section>
        <Section>
          <Grid
            alignItems="center"
            justifyContent={"space-between"}
            gap={4}
            templateColumns={{
              base: "1fr",
              md: "1fr 2fr"
            }}
          >
            <Text>Amount</Text>
            <Box
              display="flex"
              bg="#FBF6F8"
              alignItems="center"
              borderRadius="xl"
              boxShadow="inner"
              justifyContent={"space-between"}
              gap={{ base: 1, sm: 4 }}
              p="16px"
              w={{ base: "100%", md: "auto" }}
            >
              <Input
                disabled
                type="number"
                w={{ base: "100%" }}
                fontSize="18px"
                fontFamily={"Inter"}
                value={claimInput.amount}
                border={"none"}
              />
              <Flex
                alignItems={"center"}
                gap={2}
                borderRadius={"18px"}
                p={"8px 16px"}
              >
                <Box minW={"20px"} borderRadius={"100%"} bg={"white"}>
                  <Image
                    src="/purple-logo.svg"
                    width={5}
                    height={5}
                    alt="PSY icon"
                  />
                </Box>
                <Text fontSize={14} fontWeight="600" fontFamily={"Poppins"}>
                  PSY
                </Text>
              </Flex>
            </Box>
          </Grid>
        </Section>
        <Box
          position={"fixed"}
          bottom={0}
          w={"100%"}
          boxShadow={"0px -2px 25.6px 0px rgba(0, 0, 0, 0.25)"}
          p={6}
          background="#fffafa"
          // ester: you can remove these styles below when fixing approval flow logic
          display={"flex"}
          justifyContent={"space-between"}
        >
          {/* ester: show approve button if they've not approved the amount yet */}
          {/* this amount can be seen from calling allowance view function */}
          {/* and compare that to the amount being sent */}
          <CreateClaimButton
            isLoading={loading}
            loadingText={"Creating..."}
            handleClick={approve}
            fullWidth={true}
            buttonText={"Approve"}
          />
          <CreateClaimButton
            isLoading={loading}
            loadingText={"Creating..."}
            handleClick={handleDistributionProcess}
            fullWidth={true}
            buttonText={"Create"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRewardClaim;
