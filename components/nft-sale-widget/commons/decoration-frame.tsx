import { Image } from "@chakra-ui/react";

const DecorationFrame = ({ position }) => (
  <Image
    src="/decoration-frame.svg"
    alt={`${position.charAt(0).toUpperCase() + position.slice(1)} Decoration Frame`}
    position="absolute"
    {...{ [position]: { base: "10px", sm: "20px", md: "30px", lg: "40px" } }}
    top="50%"
    width={{ base: "40px", sm: "80px", md: "120px", lg: "160px" }}
    transform="translateY(-50%)"
    zIndex="0"
  />
);

export default DecorationFrame;
