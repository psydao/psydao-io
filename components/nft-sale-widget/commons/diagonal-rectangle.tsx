import { Image } from "@chakra-ui/react";

interface DiagonalRectangleProps {
  position: "left" | "right";
}
const DiagonalRectangle = ({ position }: DiagonalRectangleProps) => (
  <Image
    src="/diagonal-rectangle.svg"
    alt={`${position.charAt(0).toUpperCase() + position.slice(1)} Diagonal Rect`}
    position="absolute"
    {...{ [position]: "10px" }}
    zIndex="1"
    width="12px"
    height="12px"
  />
);

export default DiagonalRectangle;
