import { Text } from "@chakra-ui/react";

import { Item } from "components/item";
import { YoutubeEmbed } from "components/youtube-embed";
import { VimeoEmbed } from "./vimeo-embed";

export const Youtube = () => {
  return (
    <Item id="youtube" defaultIsOpen={true}>
      <Item.Icon
        px="8"
        border="2px solid #f2bebe"
        borderRadius="full"
        boxShadow="4px 4px 13px 0px #F2BEBEA1"
        background="#fffafa"
        color="#f2bebe"
        fontSize="24px"
        fontStyle="italic"
        fontWeight="700"
        textAlign="center"
        transition="all 200ms ease"
        _hover={{
          color: "#9835BA",
          border: "2px solid #9835BA",
        }}
      >
        <Text as="span">Video</Text>
      </Item.Icon>
      <Item.Window
        height={{ base: "135px", sm: "180px", md: "315px" }}
        width={{ base: "240px", sm: "320px", md: "560px" }}
        top={{ base: "10%", sm: "10%" }}
        left={{ base: "50%", sm: "10%" }}
        transform={{ base: "translate(-50%, 0)", sm: "none" }}
        titleBarBorder={true}
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
