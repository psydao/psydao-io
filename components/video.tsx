import { Text } from "@chakra-ui/react";

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
      <Item.Window bg="black" initial={{ height: 100, width: 100 }}>
        <YoutubeEmbed embedId="jIQ6UV2onyI" />
      </Item.Window>
    </Item>
  );
};
