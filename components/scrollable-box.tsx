import { Box, BoxProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { useSize } from "lib/hooks";

export const ScrollableBox = ({ children, ...rest }: BoxProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [showTrack, setShowTrack] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(50);

  // This is just triggering re-render on resize for now
  useSize();

  useEffect(() => {
    const content = contentRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (content && content.scrollHeight > content.clientHeight) {
      setShowTrack(true);
    } else {
      setShowTrack(false);
    }

    if (content && thumb && track) {
      setThumbHeight(
        Math.max(
          20,
          (content.clientHeight / content.scrollHeight) * track.clientHeight
        )
      );
    }

    const handleScroll = () => {
      if (content && thumb && track) {
        const scrollRatio = Math.max(
          0,
          Math.min(
            content.scrollTop / (content.scrollHeight - content.clientHeight),
            1
          )
        );
        const maxScroll = track.clientHeight - thumb.clientHeight;
        thumb.style.transform = `translateY(${maxScroll * scrollRatio}px)`;
      }
    };

    content?.addEventListener("scroll", handleScroll);
    return () => {
      content?.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Box display="flex" h="100%" w="100%" {...rest}>
      <Box
        ref={contentRef}
        flex="1 1 auto"
        overflow="auto"
        overscrollBehavior="none"
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { height: "0px", width: "0px" },
        }}
      >
        {children}
      </Box>
      {showTrack && (
        <Box
          ref={trackRef}
          position="relative"
          flex="0 0 auto"
          overflow="hidden"
          sx={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { height: "0px", width: "0px" },
          }}
        >
          <Box
            ref={thumbRef}
            h={`${thumbHeight}px`}
            w="5px"
            background="#f2bebe"
            borderRadius="full"
            margin="0 auto"
          />
        </Box>
      )}
    </Box>
  );
};
