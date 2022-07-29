import { Text, useBreakpointValue } from "@chakra-ui/react";

import { Item } from "components/item";
import { Pill } from "components/pill";
import { VimeoEmbed } from "components/vimeo-embed";
import { YoutubeEmbed } from "components/youtube-embed";

export const Youtube = () => {
  const borderWidth = 2;
  const windowHeight = useBreakpointValue({ base: 180, sm: 250, md: 360 });
  const titleHeight = useBreakpointValue({ base: 34, sm: 42, md: 50 });

  if (windowHeight && titleHeight) {
    const width = ((windowHeight - titleHeight - 2 * borderWidth) * 16) / 9;

    return (
      <Item id="youtube" defaultIsOpen={true}>
        <Item.Icon>
          <Pill>Video</Pill>
        </Item.Icon>
        <Item.Window
          // height={{ base: "135px", sm: "180px", md: "315px" }}
          // width={{ base: "179px", sm: "245px", md: "471px" }}
          height={windowHeight}
          minHeight="180px"
          width={width}
          minWidth="180px"
          maxWidth="1000px"
          top="8%"
          left={{ base: "50%", sm: "10%" }}
          transform={{ base: "translateX(-50%)", sm: "none" }}
          lockAspectRatio={16 / 9}
          lockAspectRatioExtraHeight={titleHeight + 2 * borderWidth}
        >
          <Item.Window.TitleBar hasBorder />
          <Item.Window.Content p="0">
            <YoutubeEmbed embedId="OFIO5LJ8sP8" />
          </Item.Window.Content>
        </Item.Window>
      </Item>
    );
  }

  return null;
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
