import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

export const CloseIcon = (props: Omit<BoxProps, "children">) => {
  return (
    <Box
      as="svg"
      viewBox="-21 -21 42 42"
      height="100%"
      stroke="#f2bebe"
      strokeWidth="6"
      strokeLinecap="round"
      maxWidth="1rem"
      filter="blur(2px)"
      _hover={{ filter: "none", strokeWidth: "2" }}
      cursor="pointer"
      {...props}
    >
      <line x1="-18" y1="-18" x2="18" y2="18" />
      <line x1="-18" y1="18" x2="18" y2="-18" />
    </Box>
  );
};

export const DragIcon = (props: Omit<BoxProps, "children">) => {
  return (
    <Box
      as="svg"
      viewBox="-2 -2 58 22"
      height="100%"
      fill="#f2bebe"
      width="1.8rem"
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      {...props}
    >
      <circle cx="0" cy="0" r="2" />
      <circle cx="18" cy="0" r="2" />
      <circle cx="36" cy="0" r="2" />
      <circle cx="54" cy="0" r="2" />
      <circle cx="0" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="36" cy="18" r="2" />
      <circle cx="54" cy="18" r="2" />
    </Box>
  );
};

export const ResizeIcon = (props: Omit<BoxProps, "children">) => {
  return (
    <Box
      as="svg"
      viewBox="-2 -2 40 40"
      width="1.35rem"
      fill="#f2bebe"
      cursor="nwse-resize"
      {...props}
    >
      <circle cx="36" cy="0" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="36" cy="18" r="2" />
      <circle cx="0" cy="36" r="2" />
      <circle cx="18" cy="36" r="2" />
      <circle cx="36" cy="36" r="2" />
    </Box>
  );
};
