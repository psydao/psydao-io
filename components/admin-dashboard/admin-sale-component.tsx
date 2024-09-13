import usePausedSale from "@/hooks/usePausedSale";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import { type Sale } from "@/lib/types";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { useGlobalContext } from "@/contexts/globalContext";
import { getSaleComplete } from "@/utils/getSaleComplete";

type AdminSaleComponentProps = {
  sale: Sale;
  setWhitelistedAddresses: React.Dispatch<React.SetStateAction<string[]>>;
};

const AdminSaleComponent = (props: AdminSaleComponentProps) => {
  const { setSelectedSale, setOpenEditSale } = useGlobalContext();
  const isComplete = getSaleComplete(props.sale);

  const { getAddresses } = useGetAddresses();
  const onClickHandler = async () => {
    const whitelistedAddresses = await getAddresses(props.sale.ipfsHash);
    props.setWhitelistedAddresses(whitelistedAddresses);
    setSelectedSale(props.sale);
    setOpenEditSale(true);
  };

  const { isPaused } = usePausedSale(props.sale.batchID);

  return (
    <button
      style={{
        height: "100%",
        width: "100%",
        cursor: "pointer"
      }}
      onClick={onClickHandler}
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        p={4}
        gap={4}
        alignItems="center"
      >
        <Flex gap={2} alignItems="center">
          <Box
            rounded="full"
            w={3}
            h={3}
            bg={isComplete ? "#999999" : isPaused ? "#E86969" : "#269200"}
          />
          <Text
            fontSize="18"
            color={isComplete ? "#727272" : "black"}
            fontFamily={"Inter Medium"}
          >
            Sale ({props.sale.batchID})
          </Text>
        </Flex>
        <Icon
          as={FaAngleRight}
          color="#F2BEBE"
          fontSize={{ base: 24, md: 24 }}
        />
      </Flex>
    </button>
  );
};
export default AdminSaleComponent;
