import type { BoxProps } from "@chakra-ui/react";
import { Box, chakra } from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { Rnd } from "react-rnd";

import { Cross, Drag } from "components/icons";
import { MotionBox } from "components/motion-box";
import { useWindowManager } from "components/window-manager";
import { AnimatePresence } from "framer-motion";
import { createCtx } from "lib/context";

// TODO fix types
interface WindowContext {
  border: BoxProps["border"];
  id: string;
  padding: BoxProps["padding"];
}

const [useWindowContext, WindowContextProvider] = createCtx<WindowContext>();

interface TitleBarProps extends BoxProps {
  hasBorder?: boolean;
}

const TitleBar = ({ hasBorder = true, ...rest }: TitleBarProps) => {
  const { border, id, padding } = useWindowContext();
  const { dispatch } = useWindowManager();

  return (
    <Box
      display="flex"
      alignItems="start"
      justifyContent="space-between"
      borderBottom={hasBorder ? border : "none"}
      background="#FFF5F5"
      {...rest}
    >
      <Box
        className="drag-handle"
        p={padding}
        flex="1 0"
        cursor="grab"
        _active={{ cursor: "grabbing" }}
      >
        <Drag display="block" />
      </Box>
      <Box
        p={padding}
        flex="0 0 auto"
        onClick={() => dispatch({ type: "close", id })}
        cursor="pointer"
        pointerEvents="all"
      >
        <Cross display="block" />
      </Box>
    </Box>
  );
};

interface ContentProps extends BoxProps {}

const Content = (props: ContentProps) => {
  const { padding } = useWindowContext();
  const {
    state: { isPointerDragging },
  } = useWindowManager();

  return (
    <Box
      flex="1 1 auto"
      overflow="auto"
      userSelect={isPointerDragging ? "none" : "text"}
      pointerEvents={isPointerDragging ? "none" : "auto"}
      p={padding}
      sx={
        isPointerDragging ? { "&::-webkit-scrollbar": { display: "none" } } : {}
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

interface WindowProps extends BoxProps {
  defaultIsOpen?: boolean;
  id: string;
  resizable?: boolean;
  lockAspectRatio?: number;
  lockAspectRatioExtraHeight?: number;
}


// TODO the current approach to picking up border and padding is a bit limited
// because I think unexpected things might happen when supplying partial props
// for those (px, py, pt, borderTop, borderRight, etc.)
export const Window = ({
  children,
  defaultIsOpen = false,
  id,
  border = "2px solid #f2bebe",
  padding = "2",
  resizable,
  lockAspectRatio,
  lockAspectRatioExtraHeight,
  ...rest
}: WindowProps) => {
  const { dispatch, state } = useWindowManager();

  const index = state.windows.findIndex((cur) => cur.id === id);
  const window = state.windows[index];

  useLayoutEffect(() => {
    if (defaultIsOpen && window === undefined) {
      dispatch({ type: "foreground", id });
    }
  });

  const handleStart = () => {
    dispatch({ type: "foreground", id });
    dispatch({ type: "startDrag" });
  };

  const handleEnd = () => {
    dispatch({ type: "stopDrag" });
  };

  if (window) {
    return (
      <WindowContextProvider
        value={{
          id,
          border,
          padding,
        }}
      >
        <AnimatePresence>
          {window.isOpen && (
            <MotionBox
              position="absolute"
              zIndex={index}
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
                boxShadow="0px 12px 33px rgba(152, 53, 186, 0.22)"
                minHeight="200px"
                minWidth="200px"
                border={border}
                enableResizing={resizable}
                onMouseDown={() => dispatch({ type: "foreground", id })}
                onTouchStart={() => dispatch({ type: "foreground", id })}
                onDragStart={handleStart}
                onResizeStart={handleStart}
                onDragStop={handleEnd}
                onResizeStop={handleEnd}
                bounds="#window-bounds"
                {...rest}
              >
                <Box h="100%" display="flex" flexDir="column" overflow="hidden">
                  {children}
                </Box>
              </Resizable>
            </MotionBox>
          )}
        </AnimatePresence>
      </WindowContextProvider>
    );
  }

  return null;
};

Window.TitleBar = TitleBar;
Window.Content = Content;
