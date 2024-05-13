import { Box, useBreakpointValue, type BoxProps } from "@chakra-ui/react";

import { Window } from "@/components/window";

interface YoutubeProps extends Omit<BoxProps, "children"> {
  embedId?: string;
}

export const Youtube = ({ embedId = "OFIO5LJ8sP8", ...rest }: YoutubeProps) => {
  const borderWidth = 2;
  const windowHeight = useBreakpointValue({
    base: 180,
    sm: 250,
    md: 360,
    lg: 500
  });
  const titleHeight = 30;

  if (windowHeight && titleHeight) {
    const width = ((windowHeight - titleHeight - 2 * borderWidth) * 16) / 9;

    return (
      <Window
        id="youtube"
        height={windowHeight}
        minHeight="180px"
        width={width}
        minWidth="180px"
        maxWidth="1000px"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        lockAspectRatio={16 / 9}
        lockAspectRatioExtraHeight={titleHeight + 2 * borderWidth}
      >
        <Window.TitleBar hasBorder />
        <Window.Content p="0">
          <Box
            overflow="hidden"
            h="100%"
            w="100%"
            position="relative"
            {...rest}
          >
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
        </Window.Content>
      </Window>
    );
  }

  return null;
};
