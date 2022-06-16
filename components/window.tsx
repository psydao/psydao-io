import { Box, chakra, Flex } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { isValidMotionProp, motion, useMotionValue } from "framer-motion";
import * as React from "react";

// import { GlobalContext } from "../components/global-context";
import { useWindowContext } from "components/desktop";
import { CloseIcon, DragIcon, ResizeIcon } from "components/icons";

interface SlotProps {
  children: React.ReactNode;
}

const Minimized = ({ children }: SlotProps) => {
  return <>{children}</>;
};

const Maximized = ({ children }: SlotProps) => {
  return <>{children}</>;
};

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
  focus,
  initial = {},
  onClose,
  title,
  ...rest
}: WindowProps) => {
  const { windowLayerRef } = useWindowContext();

  // Motion props
  const x = useMotionValue(initial.x ?? 0);
  const y = useMotionValue(initial.y ?? 0);
  const height = useMotionValue(
    clamp(initial.height ?? 0, minHeight, maxHeight)
  );
  const width = useMotionValue(clamp(initial.width ?? 0, minWidth, maxWidth));
  return (
    <MotionDiv
      position="relative"
      zIndex="0"
      display="flex"
      flexDirection="column"
      border="1px solid #f2bebe"
      backgroundColor="#faffff"
      onTapStart={() => {
        focus && focus();
      }}
      style={{ height, x, y, width }}
      overflow="hidden"
      userSelect="none"
      pb="2"
      boxShadow="0 25px 50px -12px rgb(0 0 0 / 0.25)"
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
          style={{ width: "2em" }}
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
      >
        <ResizeIcon position="absolute" right="2" bottom="2" />
      </motion.div>
    </MotionDiv>
  );
};

Window.Minimized = Minimized;
Window.Maximized = Maximized;
