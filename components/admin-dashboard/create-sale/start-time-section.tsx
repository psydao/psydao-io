import { Flex, Text } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";

import DateTimeInput from "./date-time-input";

type SaleStartTimeSectionProps = {
  focusedTime: boolean | undefined;
  setFocusedTime: Dispatch<SetStateAction<boolean>>;
  focusedDate: boolean | undefined;
  setFocusedDate: Dispatch<SetStateAction<boolean>>;
  setStartTime: Dispatch<SetStateAction<string>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  timeInputType: string;
  setTimeInputType: Dispatch<SetStateAction<string>>;
};

const SaleStartTimeSection = (props: SaleStartTimeSectionProps) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      p={6}
      gap={4}
      borderY="1px"
      alignItems={{ base: "start", md: "center" }}
      borderColor="#F2BEBE"
      direction={{ base: "column", md: "row" }}
      textAlign={"center"}
    >
      <Text fontSize="18" fontFamily={"Inter"}>
        Sale start time
      </Text>
      <Flex gap={2} flexWrap="wrap">
        <DateTimeInput
          focusedDate={props.focusedDate}
          setFocusedDate={
            props.setFocusedDate
              ? props.setFocusedDate
              : () => {
                  console.error("setFocusedDate not defined");
                }
          }
          inputType="date"
          setStartDate={props.setStartDate}
        />
        <DateTimeInput
          focusedTime={props.focusedTime}
          setFocusedTime={
            props.setFocusedTime
              ? props.setFocusedTime
              : () => {
                  console.error("setFocusedTime not defined");
                }
          }
          inputType="time"
          setStartTime={props.setStartTime}
          setTimeInputType={props.setTimeInputType}
          timeInputType={props.timeInputType}
        />
      </Flex>
    </Flex>
  );
};

export default SaleStartTimeSection;
