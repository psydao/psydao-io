import { Box, chakra, Flex } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import * as React from "react";

// import { GlobalContext } from "../components/global-context";
import { CloseIcon, DragIcon, ResizeIcon } from "components/icons";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

type ReducedBoxProps = Omit<
  BoxProps,
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "style"
  | "transition"
>;

interface WindowProps extends BoxProps {}

export function Window({ children, ...rest }: WindowProps) {
  // const { dynamicBackgroundProps } = React.useContext(GlobalContext);
  return (
    <ChakraBox
      drag
      dragElastic={0}
      dragMomentum={false}
      position="relative"
      display="flex"
      flexDirection="column"
      borderWidth={{ base: "1px", md: "2px" }}
      borderStyle="solid"
      borderColor="#f2bebe"
      margin={{ base: "-1px", md: "-2px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      //@ts-ignore see https://chakra-ui.com/guides/integrations/with-framer
      transition={{ duration: 0.1 }}
      // {...dynamicBackgroundProps}
      background="#fffafa"
      {...rest}
    >
      <Flex
        // {...dynamicBackgroundProps}
        background="#fffafa"
        p="2"
        justify="space-between"
      >
        <DragIcon />
        <CloseIcon />
      </Flex>
      <Box overflow="auto" {...rest}>
        {children}
      </Box>
      <ResizeIcon position="absolute" right="2" bottom="2" />
    </ChakraBox>
  );
}
