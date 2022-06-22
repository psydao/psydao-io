import { Box, FlexProps } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { createCtx } from "lib/context";

const foreground = (sel: React.Key | null, arr: React.Key[]) =>
  sel ? [...arr.filter((id) => id !== sel), sel] : [...arr];

interface WindowManagerContext {
  focus(id: React.Key): void;
  windowLayerRef: React.RefObject<HTMLDivElement>;
  windowStack: Record<string, number>;
}

export const [useWindowManager, WindowManagerProvider] =
  createCtx<WindowManagerContext>();

export const WindowManager = ({ children }: FlexProps) => {
  const windowLayerRef = useRef(null);
  const [stack, setStack] = useState<React.Key[]>([]);
  const windowStack = stack.reduce(
    (acc, cur, idx) => ({ ...acc, [cur]: idx + 1 }),
    {}
  );
  const focus = (id: React.Key) => setStack((prev) => foreground(id, prev));

  return (
    <>
      <WindowManagerProvider value={{ windowLayerRef, windowStack, focus }}>
        {children}
      </WindowManagerProvider>
      <Box
        ref={windowLayerRef}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        pointerEvents="none"
        overflow="hidden"
      />
    </>
  );
};
