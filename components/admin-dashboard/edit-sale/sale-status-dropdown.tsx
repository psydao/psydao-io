import { useGetCurrentSaleValues } from "@/hooks/useGetCurrentSaleValues";
import { useResize } from "@/hooks/useResize";
import type { Sale } from "@/lib/types";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Status {
  status: "Active" | "Paused";
  color: string;
  paused: boolean;
}

const statusDropdownContent: Status[] = [
  {
    status: "Active",
    color: "#269200",
    paused: false
  },
  {
    status: "Paused",
    color: "#E86969",
    paused: true
  }
];

const CustomSVG = (props: { color: string }) => {
  return (
    <Box color={props.color} h={3} w={3}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="6" fill="currentColor" />
      </svg>
    </Box>
  );
};

const SaleStatusDropdown = (props: {
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  sale: Sale | undefined;
}) => {
  const { width } = useResize();
  const [id, setId] = useState<string>("");

  const { saleBatches } = useGetCurrentSaleValues(id, width);
  const [currentValue, setCurrentValue] = useState<Status>({
    status: "Active",
    color: "#269200",
    paused: false
  });

  useEffect(() => {
    if (saleBatches) {
      props.setIsPaused(saleBatches[6]);
      setCurrentValue(
        saleBatches[6]
          ? {
              status: "Paused",
              color: "#E86969",
              paused: true
            }
          : {
              status: "Active",
              color: "#269200",
              paused: false
            }
      );
    }

    if (props.sale) {
      setId(props.sale.batchID);
    }
  }, [saleBatches, props.sale]);

  return (
    <Menu closeOnSelect>
      {({ isOpen }) => (
        <>
          <MenuButton
            p={"8px 16px"}
            bg={"#F2BEBE1A"}
            borderRadius={"18px"}
            fontFamily={"Inter"}
            fontWeight={"bold"}
            fontSize={18}
            type="button"
          >
            <Flex alignItems={"center"} gap={2}>
              <CustomSVG color={currentValue.color} />
              {currentValue.status}
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
          </MenuButton>
          <MenuList>
            {statusDropdownContent.map((entry, index) => {
              return (
                <MenuItem
                  key={index}
                  fontFamily={"Inter"}
                  display={"flex"}
                  fontSize={18}
                  gap={2}
                  onClick={() => {
                    setCurrentValue(entry);
                    props.setIsPaused(entry.paused);
                  }}
                >
                  <CustomSVG color={entry.color} />
                  {entry.status}
                </MenuItem>
              );
            })}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SaleStatusDropdown;
