import { useMemo } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import Iframe from "@/components/ui/iframe";
import { useWindowManager } from "@/components/ui/window-manager";

export const Blog = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { dispatch, state } = useWindowManager();
  const id = "blog";

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === id) {
      return true;
    }

    return false;
  }, [state]);

  return (
    <Window
      id={id}
      height={fullScreenWindow ? "100%" : isLargerThanMd ? "500px" : "65%"}
      width={fullScreenWindow ? "100%" : isLargerThanMd ? "655px" : "95%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -40%)"}
      top={{
        base: fullScreenWindow ? "0" : "46%",
        md: fullScreenWindow ? "0" : "42%"
      }}
      left={{
        base: fullScreenWindow ? "0" : "50%",
        lg: fullScreenWindow ? "0" : "40%"
      }}
      fullScreenWindow={fullScreenWindow}
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
