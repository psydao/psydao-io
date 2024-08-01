import useGetOnlyWhitelistedSales from "@/hooks/useGetOnlyWhitelistedSales";
import { type GetAllSalesWithTokensData, type Sale } from "@/lib/types";
import { getAllSalesWithTokens } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useAccount } from "wagmi";

type NftSalesDropdownProps = {
  setActiveSale: (sale: Sale) => void;
  activeSale: Sale | undefined;
  isOriginal: boolean;
};

const NftSalesDropdown = (props: NftSalesDropdownProps) => {
  const { data, loading } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );

  const { address } = useAccount();

  const { whitelistedSales, loading: whitelistedSalesLoading } =
    useGetOnlyWhitelistedSales(address);

  const displayedSales = props.isOriginal
    ? whitelistedSales
    : data?.sales ?? [];

  return (
    <>
      {!loading &&
        data &&
        displayedSales.length > 0 &&
        !whitelistedSalesLoading && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant={"unstyled"}
              display={"flex"}
              alignItems={"center"}
              fontFamily={"Inter Medium"}
              fontSize={"14px"}
              fontWeight={500}
              color={"#585858"}
              border={"1px solid #E9BDBD"}
              borderRadius={"8px"}
              p={"8px 16px"}
            >
              {props.activeSale && address
                ? `Batch ${props.activeSale.batchID}`
                : "Select Batch"}
            </MenuButton>
            <MenuList
              zIndex={10}
              fontFamily={"Inter Medium"}
              fontSize={"14px"}
              color={"#585858"}
            >
              {displayedSales.map((sale) => (
                <MenuItem
                  key={sale.id}
                  onClick={() => props.setActiveSale(sale)}
                >
                  Batch {sale.batchID}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
    </>
  );
};

export default NftSalesDropdown;
