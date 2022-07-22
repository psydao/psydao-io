import type { BoxProps } from "@chakra-ui/react";
import { Box, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";

import { Close, Drag } from "components/icons";
import { useItemContext } from "components/item";
import { MotionBox } from "components/motion-box";
import { useWindowManager } from "components/window-manager";
import { AnimatePresence } from "framer-motion";
import { createCtx } from "lib/context";

// TODO fix types
interface WindowContext {
  onClose: () => void;
  border: BoxProps["border"];
  padding: BoxProps["padding"];
  pointerDragging: boolean;
}

const [useWindowContext, WindowContextProvider] = createCtx<WindowContext>();

interface TitleBarProps extends BoxProps {
  hasBorder?: boolean;
}

const TitleBar = ({ hasBorder = false, ...rest }: TitleBarProps) => {
  const { onClose, border, padding } = useWindowContext();

  return (
    <Box
      display="flex"
      alignItems="start"
      justifyContent="space-between"
      borderBottom={hasBorder ? border : "none"}
      p={padding}
      {...rest}
    >
      <Drag className="drag-handle" />
      <Close flex="0 0 auto" onClick={onClose} />
    </Box>
  );
};

interface ContentProps extends BoxProps {}

const Content = (props: ContentProps) => {
  const { padding, pointerDragging } = useWindowContext();

  return (
    <Box
      flex="1 1 auto"
      overflow="auto"
      userSelect={pointerDragging ? "none" : "text"}
      pointerEvents={pointerDragging ? "none" : "auto"}
      p={padding}
      sx={
        pointerDragging ? { "&::-webkit-scrollbar": { display: "none" } } : {}
      }
      {...props}
    />
  );
};

const validRndProps = {
  dragHandleClassName: true,
  children: true,
  minHeight: true,
  minWidth: true,
  maxHeight: true,
  maxWidth: true,
  style: true,
  default: true,
  lockAspectRatio: true,
  lockAspectRatioExtraHeight: true,
  onMouseDown: true,
  onTouchStart: true,
  enableResizing: true,
  onDragStart: true,
  onResizeStart: true,
  onDragStop: true,
  onResizeStop: true,
  bounds: true,
};

const Resizable = chakra(Rnd, {
  shouldForwardProp: (prop) => prop in validRndProps,
});

interface WindowProps
  extends React.ComponentPropsWithoutRef<typeof Resizable> {}

// TODO the current approach to picking up border and padding is a bit limited
// because I think unexpected things might happen when supplying partial props
// for those (px, py, pt, borderTop, borderRight, etc.)
export const Window = ({
  children,
  border = "2px solid #f2bebe",
  padding = { base: "2", sm: "3", md: "4" },
  resizable,
  lockAspectRatio,
  lockAspectRatioExtraHeight,
  ...rest
}: WindowProps) => {
  const { id, isOpen, onClose } = useItemContext();
  const {
    windowLayerRef,
    focus,
    windowStack,
    setPointerDragging,
    pointerDragging,
  } = useWindowManager();

  // TODO find a less ugly way to refresh component. The problem solved by the
  // following segment is that windowLayerRef will be null at first and the
  // defaultIsOpen from useDisclosure won't be honored. This state/effect
  // produces a rerender that picks up the correct values. But it's ugly and you
  // know it.
  const [, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    focus(id);
    setPointerDragging(true);
  };

  const handleEnd = () => {
    setPointerDragging(false);
  };

  if (windowLayerRef.current) {
    return createPortal(
      <WindowContextProvider
        value={{
          onClose: onClose,
          border,
          padding,
          pointerDragging,
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              position="absolute"
              zIndex={windowStack[id]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...rest}
            >
              <Resizable
                default={{ x: 0, y: 0, height: "100%", width: "100%" }}
                dragHandleClassName="drag-handle"
                lockAspectRatio={lockAspectRatio}
                lockAspectRatioExtraHeight={lockAspectRatioExtraHeight}
                pointerEvents="auto"
                background="#fffafa"
                minHeight="200px"
                minWidth="200px"
                border={border}
                enableResizing={resizable}
                onMouseDown={() => focus(id)}
                onTouchStart={() => focus(id)}
                onDragStart={handleStart}
                onResizeStart={handleStart}
                onDragStop={handleEnd}
                onResizeStop={handleEnd}
                bounds="#window-layer"
                {...rest}
              >
                <Box h="100%" display="flex" flexDir="column" overflow="hidden">
                  {children}
                </Box>
              </Resizable>
            </MotionBox>
          )}
        </AnimatePresence>
      </WindowContextProvider>,
      windowLayerRef.current
    );
  }

  return null;
};

Window.TitleBar = TitleBar;
Window.Content = Content;
