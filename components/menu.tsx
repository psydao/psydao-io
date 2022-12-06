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

import { Item } from "components/item";
import { Manifesto } from "components/manifesto";
import { AlchemistGrantContent } from "components/windows/alchemist-grant-content";
import { RadioContent } from "components/windows/radio-content";

export const Menu = () => {
  const disclosure = useDisclosure();
  return (
    <Box
      position="absolute"
      top="0"
      gridArea="1 / -5 / span 1 / -1"
      width="100%"
    >
      <ChakraMenu {...disclosure} gutter={0} matchWidth={true}>
        <MenuButton
          fontSize="24px"
          fontStyle="italic"
          lineHeight="36px"
          color="#f2bebe"
          backgroundColor="#FFFAF9"
          width="100%"
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
          borderLeft="none"
          rounded="none"
          background="linear-gradient(180deg, #FFFFFF 0%, #F3FFE9 50.52%, #E7FEFF 100%)"
          p="0"
          width="calc(100% + 2px)"
          minWidth="0"
        >
          <Manifesto />
          <Link
            href="https://mirror.xyz/0xB4962470651F204adD0c0B1F33688BE9f90c338A"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Blog</MenuItem>
          </Link>
          <Item id="alchemist-grant">
            <Item.Icon>
              <MenuItem fontStyle="italic">Radio</MenuItem>
            </Item.Icon>
            <Item.Window
              height="95%"
              maxHeight="570px"
              minHeight="350px"
              width="95%"
              maxWidth="440px"
              minWidth="240px"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Item.Window.TitleBar />
              <Item.Window.Content p="0">
                <RadioContent />
              </Item.Window.Content>
            </Item.Window>
          </Item>
          <Link
            href="https://airtable.com/shrIwy0pCXfdXvvnu"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Get Funded</MenuItem>
          </Link>
          <Item id="alchemist-grant">
            <Item.Icon>
              <MenuItem fontStyle="italic">Alchemist Grant</MenuItem>
            </Item.Icon>
            <Item.Window
              height="95%"
              maxHeight="510px"
              minHeight="350px"
              width="95%"
              maxWidth="345px"
              minWidth="240px"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Item.Window.TitleBar />
              <Item.Window.Content p="0">
                <AlchemistGrantContent />
              </Item.Window.Content>
            </Item.Window>
          </Item>
          <Link
            href="https://www.getrevue.co/profile/psydao"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem fontStyle="italic">Newsletter</MenuItem>
          </Link>
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
