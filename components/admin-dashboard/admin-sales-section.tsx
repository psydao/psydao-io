import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { type AdminSale } from "@/lib/types";
import PsyButton from "../ui/psy-button";

type Sale = {
  ceilingPrice: string;
  floorPrice: string;
  startDate: string;
  startTime: string;
};

export const AdminSalesSection = ({
  setOpenCreateSale,
  openCreateSale
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateSale: boolean;
}) => {
  const { address } = useAccount();
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const storedSales = localStorage.getItem("createdSales");
    if (storedSales) {
      try {
        const parsedSales = JSON.parse(storedSales) as AdminSale[]; // Explicitly cast the parsed result
        setSales(parsedSales);
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
      }
    }
  }, [openCreateSale, setOpenCreateSale]);

  return (
    <Box textAlign="center" py={4} px={4}>
      <Flex
        justifyContent="center"
        gap={5}
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        {sales.length > 0
          ? sales.map((sale: Sale, index: number) => (
              <Flex
                key={index}
                width="100%"
                justifyContent="space-between"
                p={4}
                gap={4}
                borderBottom="1px"
                alignItems="center"
                borderColor="#F2BEBE"
                _notLast={{ borderBottomWidth: "1px" }}
              >
                <Flex gap={2} alignItems="center">
                  <Box
                    rounded="full"
                    w={3}
                    h={3}
                    bg={
                      new Date(sale.startDate).getTime() > new Date().getTime()
                        ? "#269200"
                        : "#E86969"
                    }
                  ></Box>
                  <Text fontSize="18">Sale ({index + 1})</Text>
                </Flex>

                <Icon
                  as={FaAngleRight}
                  color="#F2BEBE"
                  fontSize={{ base: 24, md: 24 }}
                />
              </Flex>
            ))
          : null}
        <Box mt={4} width="100%">
          <PsyButton
            customStyle={{ width: "100%" }}
            onClick={() => setOpenCreateSale(true)}
            isDisabled={!address}
          >
            Add a new sale
          </PsyButton>
        </Box>
      </Flex>
    </Box>
  );
};
