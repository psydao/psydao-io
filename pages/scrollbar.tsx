import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Item } from "components/item";
import { Pill } from "components/pill";
import { WindowManager } from "components/window-manager";

const Lorem = () => {
  return (
    <>
      <Text color="#269200" fontSize="24px" mt="10">
        The PsyDAO Manifesto
      </Text>
      <Text as="h1" mb="28">
        An Industrial Ego Death
      </Text>
      <Text as="h2">Set</Text>
      <Text>
        Our species faces unprecedented challenges from pandemics, climate
        crises, discord, and war. Many require radical shifts in human
        consciousness to overcome.
      </Text>
      <Text>
        For millennia, psychedelics have provided the human race with exactly
        that. Plants like Amanita muscaria, Banisteriopsis caapi, and Cannabis
        sativa and preparations with psychedelic effects like ayahuasca [1],
        ergotized beer [2], and soma [3] have extensive spiritual, medicinal,
        and recreational value to the human race, with the lines between those
        domains often blurred.
      </Text>
      <Image
        src="/colorized-dalle-shroom.jpg"
        alt=""
        position="absolute"
        right="0"
        transform="translateY(-20%)"
        zIndex="-1"
      />
      <Text>
        Scientific understanding of psychedelics, while growing, is lacking.
        Prosecution of psychedelics users remains rampant. The same draconian
        legislation made it quite impossible to continue the academic study of
        psychedelics from the 1960s has only recently begun to relax.
      </Text>
      <Text>
        With the regulatory and legislative environment around psychedelics
        improving, the maw of capitalism yawns in anticipation of medicinal and
        recreational use becoming more accessible. Experts fear that if
        psychedelics fall exclusively into the hands of industry and big pharma,
        much of the current progress will be stymied. Big Pharma, Big Law, and
        the other big dogs will take these drugs down the wrong path, making
        them inaccessible.
      </Text>
      <Text>
        What if we collectively owned psychedelics? We want to democratize
        access.
      </Text>
      <Text>
        What if we made psychedelics unmonopolizable? We want to decentralize
        power.
      </Text>
      <Text>
        Instead of the wrong path, we take the path less traveled. From Satoshi
        Nakamoto all the way back to the first ape to ever pick and eat a
        psychedelic mushroom, it has made all the difference.
      </Text>
      <Image
        src="/colorized-mind-cave.jpg"
        alt=""
        position="absolute"
        left="0"
        transform="translateY(20%)"
        zIndex="-1"
      />
      <Text>
        We aim to frontrun industry, fund and build the public domain, and use
        the magic of tokenization to ensure that psychedelic intellectual
        property is freely traded, collectively owned, and responsibly managed
        for all humankind. Leveraging open science and open-source business
        models, we will build the landscape of the psychedelic future that is
        owned and operated by users. Using pseudonymity and privacy-preserving
        technologies, we will exist at the place where cypherpunks and
        psychonauts overlap.
      </Text>
      <Text as="h2">Setting</Text>
      <Text>
        The narrative thread tying together humanity and psychedelics is
        ancient, and perhaps even precedes the origin of our species.
      </Text>
      <Text>
        Some posit that as apes prospered throughout the paleolithic, some
        apes&#39; brains developed in an accelerated fashion due to consumption
        of psilocybin-containing mushrooms, giving birth to the mind of Homo
        sapiens, tool-using wordcels and shape rotators. For thousands of years,
        nature controlled our access to these plants.
      </Text>
      <Text>
        Others suspect that the democratization of the mystical experience
        introduced by ergotized wine sparked the most viral and powerful
        religious movement in history, changing human consciousness forever. For
        hundreds of years, religion controlled our access.
      </Text>
      <Text>
        Some say that the psychedelic revolution of the 1960s crested in a wave
        you can see sometimes if you go far out in the desert near Las Vegas
        with a head full of mescaline and a lawyer, but the wave rolled back
        when The Man crept in, as The Man always tends to do in our temporary
        autonomous zones [4], pausing psychedelic research for decades. For
        decades, the state has controlled our access.
      </Text>
      <Image
        src="/colorized-stamp-border.jpg"
        alt=""
        position="absolute"
        right="20%"
        transform="translateY(-30%)"
        zIndex="-1"
      />
      <Text>
        For apes and scientists, Greeks and Romans, Egyptians and Mayans, Hindus
        and Hopis, Maori and Matsigenga, Sami and Shipibo, Chinese, Europeans,
        Americans, and more, psychedelics have played an extensive role in
        history. But that role is limited compared to what&#39;s to come with
        democratized access to psychedelics.
      </Text>
    </>
  );
};

const customCssScrollBar = {
  overflow: "overlay",
  sx: {
    "::-webkit-scrollbar": {
      width: "1.1rem",
      background: "transparent",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      borderRadius: "full",
      border: "0.4rem solid transparent",
      backgroundClip: "padding-box",
    },
    "&:hover::-webkit-scrollbar-thumb": { backgroundColor: "#f2bebe" },
  },
};

const ScrollbarPage = () => {
  return (
    <WindowManager>
      <Box
        h="100vh"
        w="100vw"
        p="5"
        pos="relative"
        background="linear-gradient(to bottom right, #373b44, #4286f4)"
        border="5px solid tomato"
        boxSizing="border-box"
      >
        <Heading color="white">Long content</Heading>
        <Box
          display="flex"
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          gap="3"
        >
          <Item id="no-custom-scrollbar">
            <Item.Icon>
              <Pill>No custom scrollbar</Pill>
            </Item.Icon>
            <Item.Window
              h="100%"
              w="100%"
              maxHeight="400px"
              maxWidth="600px"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Item.Window.TitleBar />
              <Item.Window.Content layerStyle="window" position="relative">
                <Heading>No custom scrollbar</Heading>
                <Lorem />
              </Item.Window.Content>
            </Item.Window>
          </Item>
          <Item id="js-scrollbar">
            <Item.Icon cursor="not-allowed">
              <Pill filter="grayscale(100%)" _hover={{}} whileTap={() => {}}>
                JS scrollbar
              </Pill>
            </Item.Icon>
          </Item>
          <Item id="css-scrollbar">
            <Item.Icon>
              <Pill>CSS scrollbar</Pill>
            </Item.Icon>
            <Item.Window
              h="100%"
              w="100%"
              maxHeight="400px"
              maxWidth="600px"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Item.Window.TitleBar />
              <Item.Window.Content
                layerStyle="window"
                position="relative"
                {...customCssScrollBar}
              >
                <Heading>CSS custom scrollbar</Heading>
                <Lorem />
              </Item.Window.Content>
            </Item.Window>
          </Item>
        </Box>
        <Heading color="white" mt="10">
          Short content
        </Heading>
        <Box
          display="flex"
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          gap="3"
        >
          <Item id="no-custom-scrollbar-short">
            <Item.Icon>
              <Pill>No custom scrollbar</Pill>
            </Item.Icon>
            <Item.Window
              h="100%"
              w="100%"
              maxHeight="400px"
              maxWidth="300px"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Item.Window.TitleBar />
              <Item.Window.Content layerStyle="window">
                <Heading>No custom scrollbar</Heading>
                <Text>
                  Aliquip dolore commodo consectetur sit quis nisi in. Commodo
                  consectetur sit quis nisi in est. Sit quis nisi in. Nisi in
                  est minim sunt aute ipsum. Est minim sunt aute ipsum et
                  consequat.
                </Text>
              </Item.Window.Content>
            </Item.Window>
          </Item>
          <Item id="js-scrollbar-short">
            <Item.Icon cursor="not-allowed">
              <Pill filter="grayscale(100%)" _hover={{}} whileTap={() => {}}>
                JS scrollbar
              </Pill>
            </Item.Icon>
          </Item>
          <Item id="css-scrollbar-short">
            <Item.Icon>
              <Pill>CSS scrollbar</Pill>
            </Item.Icon>
            <Item.Window
              h="100%"
              w="100%"
              maxHeight="400px"
              maxWidth="300px"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Item.Window.TitleBar />
              <Item.Window.Content layerStyle="window" {...customCssScrollBar}>
                <Heading>CSS custom scrollbar</Heading>
                <Text>
                  Aliquip dolore commodo consectetur sit quis nisi in. Commodo
                  consectetur sit quis nisi in est. Sit quis nisi in. Nisi in
                  est minim sunt aute ipsum. Est minim sunt aute ipsum et
                  consequat.
                </Text>
              </Item.Window.Content>
            </Item.Window>
          </Item>
        </Box>
      </Box>
    </WindowManager>
  );
};

export default ScrollbarPage;
