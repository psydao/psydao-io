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
      style={{ maxWidth: "1.5rem", filter: "blur(2px)" }}
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
      viewBox="-3 -3 60 24"
      height="100%"
      fill="#f2bebe"
      style={{ maxWidth: "2rem" }}
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      {...props}
    >
      <circle cx="0" cy="0" r="3" />
      <circle cx="18" cy="0" r="3" />
      <circle cx="36" cy="0" r="3" />
      <circle cx="54" cy="0" r="3" />
      <circle cx="0" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="36" cy="18" r="3" />
      <circle cx="54" cy="18" r="3" />
    </Box>
  );
};

export const ResizeIcon = (props: Omit<BoxProps, "children">) => {
  return (
    <Box
      as="svg"
      viewBox="-1 -1 20 20"
      width="30px"
      fill="#f2bebe"
      cursor="nwse-resize"
      {...props}
    >
      <circle cx="6" cy="18" r="1" />
      <circle cx="12" cy="18" r="1" />
      <circle cx="18" cy="18" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="18" cy="12" r="1" />
      <circle cx="18" cy="6" r="1" />
    </Box>
  );
};
