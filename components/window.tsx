import { GridItem, GridProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";

type ReducedMotionProps = Omit<
  MotionProps,
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "style"
  | "transition"
>;

interface WindowProps extends GridProps, ReducedMotionProps {}

export function Window(props: WindowProps) {
  return (
    <GridItem
      as={motion.div}
      dragElastic={0}
      dragMomentum={false}
      border="2px solid pink"
      background="#fffafa"
      overflow="auto"
      {...props}
    ></GridItem>
  );
}
