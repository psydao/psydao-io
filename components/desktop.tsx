import { Box, FlexProps } from "@chakra-ui/react";
import * as React from "react";

const foreground = (sel: React.Key | null, arr: React.Key[]) =>
  sel ? [...arr.filter((id) => id !== sel), sel] : [...arr];

interface WindowContextProps {
  focus?(id: React.Key): void;
  windowLayerRef?: React.RefObject<HTMLDivElement | null>;
  windowStack?: Record<string, number>;
}

const WindowContext = React.createContext<WindowContextProps>({});

export const useDesktopContext = () => React.useContext(WindowContext);

export const Desktop = ({ children }: FlexProps) => {
  const windowLayerRef = React.useRef(null);
  const [stack, setStack] = React.useState<React.Key[]>([]);
  const windowStack = stack.reduce(
    (acc, cur, idx) => ({ ...acc, [cur]: idx + 1 }),
    {}
  );
  const focus = (id: React.Key) => setStack((prev) => foreground(id, prev));

  return (
    <>
      <WindowContext.Provider value={{ windowLayerRef, windowStack, focus }}>
        {children}
      </WindowContext.Provider>
      <Box
        ref={windowLayerRef}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        pointerEvents="none"
      />
    </>
  );
};
