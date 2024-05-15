import { Fragment } from "react";
import { Box, type BoxProps, keyframes, Text } from "@chakra-ui/react";

import { Logo } from "@/components/icons";
import { useDimensions } from "@/lib/hooks";

const scroll = keyframes`
  0% {transform: translateX(0%);}
  100% {transform: translateX(-50%)}
`;

interface MarqueeProps extends Omit<BoxProps, "children"> {
  text: string | string[];
}

export const Marquee = ({ text, ...rest }: MarqueeProps) => {
  const { contentBox, ref } = useDimensions();

  let time;
  if (Array.isArray(text)) {
    time = text.join(" * ").length / 3;
  } else {
    time = text.length / 3;
  }

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
          {Array.isArray(text) ? (
            <Box display="inline-flex">
              <Box display="inline-flex" pl="10" gap="10" alignItems="center">
                {text.map((cur) => (
                  <Fragment key={cur}>
                    <Text>{cur}</Text>
                    <Logo boxSize="0.6em" />
                  </Fragment>
                ))}
              </Box>
              <Box display="inline-flex" pl="10" gap="10" alignItems="center">
                {text.map((cur) => (
                  <Fragment key={cur}>
                    <Text>{cur}</Text>
                    <Logo boxSize="0.6em" />
                  </Fragment>
                ))}
              </Box>
            </Box>
          ) : (
            <>
              <Text as="span" pl="0.3em" pr="3em">
                {text}
              </Text>
              <Text as="span" pl="0.3em" pr="3em">
                {text}
              </Text>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
