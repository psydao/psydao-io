import { CalendarIcon, ChevronDownIcon, TimeIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";

type DateTimeInputProps = {
  focusedDate?: boolean | undefined;
  setFocusedDate?: Dispatch<SetStateAction<boolean>>;
  focusedTime?: boolean | undefined;
  setFocusedTime?: Dispatch<SetStateAction<boolean>>;
  setStartTime?: Dispatch<SetStateAction<string>>;
  setStartDate?: Dispatch<SetStateAction<string>>;
  timeInputType?: string;
  setTimeInputType?: Dispatch<SetStateAction<string>>;
  inputType: "date" | "time";
};

const DateTimeInput = (props: DateTimeInputProps) => {
  const inputType = props.focusedDate ? "date" : "text";
  return (
    <InputGroup
      cursor={"pointer"}
      borderColor="#E6E6E6"
      alignItems="center"
      border="1px solid #E6E6E6"
      borderRadius={"18px"}
      gap={1}
      w={{ base: "100%", md: "fit-content" }}
      minW={"187px"}
      fontFamily={"Inter Medium"}
      paddingX={2}
      fontSize={{ base: 12, md: 14 }}
      _hover={{ textDecoration: "none" }}
    >
      {inputType === "text" && props.inputType === "date" ? (
        <InputLeftElement>
          <CalendarIcon color="#F2BEBE" height={6} w={6} />
        </InputLeftElement>
      ) : props.timeInputType === "text" ? (
        <InputLeftElement>
          <TimeIcon color="#F2BEBE" h={6} w={6} />
        </InputLeftElement>
      ) : null}
      <Input
        placeholder={props.inputType === "date" ? "Date" : "Time"}
        type={props.inputType === "date" ? inputType : props.timeInputType}
        id={props.inputType}
        cursor={"pointer"}
        w={"100%"}
        maxW={{ base: "100%", md: "170px" }}
        onFocus={() => {
          if (props.inputType === "date") {
            if (props.setFocusedDate) {
              props.setFocusedDate(true);
            }
          } else {
            if (props.setTimeInputType && props.setFocusedTime) {
              props.setTimeInputType("time");
              props.setFocusedTime(true);
            }
          }
        }}
        onChange={(e) => {
          if (props.inputType === "date") {
            if (props.setStartDate) {
              props.setStartDate(e.target.value);
            }
          } else {
            if (props.setStartTime) {
              props.setStartTime(e.target.value);
            }
          }
        }}
        _placeholder={{
          color: "black"
        }}
        _focus={{ border: "none" }}
        focusBorderColor="transparent"
        border="none"
        required
      />
      {inputType === "text" && props.inputType === "date" && (
        <ChevronDownIcon color={"black"} />
      )}
      {props.timeInputType === "text" && props.inputType === "time" && (
        <ChevronDownIcon color={"black"} />
      )}
    </InputGroup>
  );
};

export default DateTimeInput;
