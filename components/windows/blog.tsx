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
      maxHeight={{
        base: fullScreenWindow ? "100%" : "90%",
        sm: fullScreenWindow ? "100%" : "80%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      height={"100%"}
      maxWidth={{
        base: fullScreenWindow ? "100%" : "95%",
        md: fullScreenWindow ? "100%" : "602px"
      }}
      width={"100%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -40%)"}
      top={{
        base: fullScreenWindow ? "0" : "55%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "50%"
      }}
      left={{
        base: fullScreenWindow ? "0" : "50%",
        xl: fullScreenWindow ? "0" : "30%"
      }}
      fullScreenWindow={fullScreenWindow}
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
