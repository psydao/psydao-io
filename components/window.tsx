import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";

interface WindowProps extends MotionProps {
  area?: string;
  children: React.ReactNode;
}

// .window {
//   border: 2px solid pink;
//   background-color: white;
// }

export function Window(props: WindowProps) {
  return (
    <motion.div
      drag
      dragElastic={0}
      dragMomentum={false}
      style={{ gridArea: props.area }}
      {...props}
    />
  );
}
