import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Flex, Show, Switch, Text, Tooltip } from "@chakra-ui/react";
import type { SetStateAction } from "react";

interface SaleTypeSwitchProps {
  isOriginal: boolean;
  setIsOriginal: React.Dispatch<SetStateAction<boolean>>;
}

export const SaleTypeSwitch = ({
  isOriginal,
  setIsOriginal
}: SaleTypeSwitchProps) => {
  return (
    <Flex alignItems={"center"} gap={2} mb={1}>
      <Switch
        isChecked={isOriginal}
        onChange={() => setIsOriginal((prev) => !prev)}
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
        fontFamily={"Inter Medium"}
        fontSize={{ base: 12, md: 14 }}
        color={"#585858"}
      >
        Original Sale
      </Text>
      <Tooltip
        label={
          isOriginal ? (
            <Text>
              Toggle to view{" "}
              <Show breakpoint="(max-width: 480px)">
                <br />
              </Show>{" "}
              NFT copies
            </Text>
          ) : (
            <Text>
              Toggle to view{" "}
              <Show breakpoint="(max-width: 480px)">
                <br />
              </Show>{" "}
              original NFTs
            </Text>
          )
        }
        placement="bottom"
        hasArrow
        borderRadius={"8px"}
        color={"#585858"}
        bg={"#F9F9FA"}
        p={"8px 16px"}
        fontFamily={"Inter Medium"}
      >
        <InfoOutlineIcon color={"#585858"} h={"14px"} w={"14px"} />
      </Tooltip>
    </Flex>
  );
};
