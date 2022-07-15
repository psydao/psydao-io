import { Box, Text } from "@chakra-ui/react";

const ScrollbarPage = () => {
  return (
    <Box h="100vh" w="100vw" pos="relative">
      <Box
        layerStyle="window"
        pos="absolute"
        h="100%"
        w="100%"
        maxH="400px"
        maxW="300px"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        overflow="auto"
        border="2px solid #f2bebe"
        boxShadow="lg"
        pt="0.5rem"
        pb="0.5rem"
        pl="0.5rem"
        sx={{
          "::-webkit-scrollbar": {
            width: "1.5rem",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#f2bebe",
            borderRadius: "full",
            border: "0.6rem solid #fffafa",
          },
        }}
      >
        <Text>
          Aliquip dolore commodo consectetur sit quis nisi in. Commodo
          consectetur sit quis nisi in est. Sit quis nisi in. Nisi in est minim
          sunt aute ipsum. Est minim sunt aute ipsum et consequat.
        </Text>
        <Text>
          Minim occaecat ipsum adipiscing do sint aliqua. Ipsum adipiscing do
          sint aliqua occaecat. Do sint aliqua occaecat, adipiscing. Occaecat,
          adipiscing exercitation ut incididunt aute. Ut incididunt aute enim
          laboris. Aute enim laboris amet sit eiusmod et veniam. Laboris amet
          sit, eiusmod et. Eiusmod et veniam qui lorem deserunt aliqua. Veniam
          qui lorem deserunt aliqua. Lorem deserunt aliqua aliqua consequat
          cillum labore, esse.
        </Text>
        <Text>
          Cillum, aliquip laborum id. Id exercitation quis labore adipiscing
          incididunt minim. Quis labore adipiscing incididunt minim pariatur.
          Adipiscing incididunt minim pariatur non reprehenderit duis non. Minim
          pariatur non reprehenderit duis non ad. Non reprehenderit, duis non.
          Non ad non et consequat amet. Non et consequat amet, exercitation
          cupidatat ad. Amet exercitation cupidatat ad elit, qui enim. Ad elit
          qui enim.
        </Text>
        <Text>
          Lorem est nisi ut labore officia, aute. Ut labore officia aute.
          Officia aute eiusmod sit nulla laborum veniam excepteur. Eiusmod sit
          nulla laborum, veniam excepteur. Laborum veniam excepteur deserunt
          proident amet. Excepteur deserunt proident amet. Proident amet in
          laborum ut culpa velit. In laborum ut culpa velit pariatur proident
          occaecat. Ut culpa velit pariatur proident occaecat irure in.
        </Text>
        <Text>
          Aute esse ex ullamco lorem, sed esse. Ullamco lorem sed esse. Sed esse
          velit pariatur exercitation aute aute laborum. Velit pariatur
          exercitation, aute aute. Aute, aute laborum minim. Minim culpa
          adipiscing, id fugiat est ad. Id fugiat est, ad.
        </Text>
        <Text>
          Occaecat et consectetur anim ipsum eiusmod aliquip. Consectetur, anim
          ipsum eiusmod aliquip cillum. Eiusmod, aliquip cillum elit. Elit, sit
          eiusmod consequat nostrud qui. Consequat nostrud qui fugiat labore
          eiusmod. Qui fugiat labore eiusmod ex voluptate.
        </Text>
      </Box>
    </Box>
  );
};

export default ScrollbarPage;
