import { Text, useBreakpointValue } from "@chakra-ui/react";

import { Item } from "components/item";
import { YoutubeEmbed } from "components/youtube-embed";

export const Video = () => {
  return (
    <Item id="video" defaultIsOpen={true}>
      <Item.Icon>
        <Text as="span" _hover={{ color: "#f00" }}>
          Video
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
        <YoutubeEmbed embedId="jIQ6UV2onyI" />
      </Item.Window>
    </Item>
  );
};
