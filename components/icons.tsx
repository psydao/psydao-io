import type { IconProps } from "@chakra-ui/react";
import { Box, Icon } from "@chakra-ui/react";

export const Cross = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 12 12"
      height="12px"
      width="auto"
      stroke="#f2bebe"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
      <line x1="1.5" y1="10.5" x2="10.5" y2="1.5" />
      <rect x="0" y="0" width="12" height="12" stroke="none" fill="none" />
    </Icon>
  );
};

export const Close = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 12 12"
      height="12px"
      width="auto"
      cursor="pointer"
      {...props}
    >
      <Box
        as="g"
        stroke="#f2bebe"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0}
        transition="opacity 300ms ease"
        _hover={{ opacity: 1 }}
        pointerEvents="all"
      >
        <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
        <line x1="1.5" y1="10.5" x2="10.5" y2="1.5" />
        <rect x="0" y="0" width="12" height="12" stroke="none" fill="none" />
      </Box>
      <g fill="#f2bebe">
        <circle cx="1.5" cy="1.5" r="1.5" />
        <circle cx="10.5" cy="1.5" r="1.5" />
        <circle cx="1.5" cy="10.5" r="1.5" />
        <circle cx="10.5" cy="10.5" r="1.5" />
      </g>
    </Icon>
  );
};

export const Drag = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 39 12"
      height="12px"
      width="auto"
      fill="#f2bebe"
      {...props}
    >
      <circle cx="1.5" cy="1.5" r="1.5" />
      <circle cx="10.5" cy="1.5" r="1.5" />
      <circle cx="19.5" cy="1.5" r="1.5" />
      <circle cx="28.5" cy="1.5" r="1.5" />
      <circle cx="37.5" cy="1.5" r="1.5" />
      <circle cx="1.5" cy="10.5" r="1.5" />
      <circle cx="10.5" cy="10.5" r="1.5" />
      <circle cx="19.5" cy="10.5" r="1.5" />
      <circle cx="28.5" cy="10.5" r="1.5" />
      <circle cx="37.5" cy="10.5" r="1.5" />
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

export const Logo = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 1080 1080"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        d="m863 222-3-2-2-3a342 342 0 0 0-636 0l-2 3-3 2a342 342 0 0 0 0 636l3 2 2 3a342 342 0 0 0 636 0l2-3 3-2a342 342 0 0 0 0-636Zm-540-66a287 287 0 0 1 434 0c6 8 8 18 3 26s-13 15-23 15c-66 0-130 18-184 52-5 4-8 4-13 4s-10-2-13-4c-54-34-118-52-184-52-10 0-20-5-23-15-5-10-3-20 3-26Zm-65 139c3-19 18-34 37-37 17-4 33-4 48-4 66 0 128 22 179 63 10 8 25 8 36 0a278 278 0 0 1 225-59c20 3 34 18 38 37a309 309 0 0 1-11 141c-6 14-17 25-30 30-15 5-30 2-41-6a350 350 0 0 0-400 0c-9 6-19 8-27 8-5 0-10 0-15-2-15-5-25-15-29-29a294 294 0 0 1-10-142Zm466 245c0 15-8 30-20 38a294 294 0 0 1-328 0c-13-8-20-23-20-38s8-30 20-38a294 294 0 0 1 328 0c12 8 20 23 20 38ZM197 737c0 10-5 20-15 23-3 2-6 2-10 2-6 0-11-2-16-7a287 287 0 0 1 0-433c8-7 18-9 26-4 10 5 15 14 15 23 0 66 18 128 52 184 5 8 5 18 0 26-34 56-52 120-52 186Zm560 187a287 287 0 0 1-434 0c-6-8-8-18-3-26 5-10 13-15 23-15 66 0 130-18 184-52 8-5 18-5 28 0 54 34 118 52 184 52 9 0 19 5 23 15 1 8 1 20-5 26Zm65-139c-3 19-18 34-37 37-17 4-33 4-48 4-66 0-128-22-179-63-10-8-25-8-34 0a283 283 0 0 1-227 59c-20-3-34-18-38-37-3-17-3-33-3-48 0-31 5-62 15-94 5-13 16-24 29-29 15-5 30-2 41 6a350 350 0 0 0 400 0c12-8 27-11 42-6s25 15 29 29c10 30 15 61 15 94-1 16-1 31-5 48Zm102-28c-5 3-10 6-16 6l-10-1c-10-5-15-14-15-23 0-66-18-128-52-184-5-8-5-18 0-26 34-55 52-119 52-184 0-10 5-20 15-23 8-5 20-4 26 3a287 287 0 0 1 0 432Z"
      ></path>
    </Icon>
  );
};
