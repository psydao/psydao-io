import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import DiagonalRectangle from "../nft-sale-widget/commons/diagonal-rectangle";
import PsyButton from "../psy-button";

const AdminDashboardEmptyState = ({
  setOpenCreateSale
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <GridItem>
      <Flex direction={"column"} gap={7}>
        <Box
          p={6}
          display={"inline-flex"}
          position={"relative"}
          borderRadius={"30px"}
          border={"2px solid #F2BEBE73"}
          gap={2.5}
          flexDirection={"column"}
          alignItems={"center"}
          height={"fit-content"}
          width={"fit-content"}
        >
          <Box>
            <Image src={"/psy-logo.svg"} />
          </Box>
          <Flex flexWrap={"nowrap"} gap={4} alignItems={"center"}>
            <DiagonalRectangle position="left" />
            <Text
              fontSize={18}
              color={"black"}
              lineHeight={"26px"}
              textAlign={"center"}
            >
              There are no sales added yet <br /> Start by adding your first
              sale{" "}
            </Text>
            <DiagonalRectangle position="right" />
          </Flex>
        </Box>
        <PsyButton
          onClick={() => {
            setOpenCreateSale(true);
          }}
          customStyle={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 14
          }}
        >
          Add a new Sale
        </PsyButton>
      </Flex>
    </GridItem>
  );
};
export default AdminDashboardEmptyState;
