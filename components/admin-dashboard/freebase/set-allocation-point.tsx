import { Box, Flex, FormLabel, Input, Button } from "@chakra-ui/react"

interface SetAllocationPointProps {
  poolId: string
  allocPoint: string
  onPoolIdChange: (value: string) => void
  onAllocPointChange: (value: string) => void
  onSubmit: () => void
}

export default function SetAllocationPoint({
  poolId,
  allocPoint,
  onPoolIdChange,
  onAllocPointChange,
  onSubmit
}: SetAllocationPointProps) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={4}
      alignItems={{ base: "start", md: "center" }}
      justifyContent="space-between"
      w="100%"
      p={4}
      borderBottom="1px solid #F2BEBE"
    >
      <FormLabel
        fontSize="18"
        mb="0"
        fontFamily="Inter"
      >
        Pool Allocation Points
      </FormLabel>

      <Flex gap={4} alignItems="center">
        <Box
          display="flex"
          bg="#FBF6F8"
          alignItems="center"
          borderRadius="xl"
          boxShadow="inner"
          p="16px"
          gap={2}
        >
          <Input
            type="number"
            value={poolId}
            onChange={(e) => onPoolIdChange(e.target.value)}
            placeholder="Pool ID"
            w="100px"
            border="none"
            focusBorderColor="transparent"
            fontFamily="Inter"
          />
          <Input
            type="number"
            value={allocPoint}
            onChange={(e) => onAllocPointChange(e.target.value)}
            placeholder="Alloc Points"
            w="120px"
            border="none"
            focusBorderColor="transparent"
            fontFamily="Inter"
          />
        </Box>

        <Button
          onClick={onSubmit}
          bg="linear-gradient(90deg, #f3a6a6, #f77cc2)"
          color="black"
          borderRadius="20px"
          px={6}
          py={2}
          fontSize="16px"
          fontWeight="bold"
          _hover={{ opacity: 0.8 }}
        >
          Set
        </Button>
      </Flex>
    </Flex>
  )
}