import type { BoxProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

interface YoutubeEmbed extends Omit<BoxProps, "children"> {
  embedId: string;
}

export const YoutubeEmbed = ({ embedId, ...rest }: YoutubeEmbed) => (
  // <Box overflow="hidden" pb="56.25%" pos="relative" h="0" {...rest}>
  <Box overflow="hidden" h="100%" w="100%" position="relative" {...rest}>
    <Box
      as="iframe"
      pos="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      src={`https://www.youtube-nocookie.com/embed/${embedId}?modestbranding=1&rel=0`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube"
    />
  </Box>
);
