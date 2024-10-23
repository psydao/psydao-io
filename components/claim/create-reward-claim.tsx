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
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { useResize } from "@/hooks/useResize";
import useGetAvailableAllowance from "@/hooks/useGetAvailableAllowance";

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
  const { width } = useResize();
  const [loading, setLoading] = useState(false);
  const [claimDeadlineAsString, setClaimDeadlineAsString] = useState("");
  const { showCustomErrorToast, showSuccessToast } = useCustomToasts();
  const [claimsAllowance, setClaimsAllowance] = useState("");
  const {
    allowance,
    error: allowanceError,
    loading: allowanceLoading,
    refetch: refetchAvailableAllowance
  } = useGetAvailableAllowance();

  const [claimInput, setClaimInput] = useState<Claim>({
    fromDate: null,
    toDate: null,
    claimDeadline: null,
    amount: ""
  });
  const [minDate, setMinDate] = useState<Date | null>(null);

  const {
    minimumClaimDeadline,
    isSuccess,
    refetch,
    error: minimumClaimError
  } = useGetMinimumClaimDeadline();

  useEffect(() => {
    if (minimumClaimError) {
      showCustomErrorToast("Could not fetch minimum claim deadline.", width);
      return;
    }
    // Added this additional check because it yelled at me otherwise :(
    // If you think it'll cause problems or isn't needed, please lmk! :)
    if (claimInput.fromDate && minimumClaimDeadline) {
      const minimumClaimDeadlineMs =
        parseInt(minimumClaimDeadline.toString()) * 1000;

      const calculatedMinDate = new Date(
        claimInput.fromDate.getTime() + minimumClaimDeadlineMs
      );
      setMinDate(calculatedMinDate);
    }
  }, [claimInput.fromDate, minimumClaimDeadline, minimumClaimError, isSuccess]);

  const {
    approve,
    data,
    error: approveError,
    txError,
    approvedSuccess,
    isSuccess: approveTxSuccess,
    isFetching: approvePsyFetching,
    isPending: approvePsyPending
  } = useApprovePsy(parseUnits(claimInput.amount.toString(), 18));

  const { data: psyPerBatch, isError, isLoading, isFetched } = usePsyPerBatch();

  useMemo(() => {
    // Added this additional check because it threw me out without it :(
    if (isFetched && psyPerBatch) {
      setClaimInput({
        ...claimInput,
        amount: formatUnits(psyPerBatch as bigint, 18)
      });
    }

    if (!allowanceError && !allowanceLoading) {
      setClaimsAllowance(formatUnits(allowance, 18).toString());
    }
  }, [isFetched, psyPerBatch, allowanceError, allowanceLoading]);

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
          startTimeStamp: startTimeStamp,
          endTimeStamp: endTimeStamp,
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
    const currentDateTimeStamp = new Date().getTime();

    // This is messy. I will turn this into a util function or something.

    if (!startTimeStamp) {
      showCustomErrorToast("Start timestamp missing.", width);
      setLoading(false);
      return;
    } else if (!endTimeStamp) {
      showCustomErrorToast("End timestamp missing.", width);
      setLoading(false);
      return;
    } else if (endTimeStamp < startTimeStamp) {
      showCustomErrorToast("End date before start date", width);
      setLoading(false);
      return;
    } else if (
      startTimeStamp < currentDateTimeStamp ||
      endTimeStamp < currentDateTimeStamp
    ) {
      showCustomErrorToast(
        "Cannot use a past date for the claim time period.",
        width
      );
      setLoading(false);
      return;
    } else if (
      minDate &&
      claimInput.claimDeadline &&
      minDate.getTime() > claimInput.claimDeadline.getTime()
    ) {
      showCustomErrorToast(
        "The selected deadline is too close to the beginning of the claim period.",
        width
      );
      setLoading(false);
      return;
    } else if (!totalAmountOfTokens) {
      showCustomErrorToast("Total amount of tokens missing.", width);
      setLoading(false);
      return;
    }

    const start = startTimeStamp / 1000;
    const end = endTimeStamp / 1000;

    const { data, error } = await fetchDistributionData(
      // the problem lies here with dynamic values: merkleroot is not returned
      // startTimeStamp,
      // endTimeStamp,
      1723932000,
      1726005600,
      totalAmountOfTokens
    );

    if (error) {
      showCustomErrorToast("Error creating distribution data", width);
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
      showCustomErrorToast("Error creating new claimable batch", width);
      console.error("Error creating new claimable batch:", error);
    } finally {
      setLoading(false);
    }
  }, [createNewClaimableBatch, claimInput, claimDeadlineAsString]);

  useEffect(() => {
    if (approveError) {
      showCustomErrorToast("Error approving claimable funds", width);
      setLoading(false);
      return;
    }

    if (isConfirmed) {
      showSuccessToast("Successfully created new claimable batch.", width);
      setLoading(false);
      return;
    }

    if (error) {
      showCustomErrorToast(error.message, width);
      setLoading(false);
      return;
    }

    if (approvedSuccess && approveTxSuccess) {
      showSuccessToast("Successfully approved claimable funds.", width);
      setLoading(false);
      refetchAvailableAllowance();
      return;
    }
  }, [approveError, approvedSuccess, isConfirmed, error]);

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
        >
          {parseFloat(claimsAllowance) < parseFloat(claimInput.amount) ? (
            <CreateClaimButton
              isLoading={approvePsyFetching || approvePsyPending}
              loadingText={"Approving..."}
              handleClick={approve}
              fullWidth={true}
              buttonText={allowanceLoading ? "Please wait..." : "Approve"}
            />
          ) : (
            <CreateClaimButton
              isLoading={loading}
              loadingText={"Creating..."}
              handleClick={handleDistributionProcess}
              fullWidth={true}
              buttonText={allowanceLoading ? "Please wait..." : "Create"}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRewardClaim;
