import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const statusDropdownContent = [
  {
    status: "active"
  },
  {
    status: "complete"
  },
  {
    status: "paused"
  }
];

const SaleStatusDropdown = () => {
  return (
    <Menu>
      <MenuButton p={"8px 16px"} bg={"#F2BEBE1A"} borderRadius={"18px"}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem></MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SaleStatusDropdown;
