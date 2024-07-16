import { Flex, Input, Text, Tooltip } from "@chakra-ui/react";
import ValueContainer from "./value-container";
import { useState } from "react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

type WhiteListedAddressesSectionProps = {
  setWhitelistedAddresses: React.Dispatch<React.SetStateAction<string>>;
  addressArray: string[];
};

const WhiteListedAddressesSection = (
  props: WhiteListedAddressesSectionProps
) => {
  const [addressesToDisplay, setAddressesToDisplay] = useState<string[]>(
    props.addressArray
  );

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setWhitelistedAddresses(e.target.value);
  };

  return (
    <Flex direction={"column"} gap={4} w={"100%"} alignItems={"start"} p={6}>
      <Flex justifyContent={"start"} gap={1} alignItems={"center"}>
        <Text fontFamily={"Inter"} color={"black"} fontSize={18}>
          Whitelist
        </Text>
        <Tooltip
          cursor={"pointer"}
          label="If entering multiple addresses, please space them out as follows: 0x01, 0x02 etc."
          bg={"white"}
          color={"black"}
          rounded={"8px"}
          p={"4px 8px"}
          fontSize={16}
          fontFamily={"Inter"}
        >
          <QuestionOutlineIcon />
        </Tooltip>
      </Flex>
      <Input
        placeholder="Enter addresses here"
        fontSize={"22px"}
        color={"black"}
        _placeholder={{
          color: "#29314266",
          fontSize: "22px"
        }}
        onChange={handleAddressChange}
        p={4}
        variant={"unstyled"}
        bg={"#FBF6F8"}
        borderRadius={"16px"}
        boxShadow={"2px 2px 4px 0px #0000001F inset"}
      />
      <Flex gap={2} flexWrap={"wrap"}>
        {addressesToDisplay.map((address, index) => {
          return (
            <ValueContainer key={index} value={address} isWhitelistedAddress />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default WhiteListedAddressesSection;
