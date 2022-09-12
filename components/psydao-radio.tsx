import { Icon } from "@chakra-ui/react";
import { IoMdRadio } from "react-icons/io";

import { Item } from "components/item";

export const PsydaoRadio = () => {
  return (
    <Item id="psydao-radio">
      <Item.Icon gridArea="-3 / 1 / span 1 / span 1">
        <Icon
          as={IoMdRadio}
          boxSize="full"
          p="30%"
          color="#f2bebe"
          _hover={{
            color: "#1F3B4D",
            backgroundImage:
              "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)",
          }}
          transition="all 200ms ease"
        />
      </Item.Icon>
      <Item.Window
        height="414px"
        width="90%"
        maxWidth="300px"
        top="12%"
        left={{ base: "50%", md: "auto" }}
        right={{ base: "auto", md: "10%" }}
        transform={{ base: "translateX(-50%)", md: "none" }}
        resizable={false}
      >
        <Item.Window.TitleBar />
        <Item.Window.Content
          p="0"
          background="linear-gradient(to bottom, #414141, #0d0d0d)"
        >
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/0i5lwTl23fDlSMy1qfRS1t?utm_source=generator"
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </Item.Window.Content>
      </Item.Window>
    </Item>
  );
};
