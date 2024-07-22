import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { WhitepaperLink } from "../../commons/whitepaper-link";
import { PrivateSaleSwitch } from "../../commons/privatesale-switch";
import NftSaleTabs from "../nft-sale-tabs";
import { useTokenContext } from "@/providers/TokenContext";
import { Open } from "@/components/ui/window-manager";
import { useAccount } from "wagmi";
import { whitelistedAddresses } from "@/components/admin-dashboard/whitelisted-addresses";
import NftSalesDropdown from "../../commons/sales-dropdown";
import type { Sale } from "@/lib/types";
import type { SetStateAction } from "react";

const MintPsycHeader = (props: {
  activeSale: Sale | undefined;
  setActiveSale: React.Dispatch<SetStateAction<Sale | undefined>>;
}) => {
  // TODO: Hide toggle if user is not whitelisted
  const { tokenCount } = useTokenContext();

  const { address } = useAccount();

  const isWhitelisted = whitelistedAddresses.includes(address ?? "0x");

  return (
    <Box w={"100%"}>
      <Box px={{ base: 2, md: 4 }} py={2} position={"relative"}>
        <Flex justifyContent={"start"} direction={"column"} gap={"10px"}>
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
          <Flex gap={6}>
            <NftSalesDropdown
              activeSale={props.activeSale}
              setActiveSale={props.setActiveSale}
            />
            {isWhitelisted && <PrivateSaleSwitch />}
          </Flex>
        </Flex>
      </Box>
      <Divider h={"1px"} border={"none"} bg={"#E9BDBD"} width={"100%"} />
    </Box>
  );
};

export default MintPsycHeader;
