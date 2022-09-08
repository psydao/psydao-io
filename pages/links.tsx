import {
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  VStack,
} from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import { Pill } from "components/pill";
// TODO fix missing links
import { LogoStacked } from "components/icons";
import linksPageData from "data/links-page-data.json";

const LinksPage = () => {
  const { subtitle, groups } = linksPageData;
  return (
    <Container>
      <LogoStacked
        width="150px"
        display="block"
        mx="auto"
        my="8"
        color="#f2bebe"
      />
      <Heading as="h2" color="#f2bebe" fontStyle="italic" textAlign="center">
        {subtitle}
      </Heading>
      <Divider border="2px" my="8" borderColor="#f2bebe" />
      <VStack align="stretch" gap="8">
        {groups.map(({ heading, links }) => {
          return (
            <VStack key={heading} align="stretch" gap="4">
              <Heading as="h3" color="#f2bebe" fontStyle="italic">
                {heading}
              </Heading>
              {links.map(({ label, href }) => (
                <a
                  key={label + href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Pill>{label}</Pill>
                </a>
              ))}
            </VStack>
          );
        })}
      </VStack>
      <HStack justify="center" my="16" gap="4">
        <Link
          href="https://twitter.com/psy_dao"
          target="_blank"
          color="#f2bebe"
          lineHeight="0"
          _hover={{
            color: "#a4ffff",
          }}
          transition="all 200ms ease"
        >
          <Icon as={FaTwitter} boxSize="10" />
        </Link>
        <Link
          href="https://discord.gg/hUH4MWxVFx"
          target="_blank"
          color="#f2bebe"
          lineHeight="0"
          _hover={{
            color: "#E69CFF",
          }}
          transition="all 200ms ease"
        >
          <Icon as={FaDiscord} boxSize="10" />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UC8bjrtWOPuHdvMfZ3ScAI-Q"
          target="_blank"
          color="#f2bebe"
          lineHeight="0"
          _hover={{
            color: "#dc4e4e",
          }}
          transition="all 200ms ease"
        >
          <Icon as={FaYoutube} boxSize="10" />
        </Link>
        <Link
          href="https://www.instagram.com/psyDAO_"
          target="_blank"
          color="#f2bebe"
          lineHeight="0"
          _hover={{
            color: "#405de6",
          }}
          transition="all 200ms ease"
        >
          <Icon as={RiInstagramFill} boxSize="10" />
        </Link>
      </HStack>
    </Container>
  );
};

export default LinksPage;
