import { Box, chakra, Flex } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import type { MotionProps } from "framer-motion";

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

interface WindowProps extends MotionProps, ReducedBoxProps {
  showTitleBar?: boolean;
}

export function Window({
  children,
  showTitleBar = true,
  ...rest
}: WindowProps) {
  return (
    <ChakraBox
      dragElastic={0}
      dragMomentum={false}
      position="relative"
      display="flex"
      flexDirection="column"
      borderWidth={{ base: "1px", md: "2px" }}
      borderStyle="solid"
      borderColor="#f2bebe"
      margin={{ base: "-1px", md: "-2px" }}
      background="#fffafa"
      overflow="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      //@ts-ignore see https://chakra-ui.com/guides/integrations/with-framer
      transition={{ duration: 0.1 }}
      {...rest}
    >
      {showTitleBar && (
        <Flex
          bg="#fffafa"
          position="sticky"
          top="0"
          justify="space-between"
          p="5"
        >
          <svg
            viewBox="-3 -3 60 24"
            height="100%"
            fill="#f2bebe"
            style={{ maxWidth: "2rem" }}
          >
            <circle cx="0" cy="0" r="3" />
            <circle cx="18" cy="0" r="3" />
            <circle cx="36" cy="0" r="3" />
            <circle cx="54" cy="0" r="3" />
            <circle cx="0" cy="18" r="3" />
            <circle cx="18" cy="18" r="3" />
            <circle cx="36" cy="18" r="3" />
            <circle cx="54" cy="18" r="3" />
          </svg>
          <svg
            viewBox="-20 -20 40 40"
            height="100%"
            stroke="#f2bebe"
            style={{ maxWidth: "1.5rem", filter: "blur(3px)" }}
          >
            <line
              x1="-18"
              y1="-18"
              x2="18"
              y2="18"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line
              x1="-18"
              y1="18"
              x2="18"
              y2="-18"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </Flex>
      )}
      <Box p="5">{children}</Box>
    </ChakraBox>
  );
}
