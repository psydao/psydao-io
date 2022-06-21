import { Box, chakra } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { isValidMotionProp, motion, useMotionValue } from "framer-motion";
import * as React from "react";
import * as ReactDOM from "react-dom";

// import { GlobalContext } from "../components/global-context";
import { useItemContext } from "components/item";
import { useDesktopContext } from "components/desktop";
import { CloseIcon, DragIcon, ResizeIcon } from "components/icons";

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

// TODO this typing is a bit sketchy. It's there so that we can access the prop
// in the component's body. We don't want to require it because WindowManager
// will supply it. We can possibly find a cleaner solution.
interface WindowProps extends React.ComponentPropsWithoutRef<typeof MotionDiv> {
  constraints?: {
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
  };
  contentBoxProps?: BoxProps;
  focus?(): void;
  initial?: {
    height?: number;
    width?: number;
    x?: number;
    y?: number;
  };
  onClose?(): void;
  title?: string;
}

export const Window = ({
  constraints: {
    maxHeight = Infinity,
    maxWidth = Infinity,
    minHeight = 200,
    minWidth = 300,
  } = {},
  contentBoxProps,
  children,
  initial = {},
  title,
  ...rest
}: WindowProps) => {
  const { id, isOpen, onClose } = useItemContext();
  const { windowLayerRef, focus, windowStack } = useDesktopContext();

  // Motion props
  const x = useMotionValue(initial.x ?? 0);
  const y = useMotionValue(initial.y ?? 0);
  const height = useMotionValue(
    clamp(initial.height ?? 0, minHeight, maxHeight)
  );
  const width = useMotionValue(clamp(initial.width ?? 0, minWidth, maxWidth));

  if (windowLayerRef && windowLayerRef.current && isOpen) {
    return ReactDOM.createPortal(
      <MotionDiv
        position="absolute"
        zIndex={windowStack && id && windowStack[id]}
        display="flex"
        flexDirection="column"
        border="1px solid #f2bebe"
        backgroundColor="#faffff"
        onTapStart={() => {
          focus && id && focus(id);
        }}
        style={{ height, x, y, width }}
        overflow="hidden"
        userSelect="none"
        pb="2"
        boxShadow="2xl"
        pointerEvents="auto"
        {...rest}
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          p="2"
          gap="2"
        >
          <motion.div
            onPan={(e, info) => {
              x.set(info.delta.x + x.get());
              y.set(info.delta.y + y.get());
            }}
            style={{ width: "2em", touchAction: "none" }}
          >
            <DragIcon />
          </motion.div>
          {title}
          <CloseIcon flex="0 0 auto" onClick={onClose} />
        </Box>
        <Box
          overflow="auto"
          userSelect="text"
          px="2"
          flex="1 1 auto"
          {...contentBoxProps}
        >
          {children}
        </Box>
        <motion.div
          onPan={(e, info) => {
            const newHeight = info.delta.y + height.get();
            const newWidth = info.delta.x + width.get();
            if (newHeight >= minHeight && newHeight <= maxHeight) {
              height.set(newHeight);
            }
            if (newWidth >= minWidth && newWidth <= maxWidth) {
              width.set(newWidth);
            }
          }}
          style={{ touchAction: "none" }}
        >
          <ResizeIcon position="absolute" right="2" bottom="2" />
        </motion.div>
      </MotionDiv>,
      windowLayerRef.current
    );
  }

  return null;
};
