import { useAccount } from "wagmi";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { useSaleWidget } from "@/providers/SaleWidgetContext";
import { useQuery } from "@apollo/client";
import { type GetAllSalesWithTokensData } from "@/lib/types";
import { getAllSalesWithTokens } from "@/services/graph";

const NftSalesDropdown = () => {
  const { activeSale, setActiveSale } = useSaleWidget();

  const { data, loading } = useQuery<GetAllSalesWithTokensData>(
    getAllSalesWithTokens
  );
  const { address } = useAccount();

  return (
    <>
      {!loading && data && data.sales.length > 0 && (
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
            {activeSale && address
              ? `Batch ${activeSale.batchID}`
              : "Select Batch"}
          </MenuButton>
          <MenuList
            zIndex={10}
            fontFamily={"Inter Medium"}
            fontSize={"14px"}
            color={"#585858"}
          >
            {data.sales.map((sale) => (
              <MenuItem key={sale.id} onClick={() => setActiveSale(sale)}>
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
