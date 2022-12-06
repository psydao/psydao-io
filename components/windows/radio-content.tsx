import { Box, Image, Text } from "@chakra-ui/react";

export const RadioContent = () => {
  return (
    <Box p="4">
      <Text
        as="h1"
        fontSize="36px"
        fontStyle="italic"
        lineHeight="100%"
        mt="3"
        textColor="#269200"
      >
        PsyDAO Radio
      </Text>
      <Text mt="3" textColor="#269200">
        Psychedelic journeys and soothing sounds curated by the community.
      </Text>
      <Box
        mt="3"
        display="grid"
        gap="3"
        gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        gridAutoRows="1fr"
      >
        {new Array(5).fill(null).map((_cur, idx) => (
          <Box key={idx} display="grid" fontSize="24px">
            <Image
              src="/psydao-seo-image.png"
              alt=""
              gridArea="1 / 1 / 2 / 2"
              objectFit="cover"
              height="100%"
              width="100%"
            />
            <Box h="0" pb="100%" gridArea="1 / 1 / 2 / 2"></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// <iframe
//   style={{ borderRadius: "12px" }}
//   src="https://open.spotify.com/embed/playlist/0i5lwTl23fDlSMy1qfRS1t?utm_source=generator"
//   width="100%"
//   height="380"
//   frameBorder="0"
//   allowFullScreen={false}
//   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//   loading="lazy"
// />
