import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import { Head } from "components/head";
import { MotionBox } from "components/motion-box";
import linksPageData from "data/links-page-data.json";
import Link from "next/link";
import backgroundImage from "../public/links/background.png";
import logo from "../public/links/wordmark-purple-h.svg";

interface LinkSpec {
  color?: string;
  href: string;
  label: string;
  variant?: string;
}

const LinkPill = ({ color = "#9835BA", label, href, variant }: LinkSpec) => {
  let variantStyles = {};

  switch (variant) {
    case "special-fill":
      variantStyles = {
        background:
          "center / cover no-repeat url(/links/stars.png), linear-gradient(268.15deg, #B7FFFF 11.65%, #E69CFF 105.11%)",
        backgroundBlendMode: "screen, normal",
      };
      break;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <MotionBox
        border={`1px solid ${color}`}
        color={color}
        borderRadius="full"
        fontStyle="italic"
        fontSize="24px"
        lineHeight="36px"
        p="7px"
        textAlign="center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...variantStyles}
      >
        {label}
      </MotionBox>
    </a>
  );
};

const LinksPage = () => {
  const { subtitle, groups } = linksPageData;
  return (
    <>
      <Head />
      <Center
        position="absolute"
        top="0"
        left="0"
        minH="100vh"
        w="100vw"
        px={["2", "4"]}
      >
        <Image
          src={backgroundImage}
          alt=""
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: -1,
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Box
          maxW="450px"
          bg="#fffafa"
          pt="9"
          px={["4", "8"]}
          pb="14"
          my={["2", "4"]}
          borderRadius="lg"
        >
          <Link href="/">
            <a>
              <Image
                src={logo}
                alt=""
                style={{ maxWidth: 257, margin: "0 auto 26px" }}
              />
            </a>
          </Link>
          <Heading
            as="h2"
            fontStyle="italic"
            textAlign="center"
            fontSize="26px"
          >
            {subtitle}
          </Heading>
          <VStack align="stretch" gap="8" mt="8">
            {groups.map(
              ({ heading, description, links, color = "#9835BA" }) => {
                return (
                  <VStack
                    key={heading + JSON.stringify(links)}
                    align="stretch"
                    gap="3"
                  >
                    <div>
                      {heading && (
                        <Heading
                          as="h3"
                          fontStyle="italic"
                          fontSize="24px"
                          textAlign="center"
                          color={color}
                        >
                          {heading}
                        </Heading>
                      )}
                      {description && (
                        <Text
                          as="p"
                          fontStyle="italic"
                          fontSize="18px"
                          textAlign="center"
                          color={color}
                        >
                          {description}
                        </Text>
                      )}
                    </div>
                    {links.map((linkProps) => (
                      <LinkPill
                        key={JSON.stringify(linkProps)}
                        color={color}
                        {...linkProps}
                      />
                    ))}
                  </VStack>
                );
              }
            )}
          </VStack>
          <HStack justify="center" mt="14" gap="4" color="#E69CFF">
            <motion.a
              href="https://twitter.com/psy_dao"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ lineHeight: 0 }}
            >
              <Icon as={FaTwitter} boxSize="9" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/channel/UC8bjrtWOPuHdvMfZ3ScAI-Q"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ lineHeight: 0 }}
            >
              <Icon as={FaYoutube} boxSize="9" />
            </motion.a>
            <motion.a
              href="https://discord.gg/FJHQtBZYdp"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ lineHeight: 0 }}
            >
              <Icon as={FaDiscord} boxSize="9" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/psyDAO_"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ lineHeight: 0 }}
            >
              <Icon as={RiInstagramFill} boxSize="9" />
            </motion.a>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default LinksPage;
