import React, { useState } from "react";
import { format, addMonths, subMonths, startOfDay } from "date-fns";
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Grid,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon
} from "@chakra-ui/icons";

const generateCalendar = (currentMonth: Date): (Date | null)[][] => {
  const startOfWeek = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const calendar: (Date | null)[][] = [];

  let dayCount = 1 - startOfWeek;
  for (let week = 0; week < 6; week++) {
    const weekRow: (Date | null)[] = [];
    for (let day = 0; day < 7; day++) {
      if (dayCount > 0 && dayCount <= daysInMonth) {
        weekRow.push(
          new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            dayCount
          )
        );
      } else {
        weekRow.push(null);
      }
      dayCount++;
    }
    calendar.push(weekRow);
  }

  return calendar;
};

interface CustomDatePickerProps {
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  minDate?: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selectedDate,
  setSelectedDate,
  minDate 
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const minimumDate = minDate ? startOfDay(minDate) : startOfDay(new Date());

  const handleDateClick = (date: Date) => {
    // if (isBefore(date, minimumDate)) return; 
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const calendar = generateCalendar(currentMonth);

  return (
    <Box maxW={"180px"} w={"auto"}>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PopoverTrigger>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CalendarIcon color="#F2BEBE" />}
            />
            <Input
              borderRadius={"18px"}
              w={"200px"}
              py={3}
              px={4}
              onClick={() => setIsOpen(!isOpen)}
              placeholder={label}
              value={selectedDate ? format(selectedDate, "MM/dd/yyyy") : ""}
              readOnly
            />
            <InputRightElement
              pointerEvents="none"
              children={
                <Icon
                  as={ChevronDownIcon}
                  transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                  transition="transform 0.2s"
                />
              }
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent zIndex={20}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Box
              mb={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              fontSize={"12px"}
            >
              <IconButton
                size={"sm"}
                aria-label="Previous month"
                icon={<ChevronLeftIcon />}
                onClick={handlePreviousMonth}
              />
              <Box fontWeight={600}>{format(currentMonth, "MMMM yyyy")}</Box>
              <IconButton
                size={"sm"}
                aria-label="Next month"
                icon={<ChevronRightIcon />}
                onClick={handleNextMonth}
              />
            </Box>
            <Grid templateColumns="repeat(7, 1fr)" gap={1} fontSize={"10px"}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <Box key={day} textAlign="center" fontWeight={600}>
                  {day}
                </Box>
              ))}
              {calendar.map((week, index) =>
                week.map((date, dayIndex) => {
                  // const isDisabled = !date || isBefore(date, minimumDate);
                  return (
                    <Button
                      key={`${index}-${dayIndex}`}
                      size="xs"
                      variant="outline"
                      fontSize={"10px"}
                      onClick={() => date && handleDateClick(date)}
                      // isDisabled={isDisabled}
                      // sx={{
                      //   bg: isDisabled ? "gray.200" : "white",
                      //   cursor: isDisabled ? "not-allowed" : "pointer",
                      //   _hover: isDisabled
                      //     ? { bg: "gray.200" }
                      //     : { bg: "blue.100" },
                      // }}
                    >
                      {date ? format(date, "d") : ""}
                    </Button>
                  );
                })
              )}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CustomDatePicker;
