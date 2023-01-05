import { Box, Image, Link, Text } from "@chakra-ui/react";

import { Window } from "components/window";

export const Highlight = () => {
  return (
    <Window
      id="highlight"
      defaultIsOpen={true}
      height="80%"
      maxHeight="540px"
      minHeight="350px"
      width="95%"
      maxWidth="360px"
      minWidth="240px"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Window.TitleBar />
      <Window.Content p="0">
        <Box p="4" pb="8">
          <Image src="/windows/alchemist/hero.png" alt="" margin="0 auto" />
          <Text
            as="h1"
            fontSize="36px"
            fontStyle="italic"
            lineHeight="100%"
            mt="6"
          >
            APPLY TODAY!
          </Text>
          <Text
            as="h2"
            fontSize="28px"
            fontStyle="italic"
            lineHeight="100%"
            mt="8"
          >
            Research Project Funding
          </Text>
          <Text mt="2">We&#39;re seeking early-stage projects to fund.</Text>
          <Text textColor="#269200" fontWeight="700" fontStyle="italic" mt="1">
            <Link
              href="https://airtable.com/shrIwy0pCXfdXvvnu"
              target="_blank"
              textDecor="underline"
            >
              Apply
            </Link>
          </Text>
          <Text
            as="h2"
            fontSize="28px"
            fontStyle="italic"
            lineHeight="100%"
            mt="8"
          >
            Alchemist Grants now open!
          </Text>
          <Text mt="2">
            Micro-grant ($100–$3K) program funding student & youth researchers,
            artists, and creators broadly in the field of psychedelics.
          </Text>
          <Text textColor="#269200" fontWeight="700" fontStyle="italic" mt="1">
            <Link
              href="https://airtable.com/shrgIF1554wmZ3ngh"
              target="_blank"
              textDecor="underline"
            >
              Apply
            </Link>
          </Text>
        </Box>
        <Image
          src="/windows/alchemist/clouds.png"
          alt=""
          position="absolute"
          right="0"
          bottom="0"
          zIndex="-1"
          filter="blur(12px)"
        />
      </Window.Content>
    </Window>
  );
};
