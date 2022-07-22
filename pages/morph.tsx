import { Box, Center, Icon, IconProps } from "@chakra-ui/react";

const Cross = (props: IconProps) => {
  return (
    <Icon
      viewBox="-2 -2 22 22"
      height="1rem"
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
        <line x1="0" y1="0" x2="18" y2="18" />
        <line x1="0" y1="18" x2="18" y2="0" />
        <rect x="-2" y="-2" width="22" height="22" stroke="none" fill="none" />
      </Box>
      <g fill="#f2bebe">
        <circle cx="0" cy="0" r="1.5" />
        <circle cx="18" cy="0" r="1.5" />
        <circle cx="0" cy="18" r="1.5" />
        <circle cx="18" cy="18" r="1.5" />
      </g>
    </Icon>
  );
};

const Close = (props: IconProps) => {
  return (
    <Icon
      viewBox="-2 -2 22 22"
      height="1rem"
      width="auto"
      cursor="pointer"
      fill="#f2bebe"
      {...props}
    >
      <circle cx="0" cy="0" r="1.5" />
      <circle cx="18" cy="0" r="1.5" />
      <circle cx="0" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </Icon>
  );
};

const MorphPage = () => {
  return (
    <Center
      h="100vh"
      w="100vw"
      background="linear-gradient(20deg, #373b44, #4286f4)"
    >
      <Close height="5em" border="1px dashed white" />
      <Cross height="5em" border="1px dashed white" />
    </Center>
  );
};

export default MorphPage;
