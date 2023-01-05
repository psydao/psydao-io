import {
  Box,
  Icon,
  Link,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";

import { Logo } from "components/icons";
import { Open } from "components/window-manager";

export const Menu = () => {
  const disclosure = useDisclosure();
  return (
    <Box
      position="absolute"
      top="0"
      left="-2px"
      gridArea="1 / -5 / span 1 / -1"
      width="calc(100% + 2px)"
      zIndex={disclosure.isOpen ? 10 : "unset"}
    >
      <ChakraMenu {...disclosure} gutter={0} matchWidth={true}>
        <MenuButton
          fontSize="24px"
          fontStyle="italic"
          lineHeight="36px"
          color="#f2bebe"
          backgroundColor="#FFFAF9"
          width="100%"
          borderLeft="2px solid #f2bebe"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px="3"
            py="1"
          >
            <Box as="span">Menu</Box>
            {disclosure.isOpen ? (
              <Icon as={RiCloseLine} />
            ) : (
              <Icon as={RiMenuLine} />
            )}
          </Box>
        </MenuButton>
        <MenuList
          fontSize="24px"
          borderTop="2px solid #f2bebe"
          borderRight="2px solid #f2bebe"
          borderBottom="2px solid #f2bebe"
          borderLeft="2px solid #f2bebe"
          rounded="none"
          background="linear-gradient(180deg, #FFFFFF 0%, #F3FFE9 50.52%, #E7FEFF 100%)"
          p="0"
          width="calc(100% + 2px)"
          minWidth="0"
          boxShadow="0px 8px 12px rgba(152, 53, 186, 0.22)"
        >
          <Open id="manifesto">
            <MenuItem fontStyle="italic">
              <Box as="span" display="block" mr="3">
                Manifesto
              </Box>
              <Logo />
            </MenuItem>
          </Open>
          <Link
            href="https://mirror.xyz/0xB4962470651F204adD0c0B1F33688BE9f90c338A"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Blog</MenuItem>
          </Link>
          <Open id="radio">
            <MenuItem fontStyle="italic">Radio</MenuItem>
          </Open>
          <Link
            href="https://airtable.com/shrIwy0pCXfdXvvnu"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Get Funded</MenuItem>
          </Link>
          <Link
            href="https://airtable.com/shrgIF1554wmZ3ngh"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Alchemist Grant</MenuItem>
          </Link>
          <Open id="newsletter">
            <MenuItem fontStyle="italic">Newsletter</MenuItem>
          </Open>
          <Link
            href="https://airtable.com/shrCaOD9DaD57J3Mu"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Become a Contributor</MenuItem>
          </Link>
        </MenuList>
      </ChakraMenu>
    </Box>
  );
};
