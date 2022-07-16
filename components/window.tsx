import type { BoxProps } from "@chakra-ui/react";
import { Box, chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";

import { Close, Drag, Resize } from "components/icons";
import { useItemContext } from "components/item";
import { useWindowManager } from "components/window-manager";
import { useSize } from "lib/hooks";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

interface WindowProps extends BoxProps {
  motionBoxProps?: React.ComponentPropsWithoutRef<typeof MotionBox>;
  contentBoxProps?: BoxProps;
  resizable?: boolean;
  titleBarBorder?: boolean;
}

let firstResize = true;

export const Window = ({
  motionBoxProps,
  contentBoxProps,
  children,
  resizable = true,
  titleBarBorder = false,
  ...rest
}: WindowProps) => {
  const { id, isOpen, onClose } = useItemContext();
  const { windowLayerRef, focus, windowStack } = useWindowManager();

  // Motion props
  const [drag, setDrag] = useState(false);
  const [resize, setResize] = useState(false);
  const windowContainerRef = useRef(null);
  const size = useSize(windowContainerRef);
  const height = useMotionValue(size.height);
  const width = useMotionValue(size.width);
  const heightBeforeResize = useRef(size.height);
  const widthBeforeResize = useRef(size.width);

  if (windowContainerRef.current && height.get() === 0 && width.get() === 0) {
    height.set(size.height);
    width.set(size.width);
  }

  // TODO find a less ugly way to refresh component. The problem solved by the
  // following segment is that windowLayerRef will be null at first and the
  // defaultIsOpen from useDisclosure won't be honored. This state/effect
  // produces a rerender that picks up the correct values. But it's ugly and you
  // know it.
  const [, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
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
          border="2px solid #f2bebe"
          backgroundColor="#faffff"
          overflow="hidden"
          boxShadow="0px 12px 33px rgba(152, 53, 186, 0.22)"
          userSelect="none"
          pointerEvents="auto"
          minH="150px"
          minW="200px"
          {...motionBoxProps}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={{ base: "2", sm: "3", md: "4" }}
            borderBottom={titleBarBorder ? "2px solid #f2bebe" : "none"}
          >
            <MotionBox
              sx={{ touchAction: "none" }}
              onTapStart={() => setDrag(true)}
              onTap={() => setDrag(false)}
            >
              <Drag display="block" />
            </MotionBox>
            <Close flex="0 0 auto" onClick={onClose} />
          </Box>
          <Box
            overflow="auto"
            userSelect="text"
            flex="1 1 auto"
            pointerEvents={drag || resize ? "none" : "auto"}
            {...contentBoxProps}
          >
            {children}
          </Box>
          {resizable && (
            <MotionBox
              position="absolute"
              right={{ base: "2", md: "3" }}
              bottom={{ base: "2", md: "3" }}
              sx={{ touchAction: "none" }}
              onPanStart={() => {
                setResize(true);
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
              onPanEnd={() => setResize(false)}
            >
              <Resize />
            </MotionBox>
          )}
        </MotionBox>
      </Box>,
      windowLayerRef.current
    );
  }

  return null;
};
