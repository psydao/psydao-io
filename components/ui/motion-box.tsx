import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

// TODO improve types, I'm not getting auto-completion for props
export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children"
});
