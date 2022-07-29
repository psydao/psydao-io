import type { BoxProps } from "@chakra-ui/react";
import { Box, keyframes, Text } from "@chakra-ui/react";

import { useDimensions } from "lib/hooks";

const scroll = keyframes`
  0% {transform: translateX(0%);}
  100% {transform: translateX(-50%)}
`;

interface MarqueeProps extends Omit<BoxProps, "children"> {
  label: string;
}

export const Marquee = ({ label, ...rest }: MarqueeProps) => {
  const { contentBox, ref } = useDimensions();
  const time = label.length / 3;
  return (
    <Box
      ref={ref}
      h="100%"
      w="100%"
      display="flex"
      alignItems="center"
      overflow="hidden"
      {...rest}
    >
      {contentBox && (
        <Box
          position="relative"
          top={`${contentBox.height * 0.04}px`}
          flex="0 0 auto"
          whiteSpace="nowrap"
          fontFamily="'GrandSlang Roman'"
          textTransform="uppercase"
          sx={{ wordSpacing: "0.2em", letterSpacing: "3px" }}
          color="#f2bebe"
          animation={`${time}s linear infinite ${scroll}`}
          fontSize={`${contentBox.height}px`}
          lineHeight={`${contentBox.height}px`}
        >
          <Text as="span" pl="0.3em" pr="3em">
            {label}
          </Text>
          <Text as="span" pl="0.3em" pr="3em">
            {label}
          </Text>
        </Box>
      )}
    </Box>
  );
};
