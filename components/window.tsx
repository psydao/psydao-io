import { Box, chakra } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { isValidMotionProp, motion, useMotionValue } from "framer-motion";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { useItemContext } from "components/item";
import { CloseIcon, DragIcon, ResizeIcon } from "components/icons";
import { useWindowManager } from "components/window-manager";

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

interface WindowProps extends React.ComponentPropsWithoutRef<typeof MotionDiv> {
  contentBoxProps?: BoxProps;
  initial: {
    height: number;
    width: number;
  };
  title?: string;
}

export const Window = ({
  contentBoxProps,
  children,
  initial,
  title,
  ...rest
}: WindowProps) => {
  const { id, isOpen, onClose } = useItemContext();
  const { windowLayerRef, focus, windowStack } = useWindowManager();

  // Motion props
  const [drag, setDrag] = React.useState(false);
  const height = useMotionValue(initial.height);
  const width = useMotionValue(initial.width);
  const heightBeforeResize = React.useRef(height.get());
  const widthBeforeResize = React.useRef(width.get());

  // TODO find a less ugly way to refresh component. The problem solved by the
  // following segment is that windowLayerRef will be null at first and the
  // defaultIsOpen from useDisclosure won't be honored. This state/effect
  // produces a rerender that picks up the correct values. But it's ugly and you
  // know it.
  const [mounted, setMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  if (windowLayerRef.current && isOpen) {
    return ReactDOM.createPortal(
      <MotionDiv
        drag={drag}
        dragConstraints={windowLayerRef}
        dragElastic={false}
        dragMomentum={false}
        onDragEnd={() => setDrag(false)}
        position="absolute"
        zIndex={windowStack && id && windowStack[id]}
        onTapStart={() => focus(id)}
        style={{ height, width }}
        display="flex"
        flexDirection="column"
        border="1px solid #f2bebe"
        backgroundColor="#faffff"
        overflow="hidden"
        pb="2"
        boxShadow="2xl"
        userSelect="none"
        pointerEvents="auto"
        minH="150px"
        minW="200px"
        {...rest}
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          p="2"
          gap="2"
        >
          <MotionDiv
            width="2em"
            sx={{ touchAction: "none" }}
            onTapStart={() => setDrag(true)}
          >
            <DragIcon />
          </MotionDiv>
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
        <MotionDiv
          sx={{ touchAction: "none" }}
          onPanStart={() => {
            heightBeforeResize.current = height.get();
            widthBeforeResize.current = width.get();
          }}
          onPan={(_, { offset }) => {
            height.set(heightBeforeResize.current + offset.y);
            width.set(widthBeforeResize.current + offset.x);
          }}
        >
          <ResizeIcon position="absolute" right="2" bottom="2" />
        </MotionDiv>
      </MotionDiv>,
      windowLayerRef.current
    );
  }

  return null;
};
