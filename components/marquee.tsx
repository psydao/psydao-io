import type { FlexProps } from "@chakra-ui/react";
import { Box, Flex, keyframes, Text } from "@chakra-ui/react";
import * as React from "react";

const scroll = keyframes`
  0% {transform: translateX(0%);}
  100% {transform: translateX(-50%)}
`;

const useHeight = (target: React.RefObject<HTMLElement | null>) => {
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    if (target.current !== null) {
      const observer = new ResizeObserver((entries) =>
        setHeight(entries[0].contentBoxSize[0].blockSize)
      );
      observer.observe(target.current);
    }
  }, [target]);

  return height;
};

interface MarqueeProps extends Omit<FlexProps, "children"> {
  label: string;
}

export const Marquee = ({ label, ...rest }: MarqueeProps) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const height = Math.trunc(useHeight(parentRef));
  const time = label.length / 3;
  return (
    <Flex
      ref={parentRef}
      h="100%"
      w="100%"
      fontFamily="'GrandSlang Roman'"
      textTransform="uppercase"
      fontSize={`${height}px`}
      lineHeight={`${height}px`}
      alignItems="center"
      overflow="hidden"
      sx={{ wordSpacing: "0.2em" }}
      color="#f2bebe"
      {...rest}
    >
      <Box
        position="relative"
        top={`${height * 0.04}px`}
        flex="0 0 auto"
        whiteSpace="nowrap"
        animation={`${time}s linear infinite ${scroll}`}
      >
        <Text as="span" pl="0.3em" pr="3em">
          {label}
        </Text>
        <Text as="span" pl="0.3em" pr="3em">
          {label}
        </Text>
      </Box>
    </Flex>
  );
};
