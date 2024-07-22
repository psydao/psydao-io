import { type GetAllSalesWithTokensData, type Sale } from "@/lib/types";
import { getAllSalesWithTokens } from "@/services/graph";
import { useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

type NftSalesDropdownProps = {
  setActiveSale: (sale: Sale) => void;
  activeSale: Sale | undefined;
};

const NftSalesDropdown = (props: NftSalesDropdownProps) => {
  const { data, loading } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );

  return (
    <>
      {!loading && data && (
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
            {props.activeSale
              ? `Batch ${props.activeSale.batchID}`
              : "Select Batch"}
          </MenuButton>
          <MenuList
            zIndex={10}
            fontFamily={"Inter Medium"}
            fontSize={"14px"}
            color={"#585858"}
          >
            {data.sales.map((sale) => {
              return (
                <MenuItem
                  key={sale.id}
                  onClick={() => props.setActiveSale(sale)}
                >
                  Batch {sale.batchID}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default NftSalesDropdown;
