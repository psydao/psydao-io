import React from "react";
import { Box, Flex, Skeleton, Grid, GridItem } from "@chakra-ui/react";

const SkeletonCardOwnedNft = () => {
  return (
    <Flex
      p={4}
      borderRadius={"21px"}
      border="1px solid #E9BDBD"
      w={"100%"}
      h={"100%"}
      direction={"column"}
      gap={4}
    >
      <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Skeleton height="24px" width="80px" borderRadius="full" />
        <Flex
          borderRadius={"30px"}
          border={"1px solid #EB7A7A73"}
          padding={"5px 16px 5px 8px"}
          gap={2.5}
        >
          <Skeleton height="24px" width="24px" borderRadius="full" />
        </Flex>
      </Flex>
      <Box
        w="100%"
        h={"208px"}
        borderRadius={"20px"}
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
      >
        <Skeleton height="100%" width="100%" />
      </Box>
      <Grid
        w={"100%"}
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={4}
      >
        <GridItem w={"100%"}>
          <Skeleton height="40px" width="100%" borderRadius="full" />
        </GridItem>
        <GridItem w={"100%"}>
          <Skeleton height="40px" width="100%" borderRadius="full" />
        </GridItem>
      </Grid>
    </Flex>
  );
};

const SkeletonCardWide = () => {
  return (
    <Box w="100%" maxW="500px" mx="auto" mb={6}>
      <Box
        w="100%"
        h="195px"
        borderRadius="15px"
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
      >
        <Skeleton height="100%" width="100%" />
      </Box>
      <Flex justifyContent="center" w="100%" mt={4}>
        <Box
          w="170px"
          h="40px"
          borderRadius="20px"
          overflow="hidden"
          position="relative"
          border="1px solid #e2e2e2"
          boxShadow="md"
        >
          <Skeleton height="100%" width="100%" />
        </Box>
      </Flex>
    </Box>
  );
};

const SkeletonCardSpecific = () => {
  return (
    <Flex maxW="170px" w="100%" direction="column" gap={4} alignItems="center">
      <Box
        w="100%"
        h="208px"
        borderRadius="20px"
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
      >
        <Skeleton height="100%" width="100%" />
      </Box>
      <Box
        w="100%"
        h="40px"
        borderRadius="20px"
        overflow="hidden"
        position="relative"
        border="1px solid #e2e2e2"
        boxShadow="md"
      >
        <Skeleton height="100%" width="100%" />
      </Box>
    </Flex>
  );
};

const SkeletonLayout = ({
  isRandom,
  isOwnedNft
}: {
  isRandom?: boolean;
  isOwnedNft?: boolean;
}) => {
  return (
    <Box textAlign="center">
      {isOwnedNft ? (
        <SkeletonCardOwnedNft />
      ) : isRandom ? (
        <SkeletonCardWide />
      ) : (
        <Grid
          templateColumns={{
            base: "minmax(170px, 1fr)",
            sm: "repeat(auto-fit, minmax(170px, 1fr))"
          }}
          gap={6}
          justifyItems="center"
          maxW="100%"
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonCardSpecific key={idx} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SkeletonLayout;
