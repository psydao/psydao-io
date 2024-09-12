import { Skeleton, Box } from "@chakra-ui/react";

const SkeletonLoader = () => (
  <Box w="100%" h="200px">
    <Skeleton height="20px" />
    <Skeleton height="20px" mt={4} />
    <Skeleton height="20px" mt={4} />
  </Box>
);

export default SkeletonLoader;
