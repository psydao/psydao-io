import { Window } from "components/window";
import Iframe from "../iframe";
import { useWindowManager } from "../window-manager";
import { useMediaQuery } from "@chakra-ui/react";

export const Blog = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { dispatch } = useWindowManager();
  const id = "blog";

  return (
    <Window
      id={id}
      height="80%"
      maxHeight="640px"
      minHeight={isLargerThanMd ? "500px" : "350px"}
      width="95%"
      maxWidth="655px"
      minWidth="240px"
      top={{ base: "46%", md: "42%" }}
      left={{ base: "50%", lg: "40%" }}
      transform="translate(-50%, -50%)"
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content layerStyle="window" position="relative" zIndex="0" p={0}>
        <Iframe
          src="https://mirror.xyz/0x3ccF80a0f26ED8BC2E11d2a4e0813816048BCA38"
          width="100%"
          height="100%"
          onInferredClick={() => dispatch({ type: "foreground", id })}
        ></Iframe>
      </Window.Content>
    </Window>
  );
};
