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
import { Close, Open } from "components/window-manager";
import { MixpanelTracking } from "../services/mixpanel";
import TermsAndConditionsModal from "./modals/TsAndCs";
import { useState } from "react";

export const Menu = () => {
  const disclosure = useDisclosure();

  const [modalOpen, setModalOpen] = useState(false);

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
              <Box
                as="span"
                display="block"
                mr="3"
                onClick={() =>
                  MixpanelTracking.getInstance().menuLinkClicked("Manifesto")
                }
              >
                Manifesto
              </Box>
              <Logo />
            </MenuItem>
          </Open>
          <Link
            href="https://medium.com/@psyDAO"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem
              fontStyle="italic"
              onClick={() =>
                MixpanelTracking.getInstance().menuLinkClicked("Blog")
              }
            >
              Blog
            </MenuItem>
          </Link>
          <Open id="radio">
            <MenuItem
              fontStyle="italic"
              onClick={() =>
                MixpanelTracking.getInstance().menuLinkClicked("Radio")
              }
            >
              Radio
            </MenuItem>
          </Open>
          <Link
            href="https://research-application-form.vercel.app/PsyDAO"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem
              fontStyle="italic"
              onClick={() =>
                MixpanelTracking.getInstance().menuLinkClicked("Get_Funded")
              }
            >
              Get Funding for Research
            </MenuItem>
          </Link>
          <Link
            href="https://airtable.com/shrPp14v1pILFIBg3"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem
              fontStyle="italic"
              onClick={() =>
                MixpanelTracking.getInstance().menuLinkClicked(
                  "Alchemist_Grant"
                )
              }
            >
              Small Alchemist Grants
            </MenuItem>
          </Link>
          <Open id="newsletter">
            <MenuItem
              fontStyle="italic"
              onClick={() =>
                MixpanelTracking.getInstance().menuLinkClicked("Newsletter")
              }
            >
              Newsletter
            </MenuItem>
          </Open>
          <Link
            href="https://airtable.com/shrCaOD9DaD57J3Mu"
            target="_blank"
            _hover={{ textDecor: "none" }}
          >
            <MenuItem
              fontStyle="italic"
              onClick={() =>
                MixpanelTracking.getInstance().menuLinkClicked(
                  "Become_a_Contributor"
                )
              }
            >
              Become a Contributor
            </MenuItem>
          </Link>
          <Open id="swap">
            <MenuItem fontStyle="italic">Buy PSY</MenuItem>
          </Open>
          <Close id="swap">
            <MenuItem
              fontStyle="italic"
              onClick={() => setModalOpen((prev) => !prev)}
            >
              Terms and Conditions
            </MenuItem>
          </Close>
        </MenuList>
        <TermsAndConditionsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen((prev) => !prev)}
        />
      </ChakraMenu>
    </Box>
  );
};
