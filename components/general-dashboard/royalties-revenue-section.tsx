import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";

type RoyaltiesRevenueSectionProps = {
  revenue: string;
};

const RoyaltiesRevenueSection = ({ revenue }: RoyaltiesRevenueSectionProps) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      p={6}
      gap={4}
      borderY="1px"
      alignItems="center"
      borderColor="#F2BEBE"
    >
      <Text fontSize="18">Royalties revenue</Text>
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
        <Flex
          gap={2}
          position={"relative"}
          alignItems={"center"}
          // w={"100%"}
        >
          <Image
            src="/windows/swap/ETH.svg"
            alt={`ETH icon`}
            height={5}
            width={5}
          />
          <Button
            color={"#9835BA"}
            fontFamily={"Inter"}
            fontSize={{ base: 16, sm: 18 }}
          >
            Withdraw
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RoyaltiesRevenueSection;
