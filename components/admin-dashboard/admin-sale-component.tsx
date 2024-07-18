import { type Sale } from "@/lib/types";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

type AdminSaleComponentProps = {
  index: number;
  sale: Sale;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminSaleComponent = (props: AdminSaleComponentProps) => {
  return (
    <Flex
      key={props.index}
      width="100%"
      justifyContent="space-between"
      p={4}
      gap={4}
      alignItems="center"
      onClick={() => {
        props.setSelectedSale(props.sale);
        props.setOpenEditSale(true);
      }}
    >
      <Flex gap={2} alignItems="center">
        <Box rounded="full" w={3} h={3} bg={"#269200"} />
        <Text fontSize="18">Sale ({props.sale.batchID})</Text>
      </Flex>

      <Icon as={FaAngleRight} color="#F2BEBE" fontSize={{ base: 24, md: 24 }} />
    </Flex>
  );
};
export default AdminSaleComponent;
