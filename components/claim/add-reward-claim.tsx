import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Button, Input, Image, Grid } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";
import CreateClaimButton from "./claim-button";
import React, { useState } from "react";
import CustomDatePicker from "./date-time-input";

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
      p={{
        base: "3",
        md: "6"
      }}
    >
      {children}
    </Box>
  );
};

type Claim = {
  fromDate: Date | null;
  toDate: Date | null;
  claimDeadline: Date | null;
  amount: number;
};

const AddReward = () => {
  const { previousStep } = useWizard();
  const [claimInput, setClaimInput] = useState<Claim>({
    fromDate: null,
    toDate: null,
    claimDeadline: null,
    amount: 0
  });

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
          alignItems={"baseline"}
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
            as="h2"
            fontSize={{ base: "32px", sm: "40px" }}
            lineHeight={{ base: "32px", sm: "40px" }}
            color={"#269200"}
          >
            Add a new reward claim
          </Text>
        </Flex>
      </Flex>
      <Box overflow={"scroll"} paddingBottom={"90px"}>
        <Section>
          <Flex gap={3}>
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
          <Flex alignItems="center" justifyContent={"space-between"}>
            <Text>Participation period</Text>
            <Flex gap={4}>
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
          <Flex alignItems="center" justifyContent={"space-between"}>
            <Text>Claim deadline</Text>
            <CustomDatePicker
              label="Date"
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
            templateColumns={"1fr 2fr"}
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
                type="number"
                step={0.001}
                w={{ base: "100%" }}
                fontSize="18px"
                fontFamily={"Inter"}
                value={claimInput.amount}
                onChange={(e) => {
                  const valueAsNumber = parseFloat(e.target.value) || 0;
                  setClaimInput({
                    ...claimInput,
                    amount: valueAsNumber
                  });
                }}
                required
                border={"none"}
                focusBorderColor="transparent"
                onWheel={(e) => e.currentTarget.blur()}
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
          <CreateClaimButton
            handleClick={previousStep}
            fullWidth={true}
            buttonText={"Create"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddReward;
