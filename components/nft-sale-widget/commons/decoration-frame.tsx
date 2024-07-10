import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react";

interface DecorationFrameProps {
  position: "left" | "right";
  isFullScreen: boolean;
}

const DecorationFrame = ({ position, isFullScreen }: DecorationFrameProps) => {
  const imageUrl = useBreakpointValue({
    base: `/decoration-frame.png`,
    sm: isFullScreen ? `/decoration-frame-2.png` : "/decoration-frame.svg"
  });
  return (
    <Box w={"100%"} position={"relative"} h={{ base: "13px", sm: "100%" }}>
      <Image
        src={imageUrl}
        alt={`${position.charAt(0).toUpperCase() + position.slice(1)} Decoration Frame`}
        zIndex="0"
        objectFit={{ base: "contain", sm: "fill" }}
        w={"100%"}
        h={"100%"}
      />
    </Box>
  );
};

export default DecorationFrame;
