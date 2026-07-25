import { motion } from 'framer-motion';

export default function ButtonAnimationWrapper({ children, style }) {
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      tabIndex={-1}
      style={style}
    >
      {children}
    </motion.div>
  );
}
