import { Box, Center } from "@chakra-ui/react";

import { Logo } from "components/logo";

const ThreedPage = () => {
  return (
    <Center
      backgroundImage="linear-gradient(60deg, hsl(0deg 100% 25%) 0%, hsl(13deg 100% 43%) 66%, hsl(26deg 100% 61%) 100%)"
      color="white"
      height="100vh"
      width="100vw"
    >
      <Box width="100%">
        <Logo />
      </Box>
    </Center>
  );
};

export default ThreedPage;
