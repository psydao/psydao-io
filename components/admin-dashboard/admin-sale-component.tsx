import { useGetCurrentSaleValues } from "@/hooks/useGetCurrentSaleValues";
import { useResize } from "@/hooks/useResize";
import { getAddresses } from "@/lib/server-utils";
import { type Sale } from "@/lib/types";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

type AdminSaleComponentProps = {
  index: number;
  sale: Sale;
  setWhitelistedAddresses: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;
  setOpenEditSale: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
};

const AdminSaleComponent = (props: AdminSaleComponentProps) => {
  const onClickHandler = async () => {
    const whitelistedAddresses = await getAddresses(props.sale.ipfsHash);
    props.setWhitelistedAddresses(whitelistedAddresses);
    props.setSelectedSale(props.sale);
    props.setOpenEditSale(true);
  };

  const [isPaused, setIsPaused] = useState<boolean>(false);

  const { width } = useResize();

  const { saleBatches } = useGetCurrentSaleValues(props.sale.batchID, width);

  useEffect(() => {
    if (saleBatches) {
      setIsPaused(saleBatches[6]);
    }
  }, [saleBatches]);
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
        key={props.index}
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
            bg={props.isComplete ? "#999999" : isPaused ? "#E86969" : "#269200"}
          />
          <Text
            fontSize="18"
            color={props.isComplete ? "#727272" : "black"}
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
