import { Flex, Input, Text } from "@chakra-ui/react";
import ValueContainer from "./nft-id-container";
import { shortenAddress } from "./utils/shortenAddress";

type WhiteListedAddressesSectionProps = {
  setWhitelistedAddresses: React.Dispatch<React.SetStateAction<string>>;
  addressArray: string[];
};

const WhiteListedAddressesSection = (
  props: WhiteListedAddressesSectionProps
) => {
  console.log(props.addressArray);
  return (
    <Flex direction={"column"} gap={4} w={"100%"} alignItems={"start"} p={6}>
      <Text fontFamily={"Inter"} color={"black"} fontSize={18}>
        Whitelist
      </Text>
      <Input
        placeholder="Enter addresses here"
        fontSize={"22px"}
        color={"black"}
        _placeholder={{
          color: "#29314266",
          fontSize: "22px"
        }}
        onChange={(e) => props.setWhitelistedAddresses(e.target.value)}
        p={4}
        variant={"unstyled"}
        bg={"#FBF6F8"}
        borderRadius={"16px"}
        boxShadow={"2px 2px 4px 0px #0000001F inset"}
        required
      />
      <Flex gap={2} flexWrap={"wrap"}>
        {props.addressArray?.map((address, index) => {
          return (
            <ValueContainer
              key={index}
              value={shortenAddress(address)}
              isWhitelistedAddress
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default WhiteListedAddressesSection;
