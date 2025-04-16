import { PropsWithChildren } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

const AnimationSpan = ({ children, ...props }: PropsWithChildren<HTMLMotionProps<'div'>>) => {
  return (
    <motion.div
      {...props}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
      layout
    >
      { children }
    </motion.div>
  );
}

export default AnimationSpan;
