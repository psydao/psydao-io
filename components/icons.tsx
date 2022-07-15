import type { IconProps } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

export const Cross = (props: IconProps) => {
  return (
    <Icon
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
    </Icon>
  );
};

export const Close = (props: IconProps) => {
  return (
    <Icon
      viewBox="-2 -2 22 22"
      height="1rem"
      width="auto"
      fill="#f2bebe"
      cursor="pointer"
      {...props}
    >
      <circle cx="0" cy="0" r="1.5" />
      <circle cx="18" cy="0" r="1.5" />
      <circle cx="0" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </Icon>
  );
};

export const Drag = (props: IconProps) => {
  return (
    <Icon
      viewBox="-2 -2 58 22"
      height="1rem"
      width="auto"
      fill="#f2bebe"
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      {...props}
    >
      <circle cx="0" cy="0" r="1.5" />
      <circle cx="18" cy="0" r="1.5" />
      <circle cx="36" cy="0" r="1.5" />
      <circle cx="54" cy="0" r="1.5" />
      <circle cx="0" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
      <circle cx="36" cy="18" r="1.5" />
      <circle cx="54" cy="18" r="1.5" />
    </Icon>
  );
};

export const Resize = (props: IconProps) => {
  return (
    <Icon
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
    </Icon>
  );
};

export const Play = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z"
      ></path>
    </Icon>
  );
};

export const Pause = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        d="M3,21 L9,21 L9,3 L3,3 L3,21 Z M4,19 L8,19 L8,5 L4,5 L4,19 Z M5,17 L7,17 L7,7 L5,7 L5,17 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z M16,19 L20,19 L20,5 L16,5 L16,19 Z M17,17 L19,17 L19,7 L17,7 L17,17 Z"
      ></path>
    </Icon>
  );
};
