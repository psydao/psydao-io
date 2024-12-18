import { Box, Flex, FormLabel, Input, Button } from "@chakra-ui/react"

interface SetRewardPerBlockProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export default function SetRewardPerBlock({ value, onChange, onSubmit }: SetRewardPerBlockProps) {
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
        Reward Per Block
      </FormLabel>

      <Flex gap={4} alignItems="center">
        <Box
          display="flex"
          bg="#FBF6F8"
          alignItems="center"
          borderRadius="xl"
          boxShadow="inner"
          p="16px"
        >
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter amount"
            w={{ base: "100%", md: "200px" }}
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
          Update
        </Button>
      </Flex>
    </Flex>
  )
}