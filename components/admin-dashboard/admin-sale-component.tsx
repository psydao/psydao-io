import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

export type Sale = {
  id: number;
  ceilingPrice: string;
  floorPrice: string;
  startDate: string;
  startTime: string;
};

type AdminSaleComponentProps = {
  index: number;
  sale: Sale;
  setSaleId: (index: number) => void;
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
      borderBottom="1px solid #F2BEBE"
      alignItems="center"
      onClick={() => {
        props.setOpenEditSale(true);
        props.setSaleId(props.sale.id);
      }}
    >
      <Flex gap={2} alignItems="center">
        <Box
          rounded="full"
          w={3}
          h={3}
          bg={
            new Date(props.sale.startDate).getTime() > new Date().getTime()
              ? "#269200"
              : "#E86969"
          }
        ></Box>
        <Text fontSize="18">Sale ({props.sale.id})</Text>
      </Flex>

      <Icon as={FaAngleRight} color="#F2BEBE" fontSize={{ base: 24, md: 24 }} />
    </Flex>
  );
};
export default AdminSaleComponent;
