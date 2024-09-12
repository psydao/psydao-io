import { keyframes } from "@chakra-ui/react";

export const fadeIn = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeInAnimation = `${fadeIn} infinite 6s`;
