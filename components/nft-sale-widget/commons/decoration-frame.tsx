import { Image, useBreakpointValue } from "@chakra-ui/react";

interface DecorationFrameProps {
  position: "left" | "right";
}

const DecorationFrame = ({ position }: DecorationFrameProps) => {
  const positionValue = useBreakpointValue({
    base: "5%",
    sm: "10%",
    md: "15%",
    lg: "50%",
    xl: "70%"
  });

  const frameWidth = useBreakpointValue({
    base: "40px",
    sm: "80px",
    md: "120px",
    lg: "160px",
    xl: "170px"
  });

  return (
    <Image
      src="/decoration-frame.svg"
      alt={`${position.charAt(0).toUpperCase() + position.slice(1)} Decoration Frame`}
      position="absolute"
      {...{ [position]: positionValue }}
      top="50%"
      width={frameWidth}
      transform="translateY(-50%)"
      zIndex="0"
    />
  );
};

export default DecorationFrame;
