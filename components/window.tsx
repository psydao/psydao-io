import { Box, chakra } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { isValidMotionProp, motion, useMotionValue } from "framer-motion";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { useItemContext } from "components/item";
import { CloseIcon, DragIcon, ResizeIcon } from "components/icons";
import { useSize } from "lib/hooks";
import { useWindowManager } from "components/window-manager";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

interface WindowProps extends BoxProps {
  motionBoxProps?: React.ComponentPropsWithoutRef<typeof MotionBox>;
  contentBoxProps?: BoxProps;
  title?: string;
}

let firstResize = true;

export const Window = ({
  motionBoxProps,
  contentBoxProps,
  children,
  title,
  ...rest
}: WindowProps) => {
  const { id, isOpen, onClose } = useItemContext();
  const { windowLayerRef, focus, windowStack } = useWindowManager();

  // Motion props
  const [drag, setDrag] = React.useState(false);
  const windowContainerRef = React.useRef(null);
  const size = useSize(windowContainerRef);
  const height = useMotionValue(size.height);
  const width = useMotionValue(size.width);
  const heightBeforeResize = React.useRef(size.height);
  const widthBeforeResize = React.useRef(size.width);

  if (windowContainerRef.current && height.get() === 0 && width.get() === 0) {
    height.set(size.height);
    width.set(size.width);
  }

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
      <Box
        ref={windowContainerRef}
        position="absolute"
        zIndex={windowStack[id]}
        minH="150px"
        minW="200px"
        {...rest}
      >
        <MotionBox
          drag={drag}
          dragConstraints={windowLayerRef}
          dragElastic={false}
          dragMomentum={false}
          onDragEnd={() => setDrag(false)}
          onTapStart={() => focus(id)}
          style={{ height, width }}
          position="absolute"
          top="0"
          left="0"
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
          {...motionBoxProps}
        >
          <Box
            display="flex"
            alignItems="start"
            justifyContent="space-between"
            p="2"
            gap="2"
          >
            <MotionBox
              width="2em"
              sx={{ touchAction: "none" }}
              onTapStart={() => setDrag(true)}
            >
              <DragIcon />
            </MotionBox>
            {title}
            <CloseIcon flex="0 0 auto" onClick={onClose} />
          </Box>
          <Box
            overflow="auto"
            userSelect="text"
            px="2"
            flex="1 1 auto"
            {...contentBoxProps}
            pointerEvents={drag ? "none" : "auto"}
          >
            {children}
          </Box>
          <MotionBox
            sx={{ touchAction: "none" }}
            onPanStart={() => {
              if (firstResize) {
                firstResize = false;
                heightBeforeResize.current = size.height;
                widthBeforeResize.current = size.width;
              } else {
                heightBeforeResize.current = height.get();
                widthBeforeResize.current = width.get();
              }
            }}
            onPan={(_, { offset }) => {
              height.set(heightBeforeResize.current + offset.y);
              width.set(widthBeforeResize.current + offset.x);
            }}
          >
            <ResizeIcon position="absolute" right="2" bottom="2" />
          </MotionBox>
        </MotionBox>
      </Box>,
      windowLayerRef.current
    );
  }

  return null;
};
