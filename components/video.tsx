import { Text } from "@chakra-ui/react";

import { Item } from "components/item";
import { YoutubeEmbed } from "components/youtube-embed";
import { VimeoEmbed } from "./vimeo-embed";

export const Youtube = () => {
  return (
    <Item id="youtube" defaultIsOpen={true}>
      <Item.Icon>
        <Text as="span" _hover={{ color: "#f00" }}>
          YouTube
        </Text>
      </Item.Icon>
      <Item.Window
        height={{ base: "135px", sm: "180px", md: "315px" }}
        width={{ base: "240px", sm: "320px", md: "560px" }}
        top={{ base: "10%", sm: "10%" }}
        left={{ base: "50%", sm: "10%" }}
        transform={{ base: "translate(-50%, 0)", sm: "none" }}
        motionBoxProps={{ background: "black" }}
      >
        <YoutubeEmbed embedId="LKNtAlreG3I" />
      </Item.Window>
    </Item>
  );
};

export const Vimeo = () => {
  return (
    <Item id="vimeo" defaultIsOpen={true}>
      <Item.Icon>
        <Text as="span" _hover={{ color: "#f00" }}>
          Vimeo
        </Text>
      </Item.Icon>
      <Item.Window
        height={{ base: "135px", sm: "180px", md: "315px" }}
        width={{ base: "240px", sm: "320px", md: "560px" }}
        top={{ base: "20%", sm: "20%" }}
        left={{ base: "55%", sm: "20%" }}
        transform={{ base: "translate(-50%, 0)", sm: "none" }}
        motionBoxProps={{ background: "black" }}
      >
        <VimeoEmbed embedId="76979871" />
      </Item.Window>
    </Item>
  );
};
