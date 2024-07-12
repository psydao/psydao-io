import { Flex, Icon, Input, Text } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";

type SaleStartTimeSectionProps = {
  focused: boolean | undefined;
  setFocused: Dispatch<SetStateAction<boolean>>;
  setStartTime: Dispatch<SetStateAction<string>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  timeInputType: string;
  setTimeInputType: Dispatch<SetStateAction<string>>;
};

const SaleStartTimeSection = (props: SaleStartTimeSectionProps) => {
  const inputType = props.focused ? "date" : "text";
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      p={6}
      gap={4}
      borderY="1px"
      alignItems="center"
      borderColor="#F2BEBE"
    >
      <Text fontSize="18" fontFamily={"Inter"}>
        Sale start time
      </Text>
      <Flex gap={2} flexWrap="wrap">
        <Flex
          cursor={"pointer"}
          borderColor="#E6E6E6"
          alignItems="center"
          border="1px"
          borderRadius={"18px"}
          gap={1}
          fontFamily={"Inter Medium"}
          paddingX={2}
          fontSize={{ base: 12, md: 14 }}
          _hover={{ textDecoration: "none" }}
        >
          {inputType === "text" ? (
            <Icon
              as={FaRegCalendarCheck}
              color="#F2BEBE"
              fontSize={{ base: 24, md: 24 }}
            />
          ) : null}

          <Input
            placeholder="Date"
            type={inputType}
            id="date"
            onFocus={() => props.setFocused(true)}
            onChange={(e) => props.setStartDate(e.target.value)}
            outline="0"
            _focus={{ border: "none" }}
            maxWidth="170px"
            border="none"
            required
          />
        </Flex>

        <Flex
          cursor={"pointer"}
          borderColor="#E6E6E6"
          alignItems="center"
          paddingX={2}
          border="1px"
          borderRadius={"18px"}
          gap={1}
          fontFamily={"Inter Medium"}
          fontSize={{ base: 12, md: 14 }}
          _hover={{ textDecoration: "none" }}
        >
          {props.timeInputType === "text" ? (
            <Icon
              as={RiTimeLine}
              color="#F2BEBE"
              fontSize={{ base: 24, md: 24 }}
            />
          ) : null}

          <Input
            type={props.timeInputType}
            placeholder="Time"
            id="time"
            onFocus={() => props.setTimeInputType("time")}
            outline="0"
            _focus={{ border: "none" }}
            onChange={(e) => props.setStartTime(e.target.value)}
            maxWidth="170px"
            border="none"
            required
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SaleStartTimeSection;
