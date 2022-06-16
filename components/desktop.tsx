import { Box, Center } from "@chakra-ui/react";
import * as React from "react";

import { GlobalContext } from "components/global-context";
import { pick } from "lib/children";
import { getGridBackgroundPattern } from "lib/grid";

interface SlotProps {
  children: React.ReactNode;
}

const Background = ({ children }: SlotProps) => {
  return <>{children}</>;
};

const foreground = (sel: React.Key | null, arr: React.Key[]) =>
  sel ? [...arr.filter((id) => id !== sel), sel] : [...arr];

const Foreground = ({ children, ...rest }: SlotProps) => {
  const [stack, setStack] = React.useState<React.Key[]>([]);

  const focus = (id: React.Key | null) => () =>
    setStack((prev) => foreground(id, prev));

  return (
    <Box position="relative" {...rest}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const zIndex = stack.findIndex((el) => el === child.key);
          return React.cloneElement(child, {
            focus: focus(child.key),
            zIndex: zIndex < 0 ? undefined : zIndex,
          });
        }
        return null;
      })}
    </Box>
  );
};

interface WindowContextProps {
  windowLayerRef: React.RefObject<HTMLDivElement> | null;
}

const WindowContext = React.createContext<WindowContextProps>({
  windowLayerRef: null,
});

export const useWindowContext = () => React.useContext(WindowContext);

export const Desktop = ({ children }: SlotProps) => {
  const [background, foreground] = pick(children, [
    Background.name,
    Foreground.name,
  ]);
  const { borderWidth, dynamicBackgroundProps, minPadding, trackSize } =
    React.useContext(GlobalContext);
  const { border, ...gridPattern } = getGridBackgroundPattern({
    borderWidth,
    trackSize,
  });
  const windowLayerRef = React.useRef(null);
  return (
    <Center
      h="100vh"
      w="100vw"
      p={minPadding}
      overflow="hidden"
      {...dynamicBackgroundProps}
    >
      <Box position="relative" h="100%" w="100%" overflow="hidden">
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          border={border}
        >
          {background}
        </Box>
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          {...gridPattern}
        >
          <WindowContext.Provider value={{ windowLayerRef }}>
            {foreground}
          </WindowContext.Provider>
        </Box>
        <Box
          ref={windowLayerRef}
          position="absolute"
          top="0"
          left="0"
          overflow="hiden"
        />
      </Box>
    </Center>
  );
};

Desktop.Background = Background;
Desktop.Foreground = Foreground;
