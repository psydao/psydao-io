import React from "react";
import { Box, Flex, Skeleton, Grid } from "@chakra-ui/react";

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

const SkeletonLayout = ({ isRandom }: { isRandom?: boolean }) => {
  return (
    <Box textAlign="center">
      {isRandom ? (
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
