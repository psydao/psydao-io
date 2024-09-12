import { useGlobalContext } from "@/contexts/globalContext";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";

const EditSaleHeader = () => {
  const { setSelectedSale, selectedSale, setOpenEditSale } = useGlobalContext();

  if (!selectedSale) {
    return null;
  }

  const onBackClick = () => {
    setSelectedSale(undefined);
    setOpenEditSale(false);
  };

  return (
    <Box px={{ base: 2, md: 4 }} py={2}>
      <Flex
        alignItems={{ base: "start", md: "center" }}
        flexWrap={"wrap"}
        gap={2}
      >
        <Box
          onClick={onBackClick}
          display="flex"
          alignItems="center"
          gap="1"
          cursor="pointer"
        >
          <ArrowBackIcon h={6} w={6} color="#F2BEBE" />
        </Box>
        <Text
          textColor="#269200"
          fontWeight="500"
          fontSize={{ base: "20px", sm: "40px" }}
          lineHeight={{ base: "20px", sm: "40px" }}
          fontFamily={"Amiri"}
        >
          {`Edit Sale (${selectedSale.id})`}
        </Text>
      </Flex>
    </Box>
  );
};

export default EditSaleHeader;
