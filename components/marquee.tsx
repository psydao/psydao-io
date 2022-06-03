import { Flex, keyframes, Text } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import * as React from "react";

const scroll = keyframes`
  0% {transform: translateX(0%);}
  100% {transform: translateX(-100%)}
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
  const height = `${Math.trunc(useHeight(parentRef) * 0.8)}px`;
  const time = label.length / 3;
  return (
    <Flex
      ref={parentRef}
      h="100%"
      w="100%"
      fontSize={height}
      lineHeight={height}
      alignItems="center"
      overflow="hidden"
      {...rest}
    >
      <Text
        as="span"
        pl="0.3em"
        pr="3em"
        flex="0 0 auto"
        animation={`${time}s linear infinite ${scroll}`}
      >
        {label}
      </Text>
      <Text
        as="span"
        pl="0.3em"
        pr="3em"
        flex="0 0 auto"
        animation={`${time}s linear infinite ${scroll}`}
      >
        {label}
      </Text>
    </Flex>
  );
};
