import { Flex, Switch, Text, Tooltip } from "@chakra-ui/react"
import { InfoOutlineIcon } from "@chakra-ui/icons"

interface AdminSwitchProps {
  isTokenManagement: boolean
  setIsTokenManagement: (value: boolean) => void
}

export function AdminSwitch({ isTokenManagement, setIsTokenManagement }: AdminSwitchProps) {
  return (
    <Flex alignItems="center" gap={2} mb={1}>
      <Switch
        isChecked={isTokenManagement}
        onChange={(e) => setIsTokenManagement(e.target.checked)}
        sx={{
          "span.chakra-switch__track:not([data-checked])": {
            backgroundColor: "#E9E9EA"
          },
          "span.chakra-switch__track": {
            backgroundColor: "#AF52DE"
          }
        }}
      />
      <Text
        fontFamily="Inter Medium"
        fontSize={{ base: 12, md: 14 }}
        color="#585858"
      >
        Token Management
      </Text>
      <Tooltip
        label={
          <Text>
            Toggle to view {isTokenManagement ? "reward configuration" : "token management"}
          </Text>
        }
        placement="bottom"
        hasArrow
        borderRadius="8px"
        color="#585858"
        bg="#F9F9FA"
        p="8px 16px"
        fontFamily="Inter Medium"
      >
        <InfoOutlineIcon color="#585858" h="14px" w="14px" />
      </Tooltip>
    </Flex>
  )
}