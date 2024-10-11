import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { WhitepaperLink } from "../../common/whitepaper-link";
import { SaleTypeSwitch } from "../../common/sale-type-switch";
import NftSalesDropdown from "../../common/sales-dropdown";
import { whitelistedAddresses } from "@/components/admin-dashboard/whitelisted-addresses";
import NftSaleTabs from "../nft-sale-tabs";

import { useTokenContext } from "@/providers/TokenContext";
import { Open } from "@/components/ui/window-manager";

const MintPsycHeader = () => {
  const { tokenCount } = useTokenContext();
  const { address } = useAccount();

  const isWhitelisted = whitelistedAddresses.includes(address ?? "0x");

  return (
    <Box w={"100%"}>
      <Box px={{ base: 2, md: 4 }} pb={2} position={"relative"}>
        <Flex justifyContent={"start"} direction={"column"} gap={"6px"}>
          <Flex
            alignItems={{ base: "start", md: "center" }}
            justifyContent={"space-between"}
            gap={2}
            flexWrap={"wrap-reverse"}
          >
            <NftSaleTabs numberOfOwnedNfts={tokenCount} />
            <Flex
              alignItems={"center"}
              gap={3}
              direction={{ base: "row-reverse", sm: "row" }}
            >
              {isWhitelisted && (
                <Open id="admin-dashboard">
                  <Text
                    fontFamily={"Inter Medium"}
                    fontSize={14}
                    color={"#AF52DE"}
                    cursor={"pointer"}
                    whiteSpace={"nowrap"}
                  >
                    Admin Dashboard
                  </Text>
                </Open>
              )}
              <WhitepaperLink />
            </Flex>
          </Flex>
          <Flex gap={6} flexWrap={"wrap"}>
            <NftSalesDropdown />
            <SaleTypeSwitch />
          </Flex>
        </Flex>
      </Box>
      <Divider h={"1px"} border={"none"} bg={"#E9BDBD"} width={"100%"} />
    </Box>
  );
};

export default MintPsycHeader;
