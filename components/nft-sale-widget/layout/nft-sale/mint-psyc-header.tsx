import { Box, Divider, Flex } from "@chakra-ui/react";
import { WhitepaperLink } from "../../commons/whitepaper-link";
import { PrivateSaleSwitch } from "../../commons/privatesale-switch";
import NftSaleTabs from "../nft-sale-tabs";
import { useTokenContext } from "@/providers/TokenContext";

const MintPsycHeader = () => {
  // TODO: Hide toggle if user is not whitelisted
  const IS_WHITELISTED = true;
  const { tokenCount } = useTokenContext();

  return (
    <Box w={"100%"}>
      <Box px={{ base: 2, md: 4 }} py={2} position={"relative"}>
        <Flex justifyContent={"start"} direction={"column"} gap={"10px"}>
          <Flex
            alignItems={{ base: "start", md: "center" }}
            justifyContent={"space-evenly"}
            gap={2}
            flexWrap={"wrap-reverse"}
          >
            <NftSaleTabs numberOfOwnedNfts={tokenCount} />
            <WhitepaperLink />
          </Flex>
          {IS_WHITELISTED && <PrivateSaleSwitch />}
        </Flex>
      </Box>
      <Divider h={"1px"} border={"none"} bg={"#E9BDBD"} width={"100%"} />
    </Box>
  );
};

export default MintPsycHeader;
