import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import WithdrawalModal from "../modals/withdrawal-modal";

type RoyaltiesRevenueSectionProps = {
  revenue: string;
};

const RoyaltiesRevenueSection = ({ revenue }: RoyaltiesRevenueSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Flex
        width="100%"
        justifyContent="space-between"
        p={6}
        gap={4}
        borderY="1px"
        alignItems="center"
        borderColor="#F2BEBE"
      >
        <Text fontSize="18">Royalties Revenue</Text>
        <Box
          display="flex"
          bg="#FBF6F8"
          alignItems="center"
          borderRadius="xl"
          boxShadow="inner"
          gap={1}
          p="16px"
        >
          <Text color={"#000000E5"} fontFamily={"Inter"} fontSize={"22px"}>
            {revenue}
          </Text>
          <Flex gap={2} position={"relative"} alignItems={"center"}>
            <Image
              src="/windows/swap/ETH.svg"
              alt={`ETH icon`}
              height={5}
              width={5}
            />
            <Button
              fontFamily={"Inter"}
              fontSize={{ base: 16, sm: 18 }}
              onClick={openModal}
              textColor="purple"
            >
              Withdraw
            </Button>
          </Flex>
        </Box>
      </Flex>
      <WithdrawalModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default RoyaltiesRevenueSection;
