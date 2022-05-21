import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

interface YoutubeEmbed extends Omit<BoxProps, "children"> {
  embedId: string;
}

// .video-responsive {
//   overflow: hidden;
//   padding-bottom: 56.25%;
//   position: relative;
//   height: 0;
// }

// .video-responsive iframe {
//   left: 0;
//   top: 0;
//   height: 100%;
//   width: 100%;
//   position: absolute;
// }

export const YoutubeEmbed = ({ embedId, ...rest }: YoutubeEmbed) => (
  <Box overflow="hidden" pb="56.25%" pos="relative" h="0" {...rest}>
    <Box
      as="iframe"
      pos="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Box>
);
