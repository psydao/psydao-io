import { Box, Image } from "@chakra-ui/react";
import type { BoxProps, ImageProps } from "@chakra-ui/react";

interface ColorizedImageProps extends Omit<BoxProps, "children"> {
  tone: string;
  imageProps?: ImageProps;
  src: string;
}

export const ColorizedImage = ({
  tone,
  imageProps,
  src,
  ...rest
}: ColorizedImageProps) => {
  return (
    <Box position="relative" {...rest}>
      <Image
        alt=""
        src={src}
        filter="contrast(1.7) saturate(0)"
        {...imageProps}
      />
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        backgroundColor={tone}
        mixBlendMode="screen"
      />
    </Box>
  );
};
