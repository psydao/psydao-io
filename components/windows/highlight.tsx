import { Box, Image, Link, Text } from "@chakra-ui/react";

import { Window } from "components/window";
import { MixpanelTracking } from "../../services/mixpanel";

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
          <Text mt="2">
            We&#39;re seeking early-stage, commercialisable projects to fund.
          </Text>
          <Text textColor="#269200" fontWeight="700" fontStyle="italic" mt="1">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSclWo6ALQ-atJtrE0CQ4ft-JmXWIkaRVpg0cTqhvfKOHLhSCQ/viewform"
              target="_blank"
              textDecor="underline"
              onClick={() =>
                MixpanelTracking.getInstance().applyTodayCtaClicked(
                  "Research_Project"
                )
              }
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
            Small Alchemist Grants
          </Text>
          <Text mt="2">
            Micro-grant ($100–$2K) program funding student & youth researchers,
            artists, and creators broadly in the field of psychedelics.
          </Text>
          <Text textColor="#269200" fontWeight="700" fontStyle="italic" mt="1">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSc3hj_RyIyh3qEkR9WMbx1PD0WAdz_lpm96eCCl60nuCujYpQ/viewform"
              target="_blank"
              textDecor="underline"
              onClick={() =>
                MixpanelTracking.getInstance().applyTodayCtaClicked(
                  "Microgrant"
                )
              }
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
